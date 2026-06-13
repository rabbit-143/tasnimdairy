import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { authService } from "../services/authService";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (identity: string, pass: string) => Promise<User>;
  register: (name: string, email: string, phone: string, pass: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const session = await authService.getSession();
        if (session) {
          setCurrentUser(session);
        }
      } catch (e) {
        console.error("Failed to restore session", e);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  const login = async (identity: string, pass: string): Promise<User> => {
    try {
      const user = await authService.loginUser(identity, pass);
      setCurrentUser(user);
      return user;
    } catch (e) {
      throw e;
    }
  };

  const register = async (name: string, email: string, phone: string, pass: string): Promise<User> => {
    try {
      const user = await authService.registerUser({ name, email, phone, password: pass });
      return user;
    } catch (e) {
      throw e;
    }
  };

  const logout = async () => {
    await authService.logoutUser();
    setCurrentUser(null);
  };

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === "admin",
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
