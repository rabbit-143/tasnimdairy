import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { Footer } from "../components/footer/Footer";
import { CartDrawer } from "../components/cart/CartDrawer";
import { AuthModal } from "../components/auth/AuthModal";

export const MainLayout: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-farm-cream selection:bg-secondary selection:text-primary">
      {/* Primary navigation bar */}
      <Navbar onOpenAuth={() => setIsAuthModalOpen(true)} />

      {/* Primary child content layout */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Sticky footer blocks */}
      <Footer />

      {/* Cart side sliding canvas */}
      <CartDrawer />

      {/* Account popup overlay */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};
