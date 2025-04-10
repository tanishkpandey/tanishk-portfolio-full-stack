'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaHome, FaBlog, FaBookOpen, FaCode } from 'react-icons/fa';
import Link from 'next/link';

const AdminPanelContent = () => {
  const adminSections = [
    { 
      title: 'Dashboard', 
      description: 'Manage your dashboard content',
      href: '/admin-panel/components/dashboard',
      icon: <FaHome className="h-10 w-10" />
    },
    { 
      title: 'Blog', 
      description: 'Create and manage blog posts',
      href: '/admin-panel/components/blog',
      icon: <FaBlog className="h-10 w-10" />
    },
    { 
      title: 'Resources', 
      description: 'Add and edit resource materials',
      href: '/admin-panel/components/resources',
      icon: <FaBookOpen className="h-10 w-10" />
    },
    { 
      title: 'Snippets', 
      description: 'Manage code snippets',
      href: '/admin-panel/components/snippets',
      icon: <FaCode className="h-10 w-10" />
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminSections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{section.title}</CardTitle>
                <div className="text-gray-600">
                  {section.icon}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminPanelContent;