'use client';

import dynamic from "next/dynamic";
import AdminPanelContent from "./AdminPanelContent";

// Use dynamic import to avoid SSR issues with the admin panel
const AdminPanel = () => {
  return <AdminPanelContent />;
};

export default AdminPanel;