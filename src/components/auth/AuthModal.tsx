import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LOGO } from "../../constants/assets";
import { X, Lock, Mail, User, Phone, LogIn, Sparkles } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  
  // Login states
  const [loginIdentity, setLoginIdentity] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  // Register states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState("");

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginSuccess("");

    if (!loginIdentity.trim()) return setLoginError("Username, Phone, or Email is required");
    if (!loginPassword.trim()) return setLoginError("Password is required");

    try {
      const loggedUser = await login(loginIdentity, loginPassword);
      setLoginSuccess(`Successfully logged in as ${loggedUser.name}!`);
      setTimeout(() => {
        onClose();
        // Reset states
        setLoginIdentity("");
        setLoginPassword("");
        setLoginSuccess("");
      }, 1000);
    } catch (err: any) {
      setLoginError(err.message || "Invalid credentials. Try again.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    setRegSuccess("");

    if (!regName.trim()) return setRegError("Full Name is required");
    if (!regEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setRegError("Enter a valid email address");
    if (!regPhone.match(/^[0-9+-\s]{11,15}$/)) return setRegError("Enter a valid phone number (e.g. 01712xxxxxx)");
    if (regPassword.length < 5) return setRegError("Password must be at least 5 characters long");
    if (regPassword !== regConfirmPassword) return setRegError("Passwords do not match");

    try {
      await register(regName, regEmail, regPhone, regPassword);
      setRegSuccess("Account registered successfully! Please log in.");
      setTimeout(() => {
        setActiveTab("login");
        // Clear registration states
        setRegName("");
        setRegEmail("");
        setRegPhone("");
        setRegPassword("");
        setRegConfirmPassword("");
        setRegSuccess("");
      }, 1500);
    } catch (err: any) {
      setRegError(err.message || "Failed to register account.");
    }
  };

  const loadDemoUser = (role: "admin" | "customer") => {
    if (role === "admin") {
      setLoginIdentity("Super Admin");
      setLoginPassword("sup123");
    } else {
      setLoginIdentity("rashed@gmail.com");
      setLoginPassword("customer123");
    }
    setLoginError("");
  };

  return (
    <div id="auth-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-primary/45 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Card content */}
      <div className="relative bg-farm-cream w-full max-w-md rounded-2xl shadow-2xl border border-secondary/15 p-6 sm:p-8 overflow-hidden z-10">
        
        {/* Background ambient accents */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

        {/* Close trigger */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-all"
        >
          <X size={18} />
        </button>

        {/* Header Logo banner */}
        <div className="flex flex-col items-center justify-center text-center space-y-2 mb-6">
          <img
            src={LOGO}
            alt="Tasnim Gold Emblem"
            className="h-16 w-auto rounded-full bg-white border border-secondary/10 p-0.5"
            referrerPolicy="no-referrer"
          />
          <h2 className="text-xl font-display font-extrabold text-primary">
            Welcome to Tasnim Farm
          </h2>
          <p className="text-xs text-gray-400 max-w-[280px]">
            Log in to manage settings, view orders, and book premium organic products.
          </p>
        </div>

        {/* Dual Tab header */}
        <div className="flex border-b border-gray-100 mb-6 bg-white/40 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 text-center py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "login"
                ? "bg-primary text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 text-center py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "register"
                ? "bg-primary text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Create Profile
          </button>
        </div>

        {/* TAB 1: LOGIN PORTAL */}
        {activeTab === "login" ? (
          <form id="login-form" onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-2xs font-bold">
                ⚠️ {loginError}
              </div>
            )}
            {loginSuccess && (
              <div className="p-3 bg-green-50 text-green-600 border border-green-100 rounded-lg text-2xs font-bold animate-pulse">
                🌱 {loginSuccess}
              </div>
            )}

            <div>
              <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">
                USERNAME, EMAIL OR PHONE
              </label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3.5 text-gray-400" />
                <input
                  type="text"
                  className="w-full text-sm bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:border-primary focus:outline-none"
                  placeholder="e.g. Super Admin or rashed@gmail.com"
                  value={loginIdentity}
                  onChange={(e) => setLoginIdentity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">
                PASSWORD
              </label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3.5 text-gray-400" />
                <input
                  type="password"
                  className="w-full text-sm bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:border-primary focus:outline-none"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              id="auth-btn-login"
              type="submit"
              className="w-full bg-primary hover:bg-primary-light text-white font-display text-sm font-semibold tracking-wide py-3 rounded-xl transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Authenticate Account</span>
              <LogIn size={16} className="text-secondary" />
            </button>

            {/* Quick Demo Assist triggers */}
            <div className="pt-4 border-t border-gray-100/60 mt-4 text-center space-y-2">
              <span className="text-3xs text-gray-400 font-extrabold tracking-widest block uppercase">
                🔑 Quick Demo Portals
              </span>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => loadDemoUser("admin")}
                  className="bg-secondary/15 hover:bg-secondary/25 text-secondary-dark text-[10px] font-extrabold px-3 py-1.5 rounded-lg border border-secondary/20 transition-all flex items-center space-x-1"
                >
                  <Sparkles size={11} />
                  <span>Admin Credentials</span>
                </button>
                <button
                  type="button"
                  onClick={() => loadDemoUser("customer")}
                  className="bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-bold px-3 py-1.5 rounded-lg border border-primary/10 transition-all"
                >
                  Customer Demo
                </button>
              </div>
            </div>

          </form>
        ) : (
          /* TAB 2: REGISTER PORTAL */
          <form id="register-form" onSubmit={handleRegisterSubmit} className="space-y-4">
            {regError && (
              <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-2xs font-bold">
                ⚠️ {regError}
              </div>
            )}
            {regSuccess && (
              <div className="p-3 bg-green-50 text-green-600 border border-green-100 rounded-lg text-2xs font-bold">
                🌱 {regSuccess}
              </div>
            )}

            <div>
              <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">
                FULL NAME
              </label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-3.5 text-gray-400" />
                <input
                  type="text"
                  className="w-full text-sm bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:border-primary focus:outline-none"
                  placeholder="e.g. Rashed Ahmed"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">
                  EMAIL
                </label>
                <input
                  type="email"
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-2.5 focus:border-primary focus:outline-none"
                  placeholder="name@email.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">
                  PHONE
                </label>
                <input
                  type="tel"
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-2.5 focus:border-primary focus:outline-none"
                  placeholder="01712xxxxxx"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">
                  PASWORD
                </label>
                <input
                  type="password"
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-2.5 focus:border-primary focus:outline-none"
                  placeholder="Min 5 chars"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">
                  CONFIRM
                </label>
                <input
                  type="password"
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-2.5 focus:border-primary focus:outline-none"
                  placeholder="Match password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              id="auth-btn-register"
              type="submit"
              className="w-full bg-primary hover:bg-primary-light text-white font-display text-sm font-semibold tracking-wide py-3 rounded-xl transition-all shadow-md"
            >
              Establish Customer Profile
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
