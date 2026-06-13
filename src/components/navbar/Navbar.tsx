import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useFarm } from "../../context/FarmContext";
import { LOGO } from "../../constants/assets";
import { ShoppingCart, User, LogOut, LayoutDashboard, Menu, X, Phone, ShieldCheck } from "lucide-react";

export const Navbar: React.FC<{ onOpenAuth: () => void }> = ({ onOpenAuth }) => {
  const { currentUser, logout, isAdmin, isAuthenticated } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const { settings } = useFarm();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const bannerText = settings?.bannerText || "🥛 Experience pure luxury organic dairy sourced raw from our custom automated pastures! 🥛";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* 1. Promo / Announcement Banner */}
      <div id="promo-banner" className="h-10 bg-primary text-[#FDFBF7] flex items-center justify-between px-6 md:px-12 text-[11px] uppercase tracking-[0.2em] font-display">
        <div className="hidden sm:flex gap-6">
          <span>Experience Purity</span>
          <span className="opacity-60">|</span>
          <span>Free Local Delivery</span>
        </div>
        <div className="flex-1 sm:flex-none text-center sm:text-right flex justify-center sm:justify-end gap-6 font-semibold">
          <Link to="/admin" className="cursor-pointer hover:text-secondary hover:underline transition-all">Admin Portal</Link>
          <span className="opacity-60 hidden xs:inline">|</span>
          <a href={`https://wa.me/${settings?.whatsapp || "8801712345678"}`} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-secondary transition-all">WhatsApp: {settings?.phone || "+880 1712-345678"}</a>
        </div>
      </div>

      {/* 2. Primary Navigation Strip */}
      <nav className="w-full bg-farm-cream/90 backdrop-blur-md sticky top-0 shadow-xs border-b border-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo area */}
            <div className="flex-shrink-0 flex items-center">
              <Link id="nav-logo-link" to="/" className="flex items-center space-x-3">
                <img
                  id="nav-logo"
                  src={LOGO}
                  alt="Tasnim Dairy Farm Logo"
                  className="h-12 w-auto rounded-full border border-secondary/20 bg-white object-contain p-0.5"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span id="nav-brand-name" className="text-primary font-display font-bold text-base leading-tight tracking-[0.2em] uppercase">
                    Tasnim
                  </span>
                  <span className="text-secondary font-display font-semibold text-[9px] tracking-[0.3em] uppercase">
                    Dairy Farm
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div id="desktop-links" className="hidden md:flex space-x-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-display text-[13px] font-medium uppercase tracking-widest transition-all duration-300 relative py-2 ${
                      isActive 
                        ? "text-primary font-semibold" 
                        : "text-farm-text/80 hover:text-secondary"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-xs" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Utility Icons & Auth controls */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Telephone Quick Contact */}
              <div className="hidden lg:flex items-center text-primary/80 space-x-2 text-xs font-semibold font-display tracking-widest uppercase">
                <Phone size={13} className="text-secondary" />
                <span>{settings?.phone || "+880 1712-345678"}</span>
              </div>

              {/* Shopping Cart button */}
              <button
                id="cart-trigger"
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 border border-secondary/35 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white text-primary transition-all duration-200"
                aria-label="Toggle Shopping Cart"
              >
                <ShoppingCart size={16} />
                {cartCount > 0 && (
                  <span id="cart-gauge" className="absolute -top-1.5 -right-1.5 bg-primary text-secondary font-display text-[9px] font-bold w-5.5 h-5.5 rounded-full flex items-center justify-center border border-secondary/20">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account Menu / Dropdown */}
              <div className="relative">
                {isAuthenticated ? (
                  <div>
                    <button
                      id="user-menu-btn"
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center space-x-2.5 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-full py-1.5 px-3.5 transition-all text-primary font-medium text-sm"
                    >
                      <div className="w-7 h-7 rounded-full bg-primary text-secondary font-display font-bold flex items-center justify-center text-xs shadow-inner">
                        {currentUser?.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="max-w-[100px] truncate">{currentUser?.name.split(" ")[0]}</span>
                    </button>

                    {userDropdownOpen && (
                      <div id="user-dropdown" className="absolute right-0 mt-2.5 w-52 bg-white rounded-xl shadow-xl py-2 border border-gray-100 z-50">
                        <div className="px-4 py-2 border-b border-gray-100 mb-1">
                          <p className="text-xs text-gray-400">Signed in as</p>
                          <p className="text-sm font-semibold text-gray-800 truncate">{currentUser?.name}</p>
                          <p className="text-2xs text-secondary font-medium tracking-wide">
                            {currentUser?.role === "admin" ? "SUPER ADMIN" : "SAVED PROFILE"}
                          </p>
                        </div>

                        {isAdmin && (
                          <Link
                            id="user-lnk-admin"
                            to="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-all font-medium"
                          >
                            <LayoutDashboard size={16} className="mr-3 text-secondary" />
                            Admin Panel
                          </Link>
                        )}

                        <button
                          id="user-btn-logout"
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-650 hover:bg-red-50 transition-all font-medium"
                        >
                          <LogOut size={16} className="mr-3" />
                          Log Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    id="nav-auth-trigger"
                    onClick={onOpenAuth}
                    className="flex items-center space-x-2 border border-secondary text-primary hover:bg-primary hover:text-secondary font-display text-[11px] font-semibold tracking-widest py-2.5 px-5 rounded-sm transition-all duration-300 uppercase"
                  >
                    <User size={13} className="text-secondary" />
                    <span>Customer Login</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Hamburger button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-primary"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-primary font-mono text-3xs font-black w-4.5 h-4.5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                id="hamburger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-primary hover:text-secondary hover:bg-white/50 rounded-full transition-all"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden glass border-t border-white/25 pb-6 px-4 pt-4 shadow-inner space-y-4 transition-all">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-display py-2.5 px-4 rounded-xl text-md font-semibold transition-all ${
                      isActive 
                        ? "bg-primary text-white" 
                        : "text-farm-text hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-gray-100 my-4 pt-4 space-y-4">
              <div className="px-4 text-xs font-semibold text-primary/70">
                Contact: {settings?.phone || "+880 1712-345678"}
              </div>

              {isAuthenticated ? (
                <div className="space-y-2 px-2">
                  <div className="flex items-center space-x-3 p-2 bg-primary/5 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-primary text-secondary font-bold flex items-center justify-center text-xs">
                      {currentUser?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{currentUser?.name}</p>
                      <p className="text-3xs text-secondary font-medium uppercase tracking-widest">{currentUser?.role}</p>
                    </div>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center w-full text-left px-4 py-3 rounded-xl text-sm font-semibold hover:bg-primary/5 text-gray-700"
                    >
                      <LayoutDashboard size={16} className="mr-3 text-secondary" />
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} className="mr-3" />
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="flex items-center justify-center w-full space-x-2 bg-primary text-white font-semibold py-3.5 px-5 rounded-xl shadow-md"
                >
                  <User size={16} className="text-secondary" />
                  <span>Customer Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
