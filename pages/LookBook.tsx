import React, { useState } from 'react';
import ProGate from '../components/ProGate';
import { generateLookBookImage } from '../services/geminiService';
import LoadingOverlay from '../components/LoadingOverlay';

const LookBook: React.FC = () => {
    const [theme, setTheme] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!theme) return;
        setLoading(true);
        // Mocking multiple generations for speed/demo purposes using one prompt
        try {
            const img1 = await generateLookBookImage("Editorial Close Up", theme);
            const img2 = await generateLookBookImage("Full Face Glam", theme);
            const img3 = await generateLookBookImage("Creative Detail", theme);
            
            setImages([img1, img2, img3].filter(i => i !== null) as string[]);
        } catch (e) {
            alert('Error creating Look Book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProGate>
            <div className="max-w-6xl mx-auto px-4 py-12 relative">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-serif font-bold mb-2">Look-Book Creator</h1>
                        <p className="text-gray-500">Generate a cohesive seasonal collection.</p>
                    </div>
                </header>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-12 flex gap-4">
                    <input 
                        type="text" 
                        value={theme}
                        onChange={e => setTheme(e.target.value)}
                        placeholder="e.g. 1920s Noir, Cyberpunk Neon, Ethereal Bridal..."
                        className="flex-1 border-gray-200 rounded-xl px-4 focus:ring-black focus:border-black"
                    />
                    <button 
                        onClick={handleGenerate}
                        disabled={!theme || loading}
                        className="bg-black text-white px-8 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50"
                    >
                        Generate Collection
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[400px]">
                    {loading && <LoadingOverlay messages={["Researching trends...", "Defining color palettes...", "Rendering looks...", "Compiling collection..."]} />}
                    
                    {images.length > 0 ? (
                        images.map((img, i) => (
                            <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                                <img src={img} alt={`Look ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <span className="text-white font-serif italic text-xl">Look 0{i+1}</span>
                                </div>
                            </div>
                        ))
                    ) : !loading && (
                        <div className="col-span-3 flex flex-col items-center justify-center text-gray-300">
                            <span className="text-6xl mb-4">📖</span>
                            <p>Enter a theme to generate your look book.</p>
                        </div>
                    )}
                </div>
            </div>
        </ProGate>
    );
};

export default LookBook;