import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserTier } from '../types';

const ToolCard: React.FC<{ title: string; desc: string; icon: string; link: string; isPro?: boolean; userTier: UserTier }> = ({ 
    title, desc, icon, link, isPro, userTier 
}) => {
    const locked = isPro && userTier !== UserTier.PRO;
    
    return (
        <Link 
            to={link}
            className={`block relative group overflow-hidden rounded-3xl p-8 transition-all duration-300 ${locked ? 'bg-gray-50 border border-gray-200 opacity-70 cursor-not-allowed' : 'bg-white hover:bg-brand-50 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1'}`}
            onClick={(e) => {
                if (locked) {
                    e.preventDefault();
                    document.getElementById('payment-modal')?.classList.remove('hidden');
                }
            }}
        >
            <div className="flex justify-between items-start mb-6">
                <span className="text-4xl">{icon}</span>
                {isPro && <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded uppercase">PRO</span>}
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500">{desc}</p>
            {locked && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 backdrop-blur-[1px]">
                    <div className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-bold text-gray-900 flex items-center">
                        🔒 Upgrade to Unlock
                    </div>
                </div>
            )}
        </Link>
    )
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Hello, {user.name.split(' ')[0]}</h1>
        <p className="text-gray-500">Choose a tool to start your beauty session.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <ToolCard 
            title="Quick Chat" 
            desc="Instant answers for everyday beauty questions." 
            icon="⚡" 
            link="/chat"
            userTier={user.tier}
        />
        
        <ToolCard 
            title="Live Consultant" 
            desc="Real-time voice conversation while you apply makeup." 
            icon="🎙️" 
            link="/live"
            isPro={true}
            userTier={user.tier}
        />

        <ToolCard 
            title="Video Studio" 
            desc="Generate custom AI video tutorials from prompts." 
            icon="🎬" 
            link="/video"
            isPro={true}
            userTier={user.tier}
        />

        <ToolCard 
            title="Deep Skin Analysis" 
            desc="Advanced analysis of ingredients and routines." 
            icon="🧬" 
            link="/analysis"
            isPro={true}
            userTier={user.tier}
        />
      </div>
    </div>
  );
};

export default Dashboard;