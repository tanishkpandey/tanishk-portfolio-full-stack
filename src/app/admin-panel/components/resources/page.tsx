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

interface Resource {
  id?: string;
  title?: string;
  description?: string;
  link?: string;
  category?: string;
  // Add more fields as needed
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentResource, setCurrentResource] = useState<Resource>({
    title: "",
    description: "",
    link: "",
    category: "",
  });

  // Categories for resources
  const categories = ["Tutorial", "Documentation", "Tool", "Article", "Other"];

  // Fetch resources - replace with your actual data fetching logic
  useEffect(() => {
    // Mock data
    setResources([
      { 
        id: "1", 
        title: "React Documentation", 
        description: "Official React documentation",
        link: "https://reactjs.org/docs/getting-started.html",
        category: "Documentation"
      },
      { 
        id: "2", 
        title: "Next.js Tutorial", 
        description: "Learn Next.js from scratch",
        link: "https://nextjs.org/learn",
        category: "Tutorial"
      },
    ]);
  }, []);

  const handleAddResource = () => {
    // Add implementation
    console.log("Adding resource:", currentResource);
    // Add to your database
    
    // Update local state
    setResources([...resources, { ...currentResource, id: Date.now().toString() }]);
    setCurrentResource({ title: "", description: "", link: "", category: "" });
    setIsAddingResource(false);
  };

  const handleUpdateResource = () => {
    // Update implementation
    console.log("Updating resource:", currentResource);
    // Update in your database
    
    // Update local state
    setResources(resources.map(resource => resource.id === currentResource.id ? currentResource : resource));
    setCurrentResource({ title: "", description: "", link: "", category: "" });
    setIsAddingResource(false);
    setIsEditing(false);
  };

  const handleDeleteResource = (id: string) => {
    // Delete implementation
    console.log("Deleting resource:", id);
    // Delete from your database
    
    // Update local state
    setResources(resources.filter(resource => resource.id !== id));
  };

  const editResource = (resource: Resource) => {
    setCurrentResource(resource);
    setIsEditing(true);
    setIsAddingResource(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resource Management</h1>
        <button 
          onClick={() => {
            setIsAddingResource(!isAddingResource);
            if (!isAddingResource) {
              setCurrentResource({ title: "", description: "", link: "", category: "" });
              setIsEditing(false);
            }
          }}
          className="flex items-center gap-2 bg-myBlack hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          {isAddingResource ? "Cancel" : (
            <>
              <BiPlus />
              <span>Add New Resource</span>
            </>
          )}
        </button>
      </div>

      {isAddingResource && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Resource" : "Add New Resource"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={currentResource.title}
                  onChange={(e) => setCurrentResource({ ...currentResource, title: e.target.value })}
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={currentResource.description}
                  onChange={(e) => setCurrentResource({ ...currentResource, description: e.target.value })}
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link</label>
                <input
                  type="url"
                  value={currentResource.link}
                  onChange={(e) => setCurrentResource({ ...currentResource, link: e.target.value })}
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  value={currentResource.category}
                  onChange={(e) => setCurrentResource({ ...currentResource, category: e.target.value })}
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={isEditing ? handleUpdateResource : handleAddResource}
                className="bg-myBlack hover:bg-gray-700 text-white p-3 rounded-lg w-full"
              >
                {isEditing ? "Update Resource" : "Add Resource"}
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>{resource.title}</CardTitle>
                <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">{resource.category}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => editResource(resource)}
                  className="hover:text-gray-600 transition text-xl text-myBlack p-2 rounded-full"
                >
                  <BiSolidEdit />
                </button>
                <button
                  onClick={() => handleDeleteResource(resource.id!)}
                  className="hover:text-red-500 transition text-xl text-myBlack p-2 rounded-full"
                >
                  <RiDeleteBin3Line />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{resource.description}</p>
              <a 
                href={resource.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {resource.link}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}