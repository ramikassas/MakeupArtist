import React, { useState } from 'react';
import ProGate from '../components/ProGate';
import { generateInstagramCaption, calculatePricing } from '../services/geminiService';

const BusinessSuite: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'content' | 'pricing'>('content');
    
    // Content State
    const [lookDesc, setLookDesc] = useState('');
    const [caption, setCaption] = useState('');
    const [loadingContent, setLoadingContent] = useState(false);

    // Pricing State
    const [pricingDetails, setPricingDetails] = useState('');
    const [priceResult, setPriceResult] = useState('');
    const [loadingPrice, setLoadingPrice] = useState(false);

    const handleCaption = async () => {
        setLoadingContent(true);
        const res = await generateInstagramCaption(lookDesc);
        setCaption(res);
        setLoadingContent(false);
    }

    const handlePricing = async () => {
        setLoadingPrice(true);
        const res = await calculatePricing(pricingDetails);
        setPriceResult(res);
        setLoadingPrice(false);
    }

    return (
        <ProGate>
            <div className="max-w-5xl mx-auto px-4 py-12">
                <header className="mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">Business Suite</h1>
                    <p className="text-gray-500">Tools to manage and grow your artistry business.</p>
                </header>

                <div className="flex space-x-6 border-b border-gray-200 mb-8">
                    <button onClick={() => setActiveTab('content')} className={`pb-4 px-2 font-medium ${activeTab === 'content' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}>Content Generator</button>
                    <button onClick={() => setActiveTab('pricing')} className={`pb-4 px-2 font-medium ${activeTab === 'pricing' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}>Smart Pricing</button>
                </div>

                {activeTab === 'content' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="block text-sm font-bold">Describe the look you created</label>
                            <textarea value={lookDesc} onChange={e => setLookDesc(e.target.value)} className="w-full h-32 border rounded-xl p-4" placeholder="Soft glam bridal makeup with rose gold tones..."></textarea>
                            <button onClick={handleCaption} disabled={loadingContent} className="bg-brand-600 text-white px-6 py-3 rounded-lg font-bold w-full">{loadingContent ? 'Generating...' : 'Generate Caption & Hashtags'}</button>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 whitespace-pre-wrap font-mono text-sm">
                            {caption || "Caption will appear here..."}
                        </div>
                    </div>
                )}

                {activeTab === 'pricing' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="block text-sm font-bold">Event Details</label>
                            <textarea value={pricingDetails} onChange={e => setPricingDetails(e.target.value)} className="w-full h-32 border rounded-xl p-4" placeholder="Bridal makeup, 3 bridesmaids, travel 20km, using luxury products..."></textarea>
                            <button onClick={handlePricing} disabled={loadingPrice} className="bg-black text-white px-6 py-3 rounded-lg font-bold w-full">{loadingPrice ? 'Calculating...' : 'Calculate Quote'}</button>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 whitespace-pre-wrap">
                            {priceResult || "Price recommendation will appear here..."}
                        </div>
                    </div>
                )}
            </div>
        </ProGate>
    );
}

export default BusinessSuite;