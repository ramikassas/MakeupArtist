import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const PaymentModal: React.FC = () => {
  const { upgradeToPro } = useAuth();

  const handlePay = () => {
    // Mock Payment
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const w = window.open('', 'PayPal Mock', `width=${width},height=${height},top=${top},left=${left}`);
    if (w) {
        w.document.write(`<html><head><title>Pay with PayPal</title></head><body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;background:#f5f5f5"><div style="background:white;padding:40px;border-radius:12px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,0.1)"><h2>MakeupArtist.ai PRO</h2><p style="font-size:24px;margin:20px 0">€99.00 / month</p><button onclick="window.opener.postMessage('payment_success', '*'); window.close();" style="background:#0070ba;color:white;border:none;padding:12px 30px;border-radius:25px;cursor:pointer;font-size:16px;font-weight:bold">Confirm Subscription</button></div></body></html>`);
    }
  };

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'payment_success') {
        upgradeToPro();
        document.getElementById('payment-modal')?.classList.add('hidden');
        alert("Welcome to the Elite Circle.");
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [upgradeToPro]);

  return (
    <div id="payment-modal" className="hidden fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-gold-500/30">
        <button onClick={() => document.getElementById('payment-modal')?.classList.add('hidden')} className="absolute top-4 right-4 text-gray-400 hover:text-black z-10"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        
        <div className="p-8">
            <div className="text-center mb-6">
                <span className="bg-black text-gold-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Professional License</span>
                <h3 className="text-3xl font-serif font-bold text-gray-900">Invest in Your Career</h3>
                <p className="text-gray-500 mt-2">The Pro plan isn't just features. It's a fundamental shift in how you work.</p>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">✓</div>
                    <div>
                        <h4 className="font-bold text-gray-900">AI Skin Analyzer Ultra</h4>
                        <p className="text-sm text-gray-600">Clinical grade analysis of 14 parameters (Pores, Texture, Elasticity).</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">✓</div>
                    <div>
                        <h4 className="font-bold text-gray-900">Business Suite</h4>
                        <p className="text-sm text-gray-600">Smart pricing calculator & Auto-Instagram content generator.</p>
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">✓</div>
                    <div>
                        <h4 className="font-bold text-gray-900">Veo Video Studio</h4>
                        <p className="text-sm text-gray-600">Generate cinematic tutorials for your portfolio.</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl flex justify-between items-center mb-6 border border-gray-100">
                <span className="text-lg font-bold text-gray-900">Total Monthly</span>
                <span className="text-2xl font-serif font-bold text-gray-900">€99.00</span>
            </div>

            <button onClick={handlePay} className="w-full bg-black hover:bg-gray-900 text-white text-lg font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Unlock Professional Access
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">Secure transaction. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;