import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export function AIChatSidebar() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const userName = user?.name || 'User';

  const initialMessages: Message[] = [
    {
      id: 1,
      type: 'ai',
      text: t('dashboard.aiWelcomeMsg', { name: userName }) || `Hello ${userName}! I noticed your energy levels are low. Want a quick anti-inflammatory snack suggestion?`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(async (customMessage?: string) => {
    const textToSend = typeof customMessage === 'string' ? customMessage : inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (typeof customMessage !== 'string') {
      setInputValue('');
    }
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const history = messages.map(m => ({
        role: m.type === 'ai' ? 'model' : 'user',
        content: m.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: userMessage.text,
          history: history
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiResponse: Message = {
          id: Date.now() + 1,
          type: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else if (res.status === 401) {
        const errorMsg: Message = {
          id: Date.now() + 1,
          type: 'ai',
          text: 'Oturum süreniz dolmuş, lütfen çıkış yapıp tekrar giriş yapın.',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, errorMsg]);
        setTimeout(() => window.location.href = '/login', 2000);
      } else {
        const errorMsg: Message = {
          id: Date.now() + 1,
          type: 'ai',
          text: 'Sunucuya bağlanılamadı. Lütfen Gemini API anahtarınızı veya internet bağlantınızı kontrol edin.',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, messages]);

  useEffect(() => {
    const handleAskAiRecipe = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        handleSend(customEvent.detail);
      }
    };

    window.addEventListener('ask-ai-recipe', handleAskAiRecipe);
    return () => window.removeEventListener('ask-ai-recipe', handleAskAiRecipe);
  }, [handleSend]);

  return (
    <aside className="w-96 bg-card border-l-2 border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b-2 border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue to-purple flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t('dashboard.askAi') || 'Ask OptiMeal AI'}</h3>
            <p className="text-xs text-muted-foreground">{t('dashboard.geminiPowered') || 'Gemini-powered'}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-foreground'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t-2 border-border bg-accent/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('dashboard.chatPlaceholder') || 'Can I have a burger tonight?'}
            className="flex-1 px-4 py-3 rounded-xl bg-card border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-electric-blue transition-colors"
          />
          <Button
            onClick={handleSend}
            variant="primary"
            className="w-12 h-12 rounded-xl p-0 flex items-center justify-center flex-shrink-0"
          >
            <Send className="w-5 h-5 text-current" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          {t('dashboard.aiDisclaimer') || 'AI responses are personalized based on your health profile'}
        </p>
      </div>
    </aside>
  );
}
