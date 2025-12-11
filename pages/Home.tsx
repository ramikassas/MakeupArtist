import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const FeatureBlock: React.FC<{ title: string; desc: string; pro?: boolean; icon: string }> = ({ title, desc, pro, icon }) => (
    <div className={`p-8 rounded-3xl border transition-all duration-300 ${pro ? 'bg-black text-white border-gold-500/50' : 'bg-white text-gray-900 border-gray-100 shadow-lg'}`}>
        <div className="flex justify-between items-start mb-6">
            <span className="text-4xl">{icon}</span>
            {pro && <span className="bg-gold-500 text-black text-[10px] font-bold px-2 py-1 rounded">PRO ONLY</span>}
        </div>
        <h3 className={`text-xl font-bold font-serif mb-3 ${pro ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        <p className={`${pro ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>{desc}</p>
    </div>
);

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
            <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in">The Future of Beauty is Here</span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight tracking-tight">
                Automate Artistry.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-brand-300">Elevate Humanity.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
                The world's first AI ecosystem designed to turn beginners into experts, and experts into icons.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                {!user ? (
                    <button onClick={() => document.getElementById('login-modal')?.classList.remove('hidden')} className="bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-200 transition-all min-w-[200px]">
                        Start Free Trial
                    </button>
                ) : (
                    <Link to="/dashboard" className="bg-brand-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-brand-700 transition-all min-w-[200px]">
                        Go to Studio
                    </Link>
                )}
                <button onClick={() => document.getElementById('payment-modal')?.classList.remove('hidden')} className="px-10 py-5 rounded-full text-lg font-bold text-white border border-white/30 hover:bg-white/10 transition-all min-w-[200px]">
                    View Pro Plans
                </button>
            </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">We don't sell features. We upgrade careers.</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
                Whether you are just discovering your skin type or managing a roster of celebrity clients, 
                MakeupArtist.ai provides the intelligence layer that was missing from the beauty industry.
            </p>
        </div>
      </section>

      {/* Free Tier Tease */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Start with the Essentials (Free)</h2>
                <p className="text-gray-500">Perfect for daily inspiration and basic care.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureBlock title="Quick Match Lite" desc="Basic foundation matching and 3 product recommendations." icon="✨" />
                <FeatureBlock title="Daily Look" desc="One AI-generated look inspiration per day." icon="📅" />
                <FeatureBlock title="Basic Skin Scan" desc="Identify your skin type (Oily, Dry, Combo)." icon="🔍" />
                <FeatureBlock title="Tips Engine" desc="Simple Do's and Don'ts for your routine." icon="💡" />
            </div>
        </div>
      </section>

      {/* Pro Tier (The Core) */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-900/20 to-transparent"></div>
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-gray-800 pb-8">
                <div>
                    <span className="text-gold-500 font-bold tracking-widest uppercase mb-2 block">Premium Evolution</span>
                    <h2 className="text-5xl font-serif font-bold">The Professional Suite</h2>
                </div>
                <div className="text-right mt-6 md:mt-0">
                    <p className="text-3xl font-bold">€99<span className="text-lg text-gray-500">/mo</span></p>
                    <p className="text-gray-400 text-sm">For serious artists & enthusiasts</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureBlock pro title="Clinical Skin Analyzer" desc="Thinking Model analyzes 14 skin parameters including texture, elasticity, and pore depth. Generates full AM/PM clinical routines." icon="🧬" />
                <FeatureBlock pro title="AI Business Manager" desc="Automated pricing calculator, client management, and instant Instagram caption generation for your portfolio." icon="💼" />
                <FeatureBlock pro title="Veo Video Studio" desc="Generate unlimited cinematic 4K makeup tutorials from text prompts to showcase your vision." icon="🎥" />
                <FeatureBlock pro title="Live Mentor" desc="Real-time voice guidance during application. It's like having a master artist in the room." icon="🎙️" />
                <FeatureBlock pro title="Ingredient Auditor" desc="Deep analysis of product labels against your specific skin profile to prevent breakouts." icon="🧪" />
                <FeatureBlock pro title="Client Mode" desc="Create profiles for your clients, save their looks, and generate prep-guides before appointments." icon="👥" />
            </div>

            <div className="mt-20 text-center">
                <button onClick={() => document.getElementById('payment-modal')?.classList.remove('hidden')} className="bg-gold-500 text-black px-12 py-6 rounded-full text-xl font-bold hover:bg-gold-600 transition-all shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                    Upgrade to Professional Now
                </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;