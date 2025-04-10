'use client';

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BiSolidEdit, 
  BiPlus
} from "react-icons/bi";
import { RiDeleteBin3Line } from "react-icons/ri";

interface Blog {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  // Add more fields as needed
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog>({
    title: "",
    content: "",
  });

  // Fetch blogs - replace with your actual data fetching logic
  useEffect(() => {
    // Mock data
    setBlogs([
      { id: "1", title: "First Blog Post", content: "This is my first blog post", createdAt: "2024-04-01" },
      { id: "2", title: "Second Blog Post", content: "This is my second blog post", createdAt: "2024-04-05" },
    ]);
  }, []);

  const handleAddBlog = () => {
    // Add implementation
    console.log("Adding blog:", currentBlog);
    // Add to your database
    
    // Update local state
    setBlogs([...blogs, { ...currentBlog, id: Date.now().toString(), createdAt: new Date().toISOString() }]);
    setCurrentBlog({ title: "", content: "" });
    setIsAddingBlog(false);
  };

  const handleUpdateBlog = () => {
    // Update implementation
    console.log("Updating blog:", currentBlog);
    // Update in your database
    
    // Update local state
    setBlogs(blogs.map(blog => blog.id === currentBlog.id ? currentBlog : blog));
    setCurrentBlog({ title: "", content: "" });
    setIsEditingBlog(false);
    setIsAddingBlog(false);
  };

  const handleDeleteBlog = (id: string) => {
    // Delete implementation
    console.log("Deleting blog:", id);
    // Delete from your database
    
    // Update local state
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const editBlog = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsEditingBlog(true);
    setIsAddingBlog(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <button 
          onClick={() => {
            setIsAddingBlog(!isAddingBlog);
            if (!isAddingBlog) {
              setCurrentBlog({ title: "", content: "" });
              setIsEditingBlog(false);
            }
          }}
          className="flex items-center gap-2 bg-myBlack hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          {isAddingBlog ? "Cancel" : (
            <>
              <BiPlus />
              <span>Add New Blog</span>
            </>
          )}
        </button>
      </div>

      {isAddingBlog && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{isEditingBlog ? "Edit Blog" : "Add New Blog"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={currentBlog.title}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                  value={currentBlog.content}
                  onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                  rows={10}
                />
              </div>
              <button
                onClick={isEditingBlog ? handleUpdateBlog : handleAddBlog}
                className="bg-myBlack hover:bg-gray-700 text-white p-3 rounded-lg w-full"
              >
                {isEditingBlog ? "Update Blog" : "Add Blog"}
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {blogs.map((blog) => (
          <Card key={blog.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>{blog.title}</CardTitle>
              <div className="flex space-x-2">
                <button
                  onClick={() => editBlog(blog)}
                  className="hover:text-gray-600 transition text-xl text-myBlack p-2 rounded-full"
                >
                  <BiSolidEdit />
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id!)}
                  className="hover:text-red-500 transition text-xl text-myBlack p-2 rounded-full"
                >
                  <RiDeleteBin3Line />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{blog.content?.substring(0, 100)}...</p>
              <p className="text-sm text-gray-400 mt-2">Created on: {new Date(blog.createdAt!).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}