import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserTier, SkinAnalysisResult } from '../types';
import { analyzeSkinBasic, analyzeSkinUltra } from '../services/geminiService';
import LoadingOverlay from '../components/LoadingOverlay';

const SkinAnalysis: React.FC = () => {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);

  const isPro = user?.tier === UserTier.PRO;

  const handleAnalyze = async () => {
      if(!input) return;
      setLoading(true);
      try {
          if (isPro) {
              const data = await analyzeSkinUltra(input);
              setResult(data);
          } else {
              const data = await analyzeSkinBasic(input);
              setResult(data);
          }
      } catch (e) {
          alert("Analysis failed. Please try again.");
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
        {loading && <LoadingOverlay messages={["Scanning dermis layer...", "Evaluating pore density...", "Comparing against clinical data...", "Formulating routine...", "Generating report..."]} />}
        
        <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-serif font-bold">AI Skin Analyzer</h1>
                {isPro ? <span className="bg-black text-gold-500 text-xs px-2 py-1 font-bold rounded">ULTRA</span> : <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 font-bold rounded">BASIC</span>}
            </div>
            <p className="text-gray-500">{isPro ? "Clinical grade analysis of 14 skin parameters." : "Basic skin typing and daily tips."}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Describe your skin condition</label>
                    <textarea 
                        className="w-full h-40 border-gray-200 rounded-xl p-4 text-sm focus:ring-black focus:border-black"
                        placeholder={isPro ? "Describe texture, redness, reactivity to products, morning vs night feeling..." : "Is your skin oily, dry, or mixed?"}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>
                    
                    {!isPro && (
                        <div className="mt-4 p-4 bg-brand-50 rounded-xl text-xs text-brand-800 flex items-center">
                            <span className="mr-2">🔒</span>
                            Unlock clinical analysis of pores, elasticity & ingredients with Pro.
                        </div>
                    )}

                    <button 
                        onClick={handleAnalyze}
                        disabled={loading || !input}
                        className={`w-full mt-4 py-3 rounded-xl font-bold text-white transition-all ${isPro ? 'bg-black hover:bg-gray-800' : 'bg-brand-500 hover:bg-brand-600'}`}
                    >
                        {loading ? 'Analyzing...' : isPro ? 'Run Clinical Analysis' : 'Identify Skin Type'}
                    </button>
                </div>
            </div>

            {/* Results Section */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 min-h-[400px]">
                {!result ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center">
                        <span className="text-4xl mb-4">🔬</span>
                        <p>Results will appear here.</p>
                    </div>
                ) : (
                    <div className="animate-fade-in space-y-6">
                        <div className="border-b pb-4">
                            <span className="text-xs uppercase text-gray-400 font-bold">Skin Type</span>
                            <h2 className="text-2xl font-bold capitalize">{result.skinType || "Unknown"}</h2>
                        </div>

                        {/* Basic Tips */}
                        <div>
                            <span className="text-xs uppercase text-gray-400 font-bold mb-2 block">Quick Tips</span>
                            <ul className="space-y-2">
                                {result.tips?.map((tip, i) => (
                                    <li key={i} className="flex items-start text-sm">
                                        <span className="text-green-500 mr-2">✓</span> {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* PRO SECTION */}
                        {result.type === 'ULTRA' && result.clinicalAnalysis && (
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="font-bold text-gold-600 mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-gold-500 rounded-full mr-2"></span>
                                    Clinical Assessment
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                                    <div className="bg-white p-3 rounded-lg">
                                        <span className="block text-xs text-gray-400">Texture</span>
                                        {result.clinicalAnalysis.texture}
                                    </div>
                                    <div className="bg-white p-3 rounded-lg">
                                        <span className="block text-xs text-gray-400">Redness</span>
                                        {result.clinicalAnalysis.redness}
                                    </div>
                                    <div className="bg-white p-3 rounded-lg">
                                        <span className="block text-xs text-gray-400">Hydration</span>
                                        {result.clinicalAnalysis.hydration}
                                    </div>
                                    <div className="bg-white p-3 rounded-lg">
                                        <span className="block text-xs text-gray-400">Aging Signs</span>
                                        {result.clinicalAnalysis.agingSigns}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <h4 className="font-bold text-blue-900 mb-2">AM Routine</h4>
                                        <ol className="list-decimal pl-4 text-sm text-blue-800 space-y-1">
                                            {result.routine?.am.map((step, i) => <li key={i}>{step}</li>)}
                                        </ol>
                                    </div>
                                    <div className="bg-indigo-50 p-4 rounded-xl">
                                        <h4 className="font-bold text-indigo-900 mb-2">PM Routine</h4>
                                        <ol className="list-decimal pl-4 text-sm text-indigo-800 space-y-1">
                                            {result.routine?.pm.map((step, i) => <li key={i}>{step}</li>)}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Upsell if Basic */}
                        {result.type === 'BASIC' && (
                            <div className="mt-8 p-6 bg-black text-white rounded-xl text-center">
                                <p className="font-bold mb-2">Want the deep dive?</p>
                                <p className="text-sm text-gray-400 mb-4">Our Pro model found 14 other data points about your skin but couldn't display them.</p>
                                <button onClick={() => document.getElementById('payment-modal')?.classList.remove('hidden')} className="bg-gold-500 text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gold-400">Unlock Full Report</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default SkinAnalysis;