import React from 'react';
import { Link } from 'react-router-dom';

const DomainBanner: React.FC = () => (
  <div className="bg-black text-white px-4 py-4 text-sm font-medium relative z-50">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
      <div className="flex items-center gap-3 animate-pulse">
        <span className="text-xl">💎</span>
        <span>
          <span className="font-bold text-gold-500 tracking-wide uppercase">Premium Asset For Sale:</span> 
          <span className="ml-2 text-gray-300">Own the brand <strong>MakeupArtist.ai</strong> today.</span>
        </span>
      </div>
      <div className="flex gap-4">
        <a 
          href="https://www.atom.com/name/MakeupArtist.ai" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-gold-500 text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-gold-400 transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
        >
          Buy Now on Atom
        </a>
        <a 
          href="https://www.godaddy.com/domainsearch/find?checkAvail=1&domainToCheck=MakeupArtist.ai" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-white/20 transition-all"
        >
          View on GoDaddy
        </a>
      </div>
    </div>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-gold-500 selection:text-black">
      <DomainBanner />
      
      {/* Header - Logo Only */}
      <header className="absolute w-full z-40 top-[60px] sm:top-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-20 items-center">
            <Link to="/" className="flex items-center space-x-3 group cursor-default">
                <span className="text-3xl filter drop-shadow-lg">💄</span>
                <span className="text-2xl font-serif font-bold text-white tracking-tight group-hover:text-gold-500 transition-colors drop-shadow-md">MakeupArtist.ai</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white border-t border-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-serif italic text-2xl text-white mb-6">MakeupArtist.ai</p>
            <p className="text-gray-400 text-sm mb-8 tracking-widest uppercase">The Future of Beauty Technology</p>
            
            <div className="flex justify-center gap-6 mb-10">
                <a href="https://www.atom.com/name/MakeupArtist.ai" target="_blank" rel="noreferrer" className="text-gold-500 hover:text-white transition-colors underline underline-offset-4">Secure this Domain</a>
            </div>

            <div className="text-xs text-gray-600 max-w-2xl mx-auto border-t border-gray-800 pt-8">
                <p className="mb-2"><strong>Concept Disclaimer:</strong> The application interface shown is a functional demonstration ("Concept") illustrating the commercial potential of the domain name <strong>MakeupArtist.ai</strong>.</p>
                <p>&copy; {new Date().getFullYear()} Domain Asset Available for Purchase.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;