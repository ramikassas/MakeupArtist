import React, { useEffect, useRef, useState } from 'react';
import ProGate from '../components/ProGate';
import { LiveConsultant } from '../services/geminiService';

const LiveConsultantPage: React.FC = () => {
  const [active, setActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const consultantRef = useRef<LiveConsultant | null>(null);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    consultantRef.current = new LiveConsultant();
    return () => {
        if (active) {
            consultantRef.current?.disconnect();
        }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSession = async () => {
    if (active) {
        consultantRef.current?.disconnect();
        setActive(false);
        setTranscript('');
    } else {
        setError(null);
        try {
            await consultantRef.current?.connect((text) => {
                setTranscript(text);
            });
            setActive(true);
        } catch (e) {
            setError("Could not access microphone or connect to AI service.");
            console.error(e);
        }
    }
  };

  return (
    <ProGate>
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Live Consultant Studio</h1>
            <p className="text-gray-600">Place your phone or laptop nearby. I'll listen and guide you through your routine step-by-step.</p>
        </div>

        <div className={`relative w-64 h-64 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ${active ? 'bg-brand-50 shadow-[0_0_50px_rgba(236,72,153,0.3)] scale-110' : 'bg-gray-100'}`}>
            {active && (
                <div className="absolute inset-0 rounded-full border-4 border-brand-200 animate-ping opacity-20"></div>
            )}
            <div className="z-10 text-6xl">
                {active ? '👩‍🎤' : '🎧'}
            </div>
        </div>

        <div className="mt-12 space-y-6">
            <button 
                onClick={toggleSession}
                className={`px-10 py-4 rounded-full text-lg font-bold transition-all ${active ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-black text-white hover:bg-gray-800'}`}
            >
                {active ? 'End Session' : 'Start Consultation'}
            </button>
            
            {error && <p className="text-red-500">{error}</p>}

            {active && (
                <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[100px] flex items-center justify-center">
                    <p className="text-xl text-gray-700 italic font-serif">
                        "{transcript || "Listening..."}"
                    </p>
                </div>
            )}
        </div>
      </div>
    </ProGate>
  );
};

export default LiveConsultantPage;