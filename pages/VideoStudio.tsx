import React, { useState } from 'react';
import ProGate from '../components/ProGate';
import { generateMakeupVideo } from '../services/geminiService';

const VideoStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspect, setAspect] = useState<'16:9' | '9:16'>('9:16');
  const [generating, setGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      const url = await generateMakeupVideo(prompt, aspect);
      if (url) {
        setVideoUrl(url);
      } else {
        setError("Generation failed or API key selection required.");
      }
    } catch (e) {
      setError("Failed to generate video. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <ProGate>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Video Studio (Beta)</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Describe the look</label>
                    <textarea 
                        className="w-full border border-gray-300 rounded-xl p-4 h-32 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        placeholder="A glowing summer sunset eyeshadow tutorial with gold highlights..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    ></textarea>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => setAspect('9:16')}
                            className={`flex-1 py-3 rounded-lg border ${aspect === '9:16' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                            📱 Portrait (Stories)
                        </button>
                        <button 
                            onClick={() => setAspect('16:9')}
                            className={`flex-1 py-3 rounded-lg border ${aspect === '16:9' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                            🖥️ Landscape
                        </button>
                    </div>
                </div>

                <button 
                    onClick={handleGenerate}
                    disabled={generating || !prompt}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 transition-all"
                >
                    {generating ? 'Dreaming up your video...' : 'Generate Tutorial'}
                </button>
                
                {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}
            </div>

            <div className="bg-gray-100 rounded-2xl flex items-center justify-center min-h-[400px] overflow-hidden border border-gray-200">
                {generating ? (
                    <div className="text-center">
                        <div className="animate-spin text-4xl mb-4">🎥</div>
                        <p className="text-gray-500 animate-pulse">Rendering AI frames...</p>
                    </div>
                ) : videoUrl ? (
                    <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                ) : (
                    <div className="text-gray-400 text-center p-8">
                        <p className="text-4xl mb-2">✨</p>
                        <p>Your masterpiece will appear here</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </ProGate>
  );
};

export default VideoStudio;