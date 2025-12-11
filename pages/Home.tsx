import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1487412947132-2329845674c5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
                Beauty, Reimagined <br/> with <span className="text-brand-600">Intelligence</span>.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Your personal AI consultant. Real-time voice guidance, custom video tutorials, and clinical-grade skin analysis.
            </p>
            {!user ? (
                <button 
                    onClick={() => document.getElementById('login-modal')?.classList.remove('hidden')}
                    className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                    Start Your Transformation
                </button>
            ) : (
                <Link 
                    to="/dashboard"
                    className="bg-brand-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                    Go to Dashboard
                </Link>
            )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-brand-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-100/50 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-2xl mb-6">💬</div>
                    <h3 className="text-xl font-bold mb-3 font-serif">Quick Tips</h3>
                    <p className="text-gray-600">Get instant answers to your beauty questions powered by our fast response engine.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-100/50 hover:shadow-md transition-shadow relative overflow-hidden group">
                     <div className="absolute top-0 right-0 bg-gold-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">PRO</div>
                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-2xl mb-6">🎥</div>
                    <h3 className="text-xl font-bold mb-3 font-serif">Video Generation</h3>
                    <p className="text-gray-600">Create custom cinematic makeup tutorials just by describing the look you want.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-100/50 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-gold-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">PRO</div>
                    <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-2xl mb-6">🔬</div>
                    <h3 className="text-xl font-bold mb-3 font-serif">Deep Analysis</h3>
                    <p className="text-gray-600">Analyze ingredients and complex skin concerns with our advanced thinking model.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;