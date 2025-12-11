import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User, UserTier } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load from local storage to persist mock session
  useEffect(() => {
    const storedUser = localStorage.getItem('makeup_artist_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (provider: 'google' | 'x') => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const mockUser: User = {
        id: 'u_' + Date.now(),
        name: provider === 'google' ? 'Jane Doe' : '@MakeupLover',
        email: provider === 'google' ? 'jane@gmail.com' : 'jane@x.com',
        tier: UserTier.FREE,
        avatar: `https://picsum.photos/seed/${Date.now()}/150/150`,
        provider
      };
      setUser(mockUser);
      localStorage.setItem('makeup_artist_user', JSON.stringify(mockUser));
      setIsLoading(false);
    }, 800);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('makeup_artist_user');
  };

  const upgradeToPro = () => {
    if (user) {
      const updatedUser = { ...user, tier: UserTier.PRO };
      setUser(updatedUser);
      localStorage.setItem('makeup_artist_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToPro, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};