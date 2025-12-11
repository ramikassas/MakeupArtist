import React, { useState } from 'react';
import ProGate from '../components/ProGate';
import { generateBrandIdentity, BrandIdentityResult } from '../services/geminiService';
import LoadingOverlay from '../components/LoadingOverlay';

const BrandIdentity: React.FC = () => {
    const [brandName, setBrandName] = useState('');
    const [vibe, setVibe] = useState('Minimalist Luxury');
    const [result, setResult] = useState<BrandIdentityResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!brandName) return;
        setLoading(true);
        try {
            const data = await generateBrandIdentity(brandName, vibe);
            setResult(data);
        } catch (e) {
            alert('Failed to generate identity. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProGate>
            <div className="max-w-6xl mx-auto px-4 py-12 relative">
                {loading && <LoadingOverlay messages={["Analyzing color psychology...", "Pairing typographic systems...", "Sketching logo concepts...", "Drafting brand voice...", "Finalizing identity..."]} />}
                
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-serif font-bold mb-4">Brand Identity Engine</h1>
                    <p className="text-gray-500">Create a cohesive, luxury brand presence in seconds.</p>
                </header>

                {!result ? (
                    <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">Business Name</label>
                                <input 
                                    type="text" 
                                    value={brandName} 
                                    onChange={e => setBrandName(e.target.value)} 
                                    className="w-full border-gray-200 rounded-xl p-4 bg-gray-50 focus:bg-white transition-all"
                                    placeholder="e.g. Luxe Artistry"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Vibe / Style</label>
                                <select 
                                    value={vibe} 
                                    onChange={e => setVibe(e.target.value)}
                                    className="w-full border-gray-200 rounded-xl p-4 bg-gray-50 focus:bg-white transition-all"
                                >
                                    <option value="Minimalist Luxury">Minimalist Luxury</option>
                                    <option value="Edgy & Bold">Edgy & Bold</option>
                                    <option value="Soft & Romantic">Soft & Romantic</option>
                                    <option value="Editorial High Fashion">Editorial High Fashion</option>
                                    <option value="Clean & Clinical">Clean & Clinical</option>
                                </select>
                            </div>
                            <button 
                                onClick={handleGenerate} 
                                disabled={!brandName}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold shadow-xl hover:scale-[1.02] transition-transform"
                            >
                                Generate Brand Kit
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                        {/* Visuals */}
                        <div className="space-y-8">
                            {/* Logo Concept */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[300px]" style={{ backgroundColor: result.colors.background }}>
                                <h2 className="text-5xl font-bold mb-2" style={{ fontFamily: result.fonts.heading, color: result.colors.primary }}>{brandName}</h2>
                                <p className="text-sm tracking-widest uppercase" style={{ fontFamily: result.fonts.body, color: result.colors.secondary }}>{result.tagline}</p>
                                <div className="mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl text-xs text-gray-500 max-w-xs">
                                    <strong>Logo Concept:</strong> {result.logoConcept}
                                </div>
                            </div>
                            
                            {/* Colors */}
                            <div className="grid grid-cols-4 gap-4">
                                <div className="aspect-square rounded-2xl flex items-center justify-center text-xs font-mono text-white/80 shadow-md" style={{ background: result.colors.primary }}>{result.colors.primary}</div>
                                <div className="aspect-square rounded-2xl flex items-center justify-center text-xs font-mono text-white/80 shadow-md" style={{ background: result.colors.secondary }}>{result.colors.secondary}</div>
                                <div className="aspect-square rounded-2xl flex items-center justify-center text-xs font-mono text-white/80 shadow-md" style={{ background: result.colors.accent }}>{result.colors.accent}</div>
                                <div className="aspect-square rounded-2xl flex items-center justify-center text-xs font-mono text-gray-500 border border-gray-200" style={{ background: result.colors.background }}>BG</div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="font-bold mb-4 text-gray-400 uppercase tracking-widest text-xs">Typography</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Heading Font</p>
                                        <p className="text-3xl" style={{ fontFamily: result.fonts.heading }}>{result.fonts.heading}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Body Font</p>
                                        <p className="text-lg" style={{ fontFamily: result.fonts.body }}>{result.fonts.body} - The quick brown fox jumps over the lazy dog.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="font-bold mb-4 text-gray-400 uppercase tracking-widest text-xs">Social Bio</h3>
                                <div className="bg-gray-50 p-4 rounded-xl text-sm font-medium">
                                    {result.socialBio}
                                </div>
                                <button className="mt-4 text-brand-600 text-sm font-bold hover:underline" onClick={() => navigator.clipboard.writeText(result.socialBio)}>Copy to Clipboard</button>
                            </div>

                            <button onClick={() => setResult(null)} className="w-full py-4 rounded-xl border border-gray-200 font-bold hover:bg-gray-50">Regenerate</button>
                        </div>
                    </div>
                )}
            </div>
        </ProGate>
    );
};

export default BrandIdentity;