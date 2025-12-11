import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hidden SEO Block */}
      <h1 className="sr-only">Makeup Artist AI Platform | Professional Makeup Portfolio Generator | AI Makeup Try-On | Beauty Business Tools</h1>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
            <img src="https://images.unsplash.com/photo-1596704017254-9b1b1848fb11?q=80&w=2073&auto=format&fit=crop" className="w-full h-full object-cover opacity-50" alt="Makeup Artist Background" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
            <div className="mb-6 animate-fade-in-up">
                <span className="bg-gold-500 text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.5)]">
                    #1 AI Beauty Ecosystem
                </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight tracking-tight">
                Your Art. <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-white to-gold-400">Amplified.</span>
            </h2>
            <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                Transform your passion into a fully automated digital brand. 
                Generate portfolios, virtual try-ons, and booking systems in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {!user ? (
                    <button onClick={() => document.getElementById('login-modal')?.classList.remove('hidden')} className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-200 transition-all shadow-xl">
                        Start Free Trial
                    </button>
                ) : (
                    <Link to="/dashboard" className="w-full sm:w-auto bg-brand-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-700 transition-all shadow-xl">
                        Go to Studio
                    </Link>
                )}
                <button onClick={() => document.getElementById('payment-modal')?.classList.remove('hidden')} className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all">
                    See Pro Features
                </button>
            </div>
            <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest">No Credit Card Required for Free Tier</p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">A Complete Business in a Box</h3>
                <p className="text-gray-600 text-lg">
                    MakeupArtist.ai isn't just a tool; it's your marketing team, your photographer, and your business manager all in one.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <span className="text-4xl mb-6 block">📸</span>
                    <h4 className="text-xl font-bold mb-3">Instant Portfolio</h4>
                    <p className="text-gray-500">Generate Ultra HD before/after images and create a full Look-Book without organizing a photoshoot.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <span className="text-4xl mb-6 block">💄</span>
                    <h4 className="text-xl font-bold mb-3">AI Try-On Engine</h4>
                    <p className="text-gray-500">Let clients see exactly how they'll look before you even touch a brush. Close bookings faster.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                    <span className="text-4xl mb-6 block">🆔</span>
                    <h4 className="text-xl font-bold mb-3">Brand Identity</h4>
                    <p className="text-gray-500">Auto-generate your logo, color palette, and fonts. Build a cohesive luxury brand instantly.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Comparison: Free vs Pro */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Free Tier */}
                <div className="border border-gray-200 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gray-200"></div>
                    <h3 className="text-2xl font-bold mb-2">Starter (Free)</h3>
                    <p className="text-gray-500 mb-8">Perfect for daily inspiration & basic tools.</p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-gray-700"><span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span> 10 Before/After Images</li>
                        <li className="flex items-center text-gray-700"><span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span> Basic Skin Analysis</li>
                        <li className="flex items-center text-gray-700"><span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span> 5 Social Posts/Month</li>
                        <li className="flex items-center text-gray-700"><span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-xs">✓</span> Standard Booking Link</li>
                    </ul>
                    {!user && (
                        <button onClick={() => document.getElementById('login-modal')?.classList.remove('hidden')} className="w-full border-2 border-black text-black font-bold py-3 rounded-xl hover:bg-black hover:text-white transition-colors">
                            Join for Free
                        </button>
                    )}
                </div>

                {/* Pro Tier */}
                <div className="bg-black text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl transform md:scale-105">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-500 to-brand-500"></div>
                    <div className="absolute top-6 right-8 bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
                    <h3 className="text-3xl font-serif font-bold mb-2">Professional</h3>
                    <div className="flex items-end gap-2 mb-8">
                        <span className="text-4xl font-bold">€99</span>
                        <span className="text-gray-400 mb-1">/month</span>
                    </div>
                    <ul className="space-y-4 mb-10">
                        <li className="flex items-center"><span className="text-gold-500 mr-3">★</span> Unlimited Portfolio Generation</li>
                        <li className="flex items-center"><span className="text-gold-500 mr-3">★</span> Full Brand Identity Suite (Logo, Colors)</li>
                        <li className="flex items-center"><span className="text-gold-500 mr-3">★</span> Look-Book Creator (50+ Styles)</li>
                        <li className="flex items-center"><span className="text-gold-500 mr-3">★</span> Smart Booking & Client Management</li>
                        <li className="flex items-center"><span className="text-gold-500 mr-3">★</span> Veo Cinematic Video Studio</li>
                    </ul>
                    <button onClick={() => document.getElementById('payment-modal')?.classList.remove('hidden')} className="w-full bg-gradient-to-r from-gold-500 to-yellow-600 text-black font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                        Upgrade to Professional
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* Feature Highlight: Identity */}
      <section className="py-24 bg-brand-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
                <span className="text-brand-600 font-bold tracking-widest uppercase mb-4 block">New Feature</span>
                <h3 className="text-4xl font-serif font-bold mb-6">You are the Brand.</h3>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Stop using generic templates. Our new Identity Engine generates a unique logo, color palette, and typography system tailored to your specific artistic vibe. 
                    Included instantly in the Pro plan.
                </p>
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-black rounded-full"></div>
                    <div className="w-12 h-12 bg-white rounded-full border"></div>
                    <div className="w-12 h-12 bg-gold-500 rounded-full"></div>
                    <div className="w-12 h-12 bg-brand-200 rounded-full"></div>
                </div>
            </div>
            <div className="flex-1">
                <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop" className="rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500" alt="Brand Identity Preview" />
            </div>
        </div>
      </section>

    </div>
  );
};

export default Home;