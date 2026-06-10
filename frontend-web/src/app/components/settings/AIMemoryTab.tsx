import { useState, useEffect } from 'react';
import { Brain, Trash2, MessageSquare, AlertCircle } from 'lucide-react';
import { Switch } from '../ui/switch';
import { Button } from '../ui/Button';



export function AIMemoryTab() {
  const [smartMemoryEnabled, setSmartMemoryEnabled] = useState(true);
  const [memories, setMemories] = useState<any[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    fetchMemories();
    fetchPreferences();
  }, []);

  const fetchMemories = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('/api/ai/memories', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setMemories(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPreferences = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('/api/auth/preferences', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        if (data.preferences?.smartMemoryEnabled !== undefined) {
          setSmartMemoryEnabled(data.preferences.smartMemoryEnabled);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSmartMemoryToggle = async (checked: boolean) => {
    setSmartMemoryEnabled(checked);
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/auth/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ smartMemoryEnabled: checked })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMemory = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/ai/memories/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setMemories(prev => prev.filter(m => m.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const clearChatHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/ai/chat/history', { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      setShowClearConfirm(false);
      alert('Sohbet geçmişi silindi!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">AI Memory & Personalization</h2>
        <p className="text-muted-foreground">AI Hafızası - Control how the AI remembers your preferences</p>
      </div>

      {/* Smart Memory Toggle */}
      <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/20 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">Smart Memory</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Allow the AI to remember your preferences across sessions for better meal suggestions.
                This helps OptiMeal learn your eating habits, favorite cuisines, and health patterns to provide
                more personalized recommendations over time.
              </p>
            </div>
          </div>

          <Switch
            checked={smartMemoryEnabled}
            onCheckedChange={handleSmartMemoryToggle}
            className="flex-shrink-0"
          />
        </div>
      </div>

      {/* Memory Review List */}
      <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground">What the AI Knows About You</h3>
          <span className="text-sm text-muted-foreground">{memories.length} insights</span>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {memories.map(memory => (
            <div
              key={memory.id}
              className="flex items-center justify-between p-4 bg-accent/30 hover:bg-accent/50 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <p className="text-sm text-foreground">{memory.text}</p>
              </div>

              <button
                onClick={() => deleteMemory(memory.id)}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-destructive/10 rounded-lg transition-all"
                aria-label="Delete memory"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>
            </div>
          ))}

          {memories.length === 0 && (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No AI memories stored yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat History */}
      <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">Chat History</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Clear your conversation history with the AI assistant. Your health profile and preferences will remain intact.
            </p>

            {!showClearConfirm ? (
              <Button
                variant="outline"
                onClick={() => setShowClearConfirm(true)}
                icon={<Trash2 className="w-4 h-4" />}
              >
                Clear Chat History
              </Button>
            ) : (
              <div className="bg-destructive/10 border-2 border-destructive/20 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Are you sure?</p>
                    <p className="text-sm text-muted-foreground">
                      This will permanently delete all your chat conversations. This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowClearConfirm(false)}
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={clearChatHistory}
                    className="bg-destructive hover:bg-destructive/90"
                    size="sm"
                  >
                    Yes, Clear History
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
