import React, { useState } from 'react';
import ProGate from '../components/ProGate';
import { analyzeComplexQuery } from '../services/geminiService';
// Fix: Import AnalysisType from ../types instead of ../services/geminiService
import { AnalysisType } from '../types';
import ReactMarkdown from 'react-markdown';

const Analysis: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalysis = async () => {
      if(!query) return;
      setLoading(true);
      setResult('');
      try {
          const text = await analyzeComplexQuery(query, AnalysisType.SKINCARE);
          setResult(text);
      } catch(e) {
          setResult('Failed to analyze. Please try again.');
      } finally {
          setLoading(false);
      }
  }

  return (
    <ProGate>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Deep Skin & Ingredient Analysis</h1>
        <p className="text-gray-500 mb-8">Powered by Gemini Pro Thinking Model (32k token budget)</p>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Paste an ingredient list here or describe a complex skin reaction..."
                className="w-full h-32 border-none resize-none focus:ring-0 text-gray-800 placeholder-gray-300 text-lg"
            />
            <div className="flex justify-between items-center mt-4 border-t border-gray-100 pt-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Clinical Analysis Mode</span>
                <button 
                    onClick={handleAnalysis}
                    disabled={loading || !query}
                    className="bg-brand-600 text-white px-6 py-2 rounded-full font-medium hover:bg-brand-700 disabled:opacity-50 transition-colors"
                >
                    {loading ? 'Analyzing...' : 'Analyze'}
                </button>
            </div>
        </div>

        {result && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-100 prose prose-pink max-w-none">
                <ReactMarkdown>{result}</ReactMarkdown>
            </div>
        )}
      </div>
    </ProGate>
  );
};

export default Analysis;