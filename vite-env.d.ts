// Fix: Removed vite/client reference to resolve missing type definition error

declare module 'react-markdown';

interface Window {
  // Fix: Add webkitAudioContext to Window interface to resolve property access errors
  webkitAudioContext: typeof AudioContext;
  aistudio?: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}