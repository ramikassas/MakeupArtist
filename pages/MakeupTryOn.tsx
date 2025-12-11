import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserTier } from '../types';
import { generateMakeupTryOn } from '../services/geminiService';
import LoadingOverlay from '../components/LoadingOverlay';

const MakeupTryOn: React.FC = () => {
    const { user } = useAuth();
    const isPro = user?.tier === UserTier.PRO;

    const [userImage, setUserImage] = useState<string | null>(null);
    const [refImage, setRefImage] = useState<string | null>(null);
    const [intensity, setIntensity] = useState(50);
    const [prompt, setPrompt] = useState('');
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (s: string) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setter(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!userImage) return;
        setLoading(true);
        const desc = prompt || "A fresh natural makeup look";
        const result = await generateMakeupTryOn(userImage, refImage, intensity, desc);
        setResultImage(result);
        setLoading(false);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif font-bold">AI Makeup Lab</h1>
                    <p className="text-gray-500">Try on any look, instantly.</p>
                </div>
                {isPro && <span className="bg-black text-gold-500 px-3 py-1 text-xs font-bold rounded-full">PRO ACTIVE</span>}
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="md:col-span-1 space-y-6">
                    {/* User Photo */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                        <label className="block text-sm font-bold mb-2">1. Your Photo</label>
                        <input type="file" onChange={e => handleFile(e, setUserImage)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 mb-2"/>
                        {userImage && <img src={userImage} className="w-full h-32 object-cover rounded-lg" alt="User" />}
                    </div>

                    {/* Reference Photo (Pro) */}
                    <div className={`bg-white p-4 rounded-xl border ${!isPro ? 'border-gray-200 opacity-70 relative' : 'border-gold-500/30'}`}>
                        {!isPro && <div className="absolute inset-0 z-10 bg-gray-50/50 backdrop-blur-[1px] flex items-center justify-center rounded-xl"><span className="text-xs font-bold bg-black text-white px-2 py-1 rounded">PRO Feature</span></div>}
                        <label className="block text-sm font-bold mb-2">2. Reference Look (Optional)</label>
                        <p className="text-xs text-gray-400 mb-2">Upload a celebrity look to steal their style.</p>
                        <input disabled={!isPro} type="file" onChange={e => handleFile(e, setRefImage)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700"/>
                        {refImage && <img src={refImage} className="w-full h-32 object-cover rounded-lg mt-2" alt="Ref" />}
                    </div>

                    {/* Intensity */}
                    <div className={`bg-white p-4 rounded-xl border ${!isPro ? 'border-gray-200 opacity-70 relative' : 'border-gray-200'}`}>
                         {!isPro && <div className="absolute inset-0 z-10 bg-gray-50/50 backdrop-blur-[1px] flex items-center justify-center rounded-xl"><span className="text-xs font-bold bg-black text-white px-2 py-1 rounded">PRO Feature</span></div>}
                        <label className="block text-sm font-bold mb-2">3. Intensity: {intensity}%</label>
                        <input disabled={!isPro} type="range" min="0" max="100" value={intensity} onChange={e => setIntensity(Number(e.target.value))} className="w-full accent-black" />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Subtle</span>
                            <span>Dramatic</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold mb-2">4. Style Notes</label>
                        <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="e.g., Red lips, smokey eyes" className="w-full border rounded-lg p-2 text-sm" />
                    </div>

                    <button 
                        onClick={handleGenerate} 
                        disabled={loading || !userImage}
                        className="w-full bg-black text-white py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                    >
                        Generate Look
                    </button>
                    {!isPro && <button onClick={() => document.getElementById('payment-modal')?.classList.remove('hidden')} className="w-full mt-2 text-xs underline text-gray-500">Upgrade to unlock Ref Image & Intensity</button>}
                </div>

                {/* Canvas */}
                <div className="md:col-span-2 bg-gray-100 rounded-2xl min-h-[500px] flex items-center justify-center relative overflow-hidden border border-gray-200">
                    {loading && <LoadingOverlay messages={["Scanning facial features...", "Mapping skin texture...", "Applying digital cosmetics...", "Blending pigments...", "Rendering final look..."]} />}
                    {resultImage ? (
                        <div className="relative w-full h-full">
                            <img src={resultImage} className="w-full h-full object-contain" alt="Result" />
                            <a href={resultImage} download="makeup-ai-result.png" className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full font-bold shadow-lg hover:bg-gray-100">Download HD</a>
                        </div>
                    ) : (
                        <div className="text-gray-400 text-center">
                            <span className="text-6xl block mb-4">💄</span>
                            <p>Upload your photo to start transformation.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MakeupTryOn;