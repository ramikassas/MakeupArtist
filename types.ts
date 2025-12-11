export enum UserTier {
  FREE = 'FREE',
  PRO = 'PRO'
}

export enum AnalysisType {
  SKINCARE = 'SKINCARE',
  INGREDIENTS = 'INGREDIENTS'
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
}

export interface SkinAnalysisResult {
  type: 'BASIC' | 'ULTRA';
  skinType?: string;
  concerns?: string[];
  tips?: string[];
  // Pro fields
  clinicalAnalysis?: {
    texture: string;
    pores: string;
    redness: string;
    hydration: string;
    elasticity: string;
    sensitivity: string;
    pigmentation: string;
    agingSigns: string;
  };
  routine?: {
    am: string[];
    pm: string[];
  };
  ingredientsToAvoid?: string[];
}

export interface BusinessPricing {
  experienceLevel: 'junior' | 'mid' | 'senior';
  eventDuration: number;
  travelDistance: number;
  productCost: number;
}