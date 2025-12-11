export enum UserTier {
  FREE = 'FREE',
  PRO = 'PRO'
}

export interface User {
  id: string;
  name: string;
  email: string;
  tier: UserTier;
  avatar: string;
  provider: 'google' | 'x';
}

export interface AuthContextType {
  user: User | null;
  login: (provider: 'google' | 'x') => void;
  logout: () => void;
  upgradeToPro: () => void;
  isLoading: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export enum AnalysisType {
  SKINCARE = 'skincare',
  INGREDIENTS = 'ingredients',
  ROUTINE = 'routine'
}