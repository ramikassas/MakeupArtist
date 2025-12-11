import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const PaymentModal: React.FC = () => {
  const { upgradeToPro } = useAuth();

  const handlePay = () => {
    // Simulate opening PayPal in new window
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    // In a real app, this would be the PayPal checkout flow.
    const w = window.open('', 'PayPal Mock', `width=${width},height=${height},top=${top},left=${left}`);
    
    if (w) {
        w.document.write(`
            <html>
                <head>
                    <title>Pay with PayPal</title>
                    <style>
                        body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: #f0f0f0; }
                        .card { background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; }
                        .logo { color: #003087; font-weight: bold; font-size: 24px; margin-bottom: 20px; font-style: italic; }
                        .logo span { color: #009cde; }
                        button { background: #0070ba; color: white; border: none; padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; font-size: 16px; width: 100%; margin-top: 20px; }
                        button:hover { background: #003087; }
                        .amount { font-size: 32px; margin: 20px 0; color: #333; }
                        .recipient { color: #666; font-size: 14px; margin-bottom: 20px; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <div class="logo">Pay<span>Pal</span></div>
                        <div class="recipient">Paying: parfankassas@gmail.com</div>
                        <h3>MakeupArtist.ai Pro Plan</h3>
                        <div class="amount">€99.00 EUR</div>
                        <button onclick="window.opener.postMessage('payment_success', '*'); window.close();">Pay Now</button>
                    </div>
                </body>
            </html>
        `);
    }
  };

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'payment_success') {
        upgradeToPro();
        document.getElementById('payment-modal')?.classList.add('hidden');
        alert("Payment Successful! Welcome to Pro.");
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [upgradeToPro]);

  return (
    <div id="payment-modal" className="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button 
          onClick={() => document.getElementById('payment-modal')?.classList.add('hidden')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.946 5.438-3.158 7.12-6.578 7.12h-1.29a.64.64 0 0 0-.635.539l-.734 4.676a.641.641 0 0 0 .633.741h3.337c.484 0 .894-.367.962-.848l.056-.37a.64.64 0 0 0 .002-.073l.635-4.043a.64.64 0 0 1 .634-.539h.454c2.518 0 4.148-1.22 4.846-5.666.027-.16.05-.315.07-.468.618-4.326-1.92-5.74-6.403-5.74H7.994a.641.641 0 0 0-.633.54L4.394 18.667a.64.64 0 0 0 .633.74h2.246c.485 0 .895-.366.963-.848l.216-1.528a.641.641 0 0 1 .634-.539h.73a.641.641 0 0 1 .634.74l-.274 1.73a.64.64 0 0 1-.633.54l-2.467-.166z"/></svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Upgrade to Pro</h3>
            <p className="text-gray-500 mb-6">Unlock exclusive AI beauty features for €99.00/month</p>
            
            <ul className="text-left space-y-3 mb-8 text-gray-600">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Real-time Live Voice Consultation</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Custom AI Video Tutorials (Veo)</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Clinical Grade Skin Analysis</li>
            </ul>

            <button 
                onClick={handlePay}
                className="w-full bg-[#0070ba] hover:bg-[#003087] text-white font-bold py-3 px-4 rounded-full transition-colors flex items-center justify-center"
            >
                Pay with PayPal
            </button>
            <p className="mt-3 text-xs text-gray-400">Secure payment to parfankassas@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;