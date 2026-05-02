"use client";
import { useState, useRef, useEffect } from 'react';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hello! I am ElectraGuide. How can I help you with your election questions today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to fetch AI response');
      
      setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I am having trouble connecting to the network right now. ' + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] glass-panel rounded-xl overflow-hidden shadow-lg border border-[var(--border)]">
      <div className="bg-[var(--card-bg)] text-[var(--foreground)] p-4 border-b border-[var(--border)] font-semibold flex items-center justify-between">
        <span>🤖 ElectraGuide Assistant</span>
        <span className="text-xs font-normal text-gray-500">Powered by Gemini</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-3 rounded-xl shadow-sm text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white dark:bg-gray-800 text-[var(--foreground)] rounded-bl-none border border-gray-200 dark:border-gray-700'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-xl rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm flex space-x-2 items-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={sendMessage} className="p-3 bg-[var(--card-bg)] border-t border-[var(--border)] flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-sm bg-transparent outline-none transition-all"
          disabled={loading}
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-medium text-sm disabled:opacity-50"
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
}
