import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin@school.com': { id: '1', name: 'Dr. Sarah Johnson', email: 'admin@school.com', role: 'admin', password: 'admin123' },
  'teacher@school.com': { id: '2', name: 'Mr. James Wilson', email: 'teacher@school.com', role: 'teacher', password: 'teacher123' },
  'student@school.com': { id: '3', name: 'Emily Parker', email: 'student@school.com', role: 'student', password: 'student123' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('sms_user');
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('sms_user', JSON.stringify(user));
      localStorage.setItem('sms_token', 'mock-jwt-token-' + user.id);
    } else {
      localStorage.removeItem('sms_user');
      localStorage.removeItem('sms_token');
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    const mockUser = MOCK_USERS[email];
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid email or password');
    }
    const { password: _, ...userData } = mockUser;
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await new Promise(r => setTimeout(r, 800));
    if (!MOCK_USERS[email]) {
      throw new Error('Email not found');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
