import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* SEO H1 */}
      <h1 className="sr-only">Makeup Artist AI Platform | Professional Makeup Portfolio Generator | AI Makeup Try-On | Beauty Business Tools</h1>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
            <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="Makeup Artist" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-6 animate-fade-in">
                Professional AI System
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                Turn Your Artistry Into a <br/>
                <span className="text-gold-500">Digital Empire.</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto font-light">
                No photography gear. No design skills. No paid ads. 
                <br/>The complete AI solution to automate your business and elevate your brand in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {!user ? (
                    <button onClick={() => document.getElementById('login-modal')?.classList.remove('hidden')} className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Start Free Plan
                    </button>
                ) : (
                    <Link to="/dashboard" className="w-full sm:w-auto bg-brand-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-700 transition-all">
                        Open Studio
                    </Link>
                )}
                <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-bold text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all">
                    Explore Features
                </a>
            </div>
        </div>
      </section>

      {/* Concept Clarification */}
      <div className="bg-black text-white text-center py-3 text-sm">
          <span className="opacity-70">Concept Demo: Showing the power of </span>
          <span className="font-bold text-gold-500">MakeupArtist.ai</span>
      </div>

      {/* The Solution */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">A Complete Solution for the Makeup Industry</h3>
                <p className="text-gray-600 text-lg">
                    We provide ready-made tools that instantly upgrade your service level.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📸</div>
                    <h4 className="text-lg font-bold mb-3">Ultra HD Portfolio</h4>
                    <p className="text-gray-500 text-sm">Generate stunning Before/After images and auto-retouch client photos to magazine quality.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">💄</div>
                    <h4 className="text-lg font-bold mb-3">Virtual Try-On</h4>
                    <p className="text-gray-500 text-sm">Allow clients to see themselves with your makeup before you apply it. Close bookings faster.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📖</div>
                    <h4 className="text-lg font-bold mb-3">Pro Look-Book</h4>
                    <p className="text-gray-500 text-sm">Create a professional catalog with 50+ diverse styles without hiring models.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🆔</div>
                    <h4 className="text-lg font-bold mb-3">Brand Identity</h4>
                    <p className="text-gray-500 text-sm">Auto-generate your Logo, Color Palette, Fonts, and Instagram aesthetic instantly.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Pricing: Free vs Pro */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* Free Plan */}
                <div className="p-10 rounded-3xl border border-gray-200 hover:border-gray-300 transition-colors">
                    <span className="text-brand-600 font-bold tracking-widest text-xs uppercase mb-2 block">For Everyone</span>
                    <h3 className="text-3xl font-bold mb-4">Free Plan</h3>
                    <p className="text-gray-500 mb-8 h-12">Attract clients and start your journey.</p>
                    
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-sm"><span className="text-green-500 mr-3">✓</span> <strong>10</strong> Before/After Images</li>
                        <li className="flex items-center text-sm"><span className="text-green-500 mr-3">✓</span> <strong>1</strong> Portfolio Template</li>
                        <li className="flex items-center text-sm"><span className="text-green-500 mr-3">✓</span> <strong>5</strong> Social Posts / Month</li>
                        <li className="flex items-center text-sm"><span className="text-green-500 mr-3">✓</span> Basic Face Analysis</li>
                        <li className="flex items-center text-sm"><span className="text-green-500 mr-3">✓</span> Standard Booking Page</li>
                    </ul>

                    {!user ? (
                        <button onClick={() => document.getElementById('login-modal')?.classList.remove('hidden')} className="w-full py-4 rounded-xl border-2 border-black font-bold hover:bg-black hover:text-white transition-all">
                            Start Free
                        </button>
                    ) : (
                         <div className="w-full py-4 text-center text-gray-400 font-bold border-2 border-gray-100 rounded-xl">Current Plan</div>
                    )}
                </div>

                {/* Pro Plan */}
                <div className="p-10 rounded-3xl bg-black text-white relative overflow-hidden transform md:scale-105 shadow-2xl">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
                    </div>
                    <span className="text-gold-500 font-bold tracking-widest text-xs uppercase mb-2 block">Professional</span>
                    <h3 className="text-3xl font-bold mb-4">€99 <span className="text-lg font-normal text-gray-400">/mo</span></h3>
                    <p className="text-gray-400 mb-8 h-12">Turn your artistry into a high-profit business.</p>
                    
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-sm"><span className="text-gold-500 mr-3">★</span> <strong>Unlimited</strong> Portfolio & Try-On</li>
                        <li className="flex items-center text-sm"><span className="text-gold-500 mr-3">★</span> <strong>Full</strong> Look-Book & Identity Suite</li>
                        <li className="flex items-center text-sm"><span className="text-gold-500 mr-3">★</span> <strong>Daily</strong> Content Generation</li>
                        <li className="flex items-center text-sm"><span className="text-gold-500 mr-3">★</span> <strong>Pro</strong> Booking System</li>
                        <li className="flex items-center text-sm"><span className="text-gold-500 mr-3">★</span> <strong>Veo</strong> Cinematic Video Studio</li>
                    </ul>

                    <button onClick={() => document.getElementById('payment-modal')?.classList.remove('hidden')} className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-yellow-600 text-black font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all">
                        Upgrade to Pro
                    </button>
                </div>

            </div>
        </div>
      </section>

      {/* SEO / Content Section for Domain Value */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
             <h2 className="text-2xl font-bold mb-6">Why MakeupArtist.ai?</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                 <div>
                     <h4 className="font-bold mb-2">For The Artist</h4>
                     <p className="text-sm text-gray-600 leading-relaxed">
                         Stop wasting time on editing and marketing. Focus on the brush, while our AI handles your website, your social media, and your client acquisition funnel. It's the only tool you need to scale.
                     </p>
                 </div>
                 <div>
                     <h4 className="font-bold mb-2">For The Industry</h4>
                     <p className="text-sm text-gray-600 leading-relaxed">
                         The beauty industry is shifting to digital. Virtual Try-On and AI Skin Analysis are now standard expectations. MakeupArtist.ai democratizes this technology for independent artists.
                     </p>
                 </div>
             </div>
             <div className="mt-12">
                 <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Targeted Keywords</p>
                 <div className="flex flex-wrap justify-center gap-2">
                     {["Makeup Artist AI", "AI Makeup Try-On", "Makeup Portfolio Generator", "Virtual Makeup", "Beauty Business Tools", "Makeup Website Builder", "Professional Makeup Portfolio"].map((kw, i) => (
                         <span key={i} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs text-gray-500">{kw}</span>
                     ))}
                 </div>
             </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-600 text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-4xl font-serif font-bold mb-6">Transform Your Career Today.</h2>
              <p className="text-xl mb-10 opacity-90">Start with the Free Plan. Upgrade when you're ready to dominate.</p>
              <button onClick={() => document.getElementById('login-modal')?.classList.remove('hidden')} className="bg-white text-brand-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 shadow-xl transition-all">
                  Join MakeupArtist.ai
              </button>
          </div>
      </section>

    </div>
  );
};

export default Home;