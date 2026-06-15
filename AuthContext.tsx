import React, { createContext, useContext, useState } from 'react';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  sendPasswordReset: (email: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  sendPasswordReset: async () => false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate async auth — replace with real backend/Firebase
    await new Promise(r => setTimeout(r, 800));
    if (!email) return false;
    const name = email.split('@')[0].replace(/[._]/g, ' ');
    setUser({ name: name.charAt(0).toUpperCase() + name.slice(1), email });
    return true;
  };

  const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 800));
    if (!name || !email) return false;
    setUser({ name, email });
    return true;
  };

  const logout = () => setUser(null);

  const sendPasswordReset = async (email: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 600));
    return !!email;
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, sendPasswordReset }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
