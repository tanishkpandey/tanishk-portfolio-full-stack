'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaBlog, FaBookOpen, FaCode, FaBars } from 'react-icons/fa';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin-panel/components/dashboard', icon: <FaHome className="w-5 h-5" /> },
    { label: 'Blog', href: '/admin-panel/components/blog', icon: <FaBlog className="w-5 h-5" /> },
    { label: 'Resources', href: '/admin-panel/components/resources', icon: <FaBookOpen className="w-5 h-5" /> },
    { label: 'Snippets', href: '/admin-panel/components/snippets', icon: <FaCode className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-gray-800 text-white"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-20 ${
          isOpen ? 'w-60' : 'w-0 -translate-x-full md:translate-x-0 md:w-16'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {isOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-md p-1 text-gray-400 hover:text-white focus:outline-none"
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 py-4">
            <nav className="space-y-1 px-2">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                    (pathname === item.href || (pathname?.startsWith(item.href)))
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <div className="mr-3">{item.icon}</div>
                  {isOpen && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-700">
            {isOpen && (
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-600"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Admin User</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;