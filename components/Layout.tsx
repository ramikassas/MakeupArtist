import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserTier } from '../types';
import LoginModal from './LoginModal';
import PaymentModal from './PaymentModal';

const DomainBanner: React.FC = () => (
  <div className="bg-black text-white px-4 py-3 text-sm font-medium relative z-50">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
      <div className="flex items-center gap-2">
        <span className="text-xl">🔥</span>
        <span>
          <span className="font-bold text-gold-500">Premium Domain For Sale:</span> This functional SaaS concept is built on <strong>MakeupArtist.ai</strong>.
        </span>
      </div>
      <div className="flex gap-3">
        <a href="https://atom.com" target="_blank" rel="noreferrer" className="bg-white text-black px-4 py-1 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors">
          Buy on Atom
        </a>
        <a href="https://godaddy.com" target="_blank" rel="noreferrer" className="bg-transparent border border-white/40 text-white px-4 py-1 rounded-full text-xs font-bold hover:bg-white/10 transition-colors">
          Buy on GoDaddy
        </a>
      </div>
    </div>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <DomainBanner />
      
      {/* Header */}
      <header className="fixed w-full z-40 top-[var(--banner-height,48px)] bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all" style={{ top: 'auto', position: 'sticky' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl">💄</span>
                <span className="text-xl font-serif font-bold text-gray-900 tracking-tight">MakeupArtist.ai</span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-brand-600' : 'text-gray-500 hover:text-gray-900'}`}>Home</NavLink>
              {user && (
                <>
                  <NavLink to="/dashboard" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-brand-600' : 'text-gray-500 hover:text-gray-900'}`}>Dashboard</NavLink>
                  <NavLink to="/chat" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-brand-600' : 'text-gray-500 hover:text-gray-900'}`}>Quick Tips</NavLink>
                </>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              {!user ? (
                <button 
                    onClick={() => document.getElementById('login-modal')?.classList.remove('hidden')}
                    className="bg-brand-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-brand-700 transition-colors"
                >
                    Sign In
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                   {user.tier === UserTier.FREE && (
                       <button 
                        onClick={() => document.getElementById('payment-modal')?.classList.remove('hidden')}
                        className="bg-gradient-to-r from-brand-500 to-gold-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-md transition-all"
                       >
                           Go Pro
                       </button>
                   )}
                   {user.tier === UserTier.PRO && (
                       <span className="bg-gray-900 text-gold-500 px-3 py-1 rounded-full text-xs font-bold border border-gold-500">PRO</span>
                   )}
                   <img src={user.avatar} alt="User" className="w-9 h-9 rounded-full border border-gray-200" />
                   <button onClick={logout} className="text-gray-400 hover:text-gray-600">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-serif italic text-gray-900 text-lg mb-4">MakeupArtist.ai</p>
            <p className="text-gray-500 text-sm mb-6">Your Art. Amplified.</p>
            <div className="text-xs text-gray-400 max-w-2xl mx-auto border-t border-gray-200 pt-6">
                <p className="mb-2"><strong>Concept Disclaimer:</strong> This website is a functional demonstration for the domain name <strong>MakeupArtist.ai</strong>.</p>
                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </div>
      </footer>

      <LoginModal />
      <PaymentModal />
    </div>
  );
};

export default Layout;