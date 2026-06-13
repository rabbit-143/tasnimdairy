import React, { useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthModal } from "../components/auth/AuthModal";
import { LOGO } from "../constants/assets";
import { ShieldAlert, LogOut, Home, Key, LockKeyhole } from "lucide-react";

export const AdminLayout: React.FC = () => {
  const { currentUser, isAdmin, isAuthenticated, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // If loading, wait
  const [sessionRestoring, setSessionRestoring] = useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setSessionRestoring(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (sessionRestoring) {
    return (
      <div className="min-h-screen bg-primary/95 flex items-center justify-center">
        <div className="text-center space-y-4">
          <img src={LOGO} alt="Tasnim" className="h-20 w-20 rounded-full bg-white mx-auto animate-spin" referrerPolicy="no-referrer" />
          <p className="text-secondary font-display font-bold">Verifying Farm Credentials...</p>
        </div>
      </div>
    );
  }

  // Dual protection guard
  if (!isAuthenticated || !isAdmin) {
    return (
      <div id="admin-restrict-view" className="min-h-screen bg-primary flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background ambient details */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

        <div className="max-w-md w-full bg-farm-cream rounded-2xl border border-secondary/25 p-8 text-center space-y-6 relative shadow-2xl">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-secondary/10 text-secondary border border-secondary/20 rounded-full flex items-center justify-center animate-bounce">
              <LockKeyhole size={30} />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-2xl text-primary uppercase tracking-wide">
              Security Fence Active
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Administrative modules are restricted. Please sign in with the official credentials as configured in the system settings.
            </p>
          </div>

          {/* Quick instructions card */}
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 text-left space-y-1 text-xs">
            <div className="flex justify-between font-bold text-primary">
              <span>ADMIN USERNAME:</span>
              <span className="font-mono text-secondary">Super Admin</span>
            </div>
            <div className="flex justify-between font-bold text-primary">
              <span>SECURITY PASS:</span>
              <span className="font-mono text-secondary">sup123</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              to="/"
              className="flex items-center justify-center space-x-1 border border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl text-xs transition-all"
            >
              <Home size={14} />
              <span>Back to Farm</span>
            </Link>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center justify-center space-x-1.5 bg-secondary text-primary font-bold py-3 rounded-xl text-xs transition-all hover:bg-secondary-light"
            >
              <Key size={14} />
              <span>Unlock Console</span>
            </button>
          </div>
        </div>

        {/* Localized auth popup */}
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    );
  }

  // SUCCESS: Access permitted
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin header menu bar */}
      <nav className="glass shadow-sm border-b border-gray-100 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img src={LOGO} alt="Logo" className="h-10 w-10 rounded-full bg-white border" referrerPolicy="no-referrer" />
          <div className="flex flex-col">
            <span className="font-display font-black text-md text-primary tracking-tight uppercase leading-tight">
              TASNIM CONSOLE
            </span>
            <span className="text-3xs font-extrabold text-secondary tracking-widest uppercase">
              Management Suite
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center text-xs space-x-2 text-primary font-bold bg-white p-2 border border-gray-100 rounded-lg">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span>Authorized: Super Admin Mode</span>
          </div>
          
          <Link
            to="/"
            className="text-xs font-semibold text-gray-600 hover:text-primary transition-all flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 rounded-lg"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Return to Farm store</span>
          </Link>

          <button
            onClick={() => logout()}
            className="text-xs font-semibold text-red-650 hover:text-red-700 transition-all flex items-center space-x-1 px-3 py-2 bg-red-50 hover:bg-red-100 rounded-lg"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Terminate session</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
};
