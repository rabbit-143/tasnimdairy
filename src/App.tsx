import React, { Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FarmProvider } from "./context/FarmContext";

// Layout components
import { MainLayout } from "./layouts/MainLayout";
import { AdminLayout } from "./layouts/AdminLayout";

// Page modules
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";

// Smooth loader spinner fallback
const LoaderFallback = () => (
  <div className="min-h-screen bg-farm-cream flex items-center justify-center">
    <div className="text-center space-y-3">
      <div className="w-10 h-10 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto" />
      <p className="text-xs font-semibold text-primary tracking-widest uppercase">Tasnim Farm Loading...</p>
    </div>
  </div>
);

// 404 Error Component
const RouteNotFound = () => (
  <div className="min-h-screen bg-farm-cream flex flex-col items-center justify-center p-6 text-center">
    <span className="text-6xl">🥛</span>
    <h2 className="text-2xl font-display font-black text-primary mt-4 uppercase">Pathway Spilled</h2>
    <p className="text-xs text-gray-500 max-w-xs mt-2">
      This page isn't on our dairy pasture chart. Verify the address URL or return to the store catalog.
    </p>
    <a
      href="#/"
      className="bg-primary hover:bg-primary-light text-white text-3xs font-extrabold px-6 py-3 rounded-full uppercase tracking-wider mt-5 shadow-sm transition-all"
    >
      Return to Meadows
    </a>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <FarmProvider>
        <CartProvider>
          <HashRouter>
            <Suspense fallback={<LoaderFallback />}>
              <Routes>
                
                {/* 1. PUBLIC CUSTOMER-FACING CHANNELS */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                </Route>

                {/* 2. PROTECTED AND ISOLATED CONSOLE CHANNELS */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Admin />} />
                </Route>

                {/* 3. COLD RESET 404 CATCHER */}
                <Route path="*" element={<RouteNotFound />} />

              </Routes>
            </Suspense>
          </HashRouter>
        </CartProvider>
      </FarmProvider>
    </AuthProvider>
  );
}
