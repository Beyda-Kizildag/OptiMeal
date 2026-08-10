import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { PGVectorStore } from '@langchain/community/vectorstores/pgvector';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables';
import { Document } from '@langchain/core/documents';
import { HealthService } from '../health/health.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatHistory, ChatRole } from './entities/chat-history.entity';
import { AiMemory } from './entities/ai-memory.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class AiService implements OnModuleInit {
  private vectorStore: PGVectorStore;
  private embeddings: GoogleGenerativeAIEmbeddings;
  private chatModel: ChatGoogleGenerativeAI;

  constructor(
    private readonly healthService: HealthService,
    private readonly configService: ConfigService,
    @InjectRepository(ChatHistory) private chatHistoryRepo: Repository<ChatHistory>,
    @InjectRepository(AiMemory) private aiMemoryRepo: Repository<AiMemory>,
    @InjectRepository(User) private userRepo: Repository<User>,
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

  async getChatHistory(userId: string): Promise<ChatHistory[]> {
    return this.chatHistoryRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'ASC' },
    });
  }

  async clearChatHistory(userId: string): Promise<void> {
    await this.chatHistoryRepo.delete({ user: { id: userId } });
  }

  async getMemories(userId: string): Promise<AiMemory[]> {
    return this.aiMemoryRepo.find({ where: { user: { id: userId } }, order: { createdAt: 'DESC' } });
  }

  async deleteMemory(memoryId: string): Promise<void> {
    await this.aiMemoryRepo.delete(memoryId);
  }

  async chat(userId: string, message: string): Promise<string> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const profile = await this.healthService.getProfile(userId);
    
    // Save user message to history
    await this.chatHistoryRepo.save({ user, role: ChatRole.USER, content: message });

    // Format user profile
    const diseases = profile.chronicDiseases?.join(', ') || 'None';
    const intolerances = profile.intolerances?.join(', ') || 'None';
    const profileContext = `User Profile - Diseases: ${diseases}, Intolerances: ${intolerances}`;

    // Load history from DB
    const chatHistory = await this.getChatHistory(userId);
    let historyText = 'No previous chat history.';
    if (chatHistory.length > 0) {
      historyText = chatHistory.map(h => `${h.role === ChatRole.USER ? 'User' : 'Assistant'}: ${h.content}`).join('\n');
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

    const answer = await chain.invoke(message);

    // Save assistant response to history
    await this.chatHistoryRepo.save({ user, role: ChatRole.ASSISTANT, content: answer });

    return answer;
  }

  async generateRecipe(userId: string, lang: string = 'tr'): Promise<any> {
    const profile = await this.healthService.getProfile(userId);
    const diseases = profile.chronicDiseases?.join(', ') || 'None';
    const intolerances = profile.intolerances?.join(', ') || 'None';
    const targetLanguage = lang === 'tr' ? 'Turkish' : 'English';
    
    const promptText = `
You are an expert nutritionist AI. Generate a personalized, healthy recipe for a user with the following profile:
Diseases: ${diseases}
Intolerances: ${intolerances}

Ensure the recipe is strictly safe for their conditions and intolerances.
IMPORTANT: You MUST generate the recipe title, time, tags, and description entirely in the ${targetLanguage} language!

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
