import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Using HashRouter in App
import { useAuth } from '../contexts/AuthContext';
import { UserTier } from '../types';

interface ProGateProps {
  children: React.ReactNode;
}

const ProGate: React.FC<ProGateProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    if (user.tier !== UserTier.PRO) {
      // If not pro, show modal or redirect to upgrade page. 
      // For this implementation, we redirect to a specific 'upgrade' trigger path or show alert.
      // Better: Render a "Locked" UI state instead of redirecting to prevent loops.
      setIsAllowed(false);
    } else {
      setIsAllowed(true);
    }
  }, [user, navigate]);

  if (!user || (user.tier !== UserTier.PRO)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-4xl mb-4">
            💎
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900">Pro Feature Locked</h2>
        <p className="text-gray-600 max-w-md">
          This feature is available exclusively to our MakeupArtist.ai Pro members. 
          Unlock full AI power, video generation, and live consultations.
        </p>
        <button 
          onClick={() => document.getElementById('payment-modal')?.classList.remove('hidden')}
          className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Upgrade for €99/mo
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProGate;