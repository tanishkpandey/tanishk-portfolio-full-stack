'use client';

import { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 transition-all duration-300" style={{ marginLeft: sidebarOpen ? '240px' : '0' }}>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}