import React from "react";
import { AdminDashboard } from "../components/admin/AdminDashboard";

export const Admin: React.FC = () => {
  return (
    <div id="admin-management-page" className="w-full h-full max-w-7xl mx-auto py-2 animate-fade-in text-gray-700">
      {/* Structural dashboard layout container */}
      <AdminDashboard />
    </div>
  );
};
export default Admin;
