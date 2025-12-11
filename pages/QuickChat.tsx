import React, { useState } from 'react';
import { getFastMakeupAdvice, speakText } from '../services/geminiService';
import { ChatMessage } from '../types';

const QuickChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await getFastMakeupAdvice(input);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble right now.", timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = async (text: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    const buffer = await speakText(text);
    if (buffer) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsPlaying(false);
        source.start(0);
    } else {
        setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
        {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <span className="text-4xl mb-4">✨</span>
                <p>Ask me anything about your look!</p>
            </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.role === 'user' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
              <p>{msg.text}</p>
              {msg.role === 'model' && (
                  <button onClick={() => handleSpeak(msg.text)} className="mt-2 opacity-50 hover:opacity-100 transition-opacity">
                      {isPlaying ? '🔊 Playing...' : '🔈 Listen'}
                  </button>
              )}
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm ml-4">Typing...</div>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="E.g., How do I apply winged eyeliner?"
          className="flex-1 border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-brand-600 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-brand-700 disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
    </div>
  );
};

export default QuickChat;