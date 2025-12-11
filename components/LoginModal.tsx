import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginModal: React.FC = () => {
  const { login } = useAuth();
  
  return (
    <div id="login-modal" className="hidden fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm p-8 shadow-2xl relative">
        <button 
          onClick={() => document.getElementById('login-modal')?.classList.add('hidden')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 className="text-2xl font-serif font-bold text-center mb-1 text-gray-900">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Sign in to MakeupArtist.ai</p>

        <div className="space-y-4">
            <button 
                onClick={() => { login('google'); document.getElementById('login-modal')?.classList.add('hidden'); }}
                className="w-full flex items-center justify-center border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6 mr-3" alt="Google" />
                <span className="font-medium text-gray-700">Continue with Google</span>
            </button>
            
             <button 
                onClick={() => { login('x'); document.getElementById('login-modal')?.classList.add('hidden'); }}
                className="w-full flex items-center justify-center bg-black text-white rounded-lg p-3 hover:bg-gray-800 transition-colors"
            >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span className="font-medium">Continue with X</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;