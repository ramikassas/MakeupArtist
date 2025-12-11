import React, { useState } from 'react';
import ProGate from '../components/ProGate';
import { generatePortfolioImage } from '../services/geminiService';
import LoadingOverlay from '../components/LoadingOverlay';

const PortfolioGenerator: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [mode, setMode] = useState<'STUDIO' | 'RETOUCH' | 'BACKGROUND' | 'BEFORE_AFTER'>('STUDIO');
    const [loading, setLoading] = useState(false);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleProcess = async () => {
        if (!image) return;
        setLoading(true);
        const res = await generatePortfolioImage(image, mode);
        setResult(res);
        setLoading(false);
    };

    return (
        <ProGate>
            <div className="max-w-6xl mx-auto px-4 py-12">
                <header className="text-center mb-12">
                    <span className="bg-gold-500 text-black px-3 py-1 text-xs font-bold rounded uppercase tracking-widest mb-4 inline-block">Pro Studio</span>
                    <h1 className="text-4xl font-serif font-bold mb-4">AI Portfolio Architect</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">Transform raw client photos into high-end magazine quality portfolio pieces. Clean up backgrounds, fix lighting, or perform high-frequency skin retouching instantly.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold mb-4">1. Upload Raw Image</h3>
                            <input type="file" onChange={handleFile} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"/>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold mb-4">2. Select Enhancement</h3>
                            <div className="space-y-3">
                                <button 
                                    onClick={() => setMode('STUDIO')} 
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${mode === 'STUDIO' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <span className="font-bold block">Studio Lighting</span>
                                    <span className="text-xs text-gray-500">Relight face with softbox style lighting & sharpening.</span>
                                </button>
                                <button 
                                    onClick={() => setMode('RETOUCH')} 
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${mode === 'RETOUCH' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <span className="font-bold block">Skin Retouching</span>
                                    <span className="text-xs text-gray-500">Remove blemishes, even skin tone, keep texture.</span>
                                </button>
                                <button 
                                    onClick={() => setMode('BACKGROUND')} 
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${mode === 'BACKGROUND' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <span className="font-bold block">Cinematic Background</span>
                                    <span className="text-xs text-gray-500">Blur distracting backgrounds or replace with luxury studio.</span>
                                </button>
                                <button 
                                    onClick={() => setMode('BEFORE_AFTER')} 
                                    className={`w-full text-left p-4 rounded-xl border transition-all ${mode === 'BEFORE_AFTER' ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <span className="font-bold block">Before / After Generator</span>
                                    <span className="text-xs text-gray-500">Generate a realistic "After" makeup look side-by-side.</span>
                                </button>
                            </div>
                        </div>

                        <button 
                            onClick={handleProcess}
                            disabled={!image || loading}
                            className="w-full bg-brand-600 text-white py-4 rounded-full font-bold shadow-lg hover:bg-brand-700 disabled:opacity-50"
                        >
                            Process Image
                        </button>
                    </div>

                    {/* Preview Area */}
                    <div className="lg:col-span-2 bg-gray-50 rounded-3xl border border-gray-200 min-h-[600px] flex items-center justify-center relative overflow-hidden">
                        {loading && <LoadingOverlay messages={["Analyzing pixels...", "Identifying skin layers...", "Adjusting lighting curves...", "Applying texture separation...", "Rendering final export..."]} />}
                        
                        {!image ? (
                             <div className="text-gray-400 text-center">
                                <span className="text-6xl block mb-4">📸</span>
                                <p>Workspace Empty</p>
                            </div>
                        ) : (
                            <div className="relative w-full h-full p-4 flex gap-4">
                                <div className="flex-1 flex flex-col">
                                    <span className="text-xs font-bold uppercase text-gray-400 mb-2">Original</span>
                                    <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-sm">
                                        <img src={image} className="w-full h-full object-contain" alt="Original" />
                                    </div>
                                </div>
                                {result && (
                                    <div className="flex-1 flex flex-col animate-fade-in">
                                        <span className="text-xs font-bold uppercase text-brand-500 mb-2">Enhanced</span>
                                        <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-lg border-2 border-brand-200 relative group">
                                            <img src={result} className="w-full h-full object-contain" alt="Result" />
                                            <a href={result} download="portfolio-enhanced.png" className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-4 py-2 rounded-full text-sm font-bold">Save</a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProGate>
    );
};

export default PortfolioGenerator;