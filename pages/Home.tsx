import React, { useEffect } from 'react';

const Home: React.FC = () => {
  useEffect(() => {
    // Dynamic SEO Injection
    document.title = "MakeupArtist.ai | #1 AI Beauty Domain For Sale";
    
    const metaTags = [
        { name: "description", content: "Premium Domain For Sale: MakeupArtist.ai. The authoritative digital asset for AI Makeup Try-On, Portfolio Generators, and Beauty SaaS. Secure it on Atom or GoDaddy." },
        { name: "keywords", content: "Makeup Artist AI, AI Makeup Try-On, Makeup Portfolio Generator, Virtual Makeup, Beauty Business Tools, Makeup Website Builder, Professional Makeup Portfolio, Buy Domain, Premium Domain" },
        { property: "og:title", content: "MakeupArtist.ai - The Future of Beauty Tech" },
        { property: "og:description", content: "Category-defining domain name available for acquisition. Perfect for the next unicorn in Beauty AI." },
        { property: "og:image", content: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop" }
    ];

    metaTags.forEach(tag => {
        let element;
        if (tag.name) {
            element = document.querySelector(`meta[name="${tag.name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', tag.name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', tag.content);
        } else if (tag.property) {
             element = document.querySelector(`meta[property="${tag.property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', tag.property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', tag.content);
        }
    });
  }, []);

  return (
    <div className="bg-white">
      {/* SEO H1 */}
      <h1 className="sr-only">MakeupArtist.ai - Buy Premium Domain | AI Beauty Technology & Virtual Try-On Asset</h1>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
            <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-50" alt="Makeup Artist" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white mt-20">
            <div className="inline-block py-2 px-6 rounded-full bg-gold-500/20 backdrop-blur-md border border-gold-500/50 text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 animate-fade-in-up">
                Premium Domain Asset Available
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-none tracking-tight">
                Your Art. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-white to-gold-300">Amplified.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                <strong>MakeupArtist.ai</strong> is the ultimate digital address for the future of beauty technology. 
                <br/><span className="text-sm opacity-70 mt-4 block">Portfolio Generator • Virtual Try-On • Business Automation</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                    href="https://www.atom.com/name/MakeupArtist.ai" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-gold-500 text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105"
                >
                    Make Offer on Atom
                </a>
                <a 
                    href="https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=MakeupArtist.ai" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full sm:w-auto px-10 py-5 rounded-full text-lg font-bold text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all"
                >
                    Buy via GoDaddy
                </a>
            </div>
        </div>
      </section>

      {/* Concept Clarification Strip */}
      <div className="bg-black text-white text-center py-6 border-b border-gray-900">
          <p className="text-sm md:text-base font-medium tracking-wide text-gray-400">
              <span className="text-gold-500">CONCEPT DEMO:</span> This page illustrates the massive SaaS potential of <span className="text-white underline decoration-gold-500 underline-offset-4">MakeupArtist.ai</span>
          </p>
      </div>

      {/* The Value Proposition (Visual Only) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h3 className="text-4xl font-serif font-bold text-gray-900 mb-6">A Category-Defining Brand</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                    This domain positions you instantly as the leader in AI Beauty Solutions.
                    Perfect for an app, a marketplace, or a booking platform.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: "📸", title: "Portfolio AI", desc: "Before/After generator concept." },
                    { icon: "💄", title: "Virtual Try-On", desc: "AR beauty preview technology." },
                    { icon: "📖", title: "Look-Book", desc: "Digital catalog creation suite." },
                    { icon: "🆔", title: "Brand Identity", desc: "Auto-branding for artists." }
                ].map((item, i) => (
                    <div key={i} className="bg-gray-50 p-10 rounded-3xl border border-gray-100 grayscale hover:grayscale-0 transition-all duration-500 group cursor-default">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform">{item.icon}</div>
                        <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                        <p className="text-gray-500">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Visual Pricing Model (Non-functional) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold mb-4">Proven Business Model Potential</h2>
                 <p className="text-gray-500">The MakeupArtist.ai domain supports a high-ticket SaaS subscription model.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center opacity-90 hover:opacity-100 transition-opacity">
                
                {/* Free Tier Visual */}
                <div className="p-10 rounded-3xl bg-white border border-gray-200">
                    <span className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-2 block">Freemium Funnel</span>
                    <h3 className="text-3xl font-bold mb-4">Starter Tier</h3>
                    <p className="text-gray-500 mb-8">Concept: User Acquisition</p>
                    <ul className="space-y-4 mb-8 opacity-60">
                        <li className="flex items-center text-sm">✓ Basic Portfolio Access</li>
                        <li className="flex items-center text-sm">✓ Limited AI Generations</li>
                    </ul>
                    <div className="w-full py-4 text-center text-gray-400 font-bold border-2 border-gray-100 rounded-xl bg-gray-50 cursor-not-allowed">
                        Demo Button
                    </div>
                </div>

                {/* Pro Tier Visual */}
                <div className="p-10 rounded-3xl bg-black text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full">REVENUE DRIVER</span>
                    </div>
                    <span className="text-gold-500 font-bold tracking-widest text-xs uppercase mb-2 block">SaaS Subscription</span>
                    <h3 className="text-3xl font-bold mb-4">€99 <span className="text-lg font-normal text-gray-400">/mo</span></h3>
                    <p className="text-gray-400 mb-8">Concept: High MRR Potential</p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-sm"><span className="text-gold-500 mr-3">★</span> Unlimited AI Tools</li>
                        <li className="flex items-center text-sm"><span className="text-gold-500 mr-3">★</span> Full Business Suite</li>
                    </ul>
                    <div className="w-full py-4 text-center bg-gray-800 text-gray-400 font-bold rounded-xl cursor-not-allowed border border-gray-700">
                        Demo Button
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* SEO Value Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
             <h2 className="text-3xl font-serif font-bold mb-8">Why This Domain Wins</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                 <div>
                     <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><span className="text-gold-500">01.</span> Authority</h4>
                     <p className="text-gray-600 leading-relaxed">
                         "Makeup Artist" is the exact industry search term. Adding ".ai" instantly modernizes it, positioning the brand as the technological standard bearer for the industry.
                     </p>
                 </div>
                 <div>
                     <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><span className="text-gold-500">02.</span> Market Fit</h4>
                     <p className="text-gray-600 leading-relaxed">
                         The beauty tech market is exploding. This domain is ready-made for an investor or startup looking to capture the "AI Beauty" narrative immediately.
                     </p>
                 </div>
             </div>
             
             <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                 <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Valuable Keywords Included</p>
                 <div className="flex flex-wrap justify-center gap-3">
                     {["Makeup Artist", "AI Beauty", "Virtual Try-On", "Beauty Tech", "SaaS", "Portfolio Generator"].map((kw, i) => (
                         <span key={i} className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 shadow-sm">{kw}</span>
                     ))}
                 </div>
             </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-4">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Secure This Asset.</h2>
              <p className="text-xl mb-12 text-gray-300">Don't let a competitor build their empire on this name.</p>
              <a 
                  href="https://www.atom.com/name/MakeupArtist.ai" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-block bg-gold-500 text-black px-12 py-5 rounded-full text-xl font-bold hover:bg-white hover:scale-105 transition-all shadow-2xl"
              >
                  Buy Now on Atom
              </a>
          </div>
      </section>

    </div>
  );
};

export default Home;