'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalResources: 0,
    totalSnippets: 0,
  });

  // Fetch stats - replace with your actual data fetching logic
  useEffect(() => {
    // Mock data
    setStats({
      totalBlogs: 12,
      totalResources: 24,
      totalSnippets: 35,
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalBlogs}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalResources}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Snippets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalSnippets}</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <p>New blog post added - "Getting Started with Next.js"</p>
              <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <p>Resource updated - "React Documentation"</p>
              <span className="ml-auto text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <p>Code snippet added - "TypeScript Utility Types"</p>
              <span className="ml-auto text-sm text-gray-500">2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}