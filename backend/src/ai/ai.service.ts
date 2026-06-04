import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables';
import { Document } from '@langchain/core/documents';
import { HealthService } from '../health/health.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService implements OnModuleInit {
  private vectorStore: PGVectorStore;
  private embeddings: GoogleGenerativeAIEmbeddings;
  private chatModel: ChatGoogleGenerativeAI;

  constructor(
    private readonly healthService: HealthService,
    private readonly configService: ConfigService,
  ) {
    this.embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
      model: 'gemini-embedding-2',
    });

    this.chatModel = new ChatGoogleGenerativeAI({
      apiKey: this.configService.get<string>('GEMINI_API_KEY'),
      model: 'gemini-2.5-flash',
      temperature: 0.7,
    });
  }

  async onModuleInit() {
    this.vectorStore = await PGVectorStore.initialize(this.embeddings, {
      postgresConnectionOptions: {
        type: 'postgres',
        host: this.configService.get<string>('DB_HOST') || 'localhost',
        port: parseInt(this.configService.get<string>('DB_PORT') || '5432'),
        user: this.configService.get<string>('DB_USER') || 'optimeal_user',
        password: this.configService.get<string>('DB_PASSWORD') || 'optimeal_password',
        database: this.configService.get<string>('DB_NAME') || 'optimeal_health_db',
      },
      tableName: 'nutrition_knowledge',
      columns: {
        idColumnName: 'id',
        vectorColumnName: 'embedding',
        contentColumnName: 'content',
        metadataColumnName: 'metadata',
      },
    });
  }

  async addDocument(content: string, metadata: Record<string, any> = {}) {
    await this.vectorStore.addDocuments([
      new Document({ pageContent: content, metadata }),
    ]);
  }

  async chat(userId: string, message: string, history?: { role: string; content: string }[]): Promise<string> {
    const profile = await this.healthService.getProfile(userId);
    
    // Format user profile
    const diseases = profile.chronicDiseases?.join(', ') || 'None';
    const intolerances = profile.intolerances?.join(', ') || 'None';
    const profileContext = `User Profile - Diseases: ${diseases}, Intolerances: ${intolerances}`;

    let historyText = 'No previous chat history.';
    if (history && history.length > 0) {
      historyText = history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join('\n');
    }

    const prompt = PromptTemplate.fromTemplate(`
You are a helpful nutrition and health assistant for the OptiMeal application.
You must respect the user's health profile and provide safe meal alternatives.
For example, if the user has a disease like Celiac disease, NEVER suggest wheat or gluten products, provide safe alternatives.
Use the knowledge base context to provide accurate alternatives or nutritional facts.
CRITICAL RULE: You MUST answer in a maximum of 1 or 2 short sentences. Keep it extremely concise.

Knowledge Base Context: {context}

User Profile: {profileContext}

Chat History:
{historyText}

Question: {question}

Helpful Answer:`);

    const formatDocs = (docs: Document[]) => docs.map((doc) => doc.pageContent).join('\n\n');

    const chain = RunnableSequence.from([
      {
        context: this.vectorStore.asRetriever().pipe(formatDocs),
        profileContext: () => profileContext,
        historyText: () => historyText,
        question: new RunnablePassthrough(),
      },
      prompt,
      this.chatModel,
      new StringOutputParser(),
    ]);

    return await chain.invoke(message);
  }

  async generateRecipe(userId: string): Promise<any> {
    const profile = await this.healthService.getProfile(userId);
    const diseases = profile.chronicDiseases?.join(', ') || 'None';
    const intolerances = profile.intolerances?.join(', ') || 'None';
    
    const promptText = `
You are an expert nutritionist AI. Generate a personalized, healthy recipe for a user with the following profile:
Diseases: ${diseases}
Intolerances: ${intolerances}

Ensure the recipe is strictly safe for their conditions and intolerances.
Respond ONLY with a valid JSON object matching this structure (no markdown tags, just the raw JSON object):
{
  "title": "Recipe Name",
  "time": "15 min",
  "tags": ["Anti-inflammatory", "Low GI"],
  "description": "Brief description of the meal and why it's good for them."
}
`;
    
    const result = await this.chatModel.invoke(promptText);
    let content = result.content as string;
    
    const match = content.match(/```json\s*(\{[\s\S]*?\})\s*```/);
    if (match) {
      content = match[1];
    }
    
    try {
      return JSON.parse(content);
    } catch(e) {
      console.error("JSON parse error for AI recipe", e);
      return {
        title: "Healthy Custom Bowl",
        time: "10 min",
        tags: ["Fresh", "Customized"],
        description: "A customized fresh meal based on your health profile."
      };
    }
  }
}
