import React from "react";
import { CalendarDays, Clock, User, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const Blog = () => {
  // Dummy blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React in 2025",
      excerpt: "Learn how to build modern applications with React and the latest best practices.",
      author: "Jane Smith",
      date: "April 5, 2025",
      readTime: "8 min read",
      category: "Development",
      tags: ["React", "JavaScript", "Web Development"],
      image: "/api/placeholder/800/400",
      content: "This is the full content of the blog post which would be displayed on a separate page..."
    },
    {
      id: 2,
      title: "Designing with Tailwind CSS",
      excerpt: "Explore the power of utility-first CSS and how it can speed up your development workflow.",
      author: "Mike Johnson",
      date: "April 2, 2025",
      readTime: "6 min read",
      category: "Design",
      tags: ["CSS", "Tailwind", "UI Design"],
      image: "/api/placeholder/800/400",
      content: "This is the full content of the blog post which would be displayed on a separate page..."
    },
    {
      id: 3,
      title: "The Future of TypeScript",
      excerpt: "Discover the upcoming features in TypeScript and how they will improve your development experience.",
      author: "Alex Chen",
      date: "March 28, 2025",
      readTime: "10 min read",
      category: "Development",
      tags: ["TypeScript", "JavaScript", "Programming"],
      image: "/api/placeholder/800/400",
      content: "This is the full content of the blog post which would be displayed on a separate page..."
    },
    {
      id: 4,
      title: "Building Accessible Web Applications",
      excerpt: "Learn how to create web applications that are accessible to all users, regardless of their abilities.",
      author: "Sarah Williams",
      date: "March 25, 2025",
      readTime: "7 min read",
      category: "Accessibility",
      tags: ["A11y", "Web Standards", "Inclusive Design"],
      image: "/api/placeholder/800/400",
      content: "This is the full content of the blog post which would be displayed on a separate page..."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl text-myBlack font-bold mb-8">Blog</h1>
      
      {/* Featured post */}
      <div className="mb-12">
        <h2 className="text-xl text-myBlack font-bold mb-4">Featured Post</h2>
        <Card className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img 
                src="/api/placeholder/500/400" 
                alt="Featured post" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <CardTitle>{blogPosts[0].title}</CardTitle>
                <CardDescription>{blogPosts[0].excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <div className="flex items-center">
                    <User className="size-3 mr-1" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="size-3 mr-1" />
                    {blogPosts[0].date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="size-3 mr-1" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center space-x-2">
                  <Tag className="size-3" />
                  <div className="flex space-x-2">
                    {blogPosts[0].tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent posts - Horizontal Layout */}
      <div>
        <h2 className="text-xl text-myBlack font-bold mb-4">Recent Posts</h2>
        <div className="space-y-6">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/4 h-48 sm:h-auto">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:w-3/4">
                  <CardHeader>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <User className="size-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <CalendarDays className="size-3 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="size-3 mr-1" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center">
                        <Tag className="size-3 mr-1" />
                        <div className="flex flex-wrap gap-1 mt-1">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">
                      Read more
                    </button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Category filters */}
      <div className="mt-12">
        <h2 className="text-xl text-myBlack font-bold mb-4">Categories</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              {["All", "Development", "Design", "Accessibility", "TypeScript", "JavaScript", "React"].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 text-sm rounded-full bg-slate-100 hover:bg-slate-200 transition"
                >
                  {category}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Blog;