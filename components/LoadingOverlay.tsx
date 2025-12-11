import React, { useState, useEffect } from 'react';

const defaultMessages = [
  "Analyzing facial geometry...",
  "Consulting beauty database...",
  "Applying professional filters...",
  "Enhancing resolution...",
  "Finalizing artistry..."
];

interface LoadingOverlayProps {
  messages?: string[];
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ messages = defaultMessages }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-2xl animate-fade-in transition-all duration-500">
        <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-brand-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">✨</div>
        </div>
        <p className="text-gray-900 font-medium font-serif text-lg animate-pulse">{messages[msgIndex]}</p>
        <p className="text-xs text-gray-400 mt-2 tracking-widest uppercase">Gemini AI Processing</p>
    </div>
  );
};

export default LoadingOverlay;