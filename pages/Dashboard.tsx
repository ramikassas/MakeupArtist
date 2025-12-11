import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserTier } from '../types';

const DashboardCard: React.FC<{ 
    title: string; 
    subtitle: string; 
    icon: string; 
    link: string; 
    locked?: boolean;
    tier?: string;
    badge?: string;
}> = ({ title, subtitle, icon, link, locked, tier, badge }) => (
    <Link 
        to={link}
        onClick={(e) => {
            if (locked) {
                e.preventDefault();
                document.getElementById('payment-modal')?.classList.remove('hidden');
            }
        }}
        className={`relative block p-6 rounded-2xl transition-all duration-300 border ${locked ? 'bg-gray-50 border-gray-200 opacity-80' : 'bg-white border-gray-100 hover:shadow-xl hover:-translate-y-1'}`}
    >
        <div className="flex justify-between items-start mb-4">
            <span className="text-3xl">{icon}</span>
            <div className="flex gap-2">
                {badge && <span className="text-[10px] font-bold bg-brand-100 text-brand-600 px-2 py-1 rounded">{badge}</span>}
                {locked && <span className="text-xs font-bold bg-gray-200 text-gray-500 px-2 py-1 rounded">LOCKED</span>}
                {tier === 'PRO' && !locked && <span className="text-[10px] font-bold bg-black text-gold-500 px-2 py-1 rounded">PRO</span>}
            </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
        
        {locked && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/60 backdrop-blur-[1px] rounded-2xl">
                <button className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">Upgrade to Unlock</button>
            </div>
        )}
    </Link>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const isPro = user.tier === UserTier.PRO;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Studio Dashboard</h1>
        <p className="text-gray-500">Your AI Beauty Ecosystem.</p>
      </header>

      {/* Free Tier Essentials */}
      <section className="mb-12">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Daily Essentials (Free)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard 
                title="Quick Chat" 
                subtitle="Instant beauty advice & tips." 
                icon="💬" 
                link="/chat" 
            />
            <DashboardCard 
                title="AI Makeup Try-On" 
                subtitle="Upload selfie & apply looks." 
                icon="💄" 
                link="/try-on"
                badge="NEW"
            />
            <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50 flex flex-col items-center justify-center text-center opacity-50">
                <span className="text-2xl mb-2">📅</span>
                <h3 className="font-bold">Daily Look</h3>
                <p className="text-xs">Refreshes in 12h</p>
            </div>
        </div>
      </section>

      {/* Pro Suite */}
      <section>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold text-brand-600 uppercase tracking-widest">Professional Suite (€99/mo)</h2>
            {!isPro && <span className="text-xs text-gray-400">Locked</span>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <DashboardCard 
                title="Brand Identity" 
                subtitle="Logo, Colors & Fonts." 
                icon="🆔" 
                link="/brand-identity" 
                locked={!isPro}
                tier="PRO"
                badge="NEW"
            />
            <DashboardCard 
                title="Look-Book Creator" 
                subtitle="Generate seasonal collections." 
                icon="📖" 
                link="/lookbook" 
                locked={!isPro}
                tier="PRO"
                badge="NEW"
            />
            <DashboardCard 
                title="Clinical Skin Lab" 
                subtitle="14-point deep analysis engine." 
                icon="🧬" 
                link="/skin-analysis" 
                locked={!isPro}
                tier="PRO"
            />
            <DashboardCard 
                title="Portfolio Generator" 
                subtitle="Before/After & Retouching." 
                icon="📸" 
                link="/portfolio" 
                locked={!isPro}
                tier="PRO"
            />
            <DashboardCard 
                title="Live Mentor" 
                subtitle="Real-time voice guidance." 
                icon="🎙️" 
                link="/live" 
                locked={!isPro}
                tier="PRO"
            />
            <DashboardCard 
                title="Veo Video Studio" 
                subtitle="Cinematic tutorial generator." 
                icon="🎥" 
                link="/video" 
                locked={!isPro}
                tier="PRO"
            />
            <DashboardCard 
                title="Business Center" 
                subtitle="Pricing, Clients & Content." 
                icon="💼" 
                link="/business" 
                locked={!isPro}
                tier="PRO"
            />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;