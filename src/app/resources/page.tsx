"use client"

import React, { useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Code,
  Folder,
  Monitor,
  BookOpen,
  Coffee,
  Briefcase,
  Search,
  Grid,
  List,
  Clock,
  ExternalLink,
  Star,
  Link
} from "lucide-react"

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [viewMode, setViewMode] = useState("grid") // grid or list

  // Dummy resource categories
  const categories = [
    { id: "all", name: "All", icon: <Folder className="size-4" /> },
    {
      id: "development",
      name: "Development",
      icon: <Code className="size-4" />,
    },
    { id: "design", name: "Design", icon: <Monitor className="size-4" /> },
    {
      id: "documentation",
      name: "Documentation",
      icon: <BookOpen className="size-4" />,
    },
    { id: "tools", name: "Tools", icon: <Code className="size-4" /> },
    {
      id: "productivity",
      name: "Productivity",
      icon: <Coffee className="size-4" />,
    },
    { id: "work", name: "Work", icon: <Briefcase className="size-4" /> },
  ]

  // Dummy resources data
  const resources = [
    {
      id: 1,
      title: "GitHub",
      url: "https://github.com",
      description:
        "Code hosting platform for version control and collaboration",
      category: "development",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Today",
    },
    {
      id: 2,
      title: "Figma",
      url: "https://figma.com",
      description: "Interface design tool for collaborative design projects",
      category: "design",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Today",
    },
    {
      id: 3,
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      description: "Resources for developers, by developers",
      category: "documentation",
      icon: "/api/placeholder/50/50",
      favorite: false,
      lastUsed: "Yesterday",
    },
    {
      id: 4,
      title: "VS Code",
      url: "https://code.visualstudio.com",
      description:
        "Code editor redefined and optimized for building modern web applications",
      category: "development",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Today",
    },
    {
      id: 5,
      title: "Notion",
      url: "https://notion.so",
      description:
        "All-in-one workspace for notes, tasks, wikis, and databases",
      category: "productivity",
      icon: "/api/placeholder/50/50",
      favorite: false,
      lastUsed: "2 days ago",
    },
    {
      id: 6,
      title: "React Documentation",
      url: "https://reactjs.org",
      description: "Official React documentation",
      category: "documentation",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Yesterday",
    },
    {
      id: 7,
      title: "Tailwind CSS",
      url: "https://tailwindcss.com",
      description:
        "Utility-first CSS framework for rapidly building custom designs",
      category: "design",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Yesterday",
    },
    {
      id: 8,
      title: "Jira",
      url: "https://atlassian.com/software/jira",
      description: "Issue & project tracking software",
      category: "work",
      icon: "/api/placeholder/50/50",
      favorite: false,
      lastUsed: "3 days ago",
    },
    {
      id: 9,
      title: "Stack Overflow",
      url: "https://stackoverflow.com",
      description: "Public platform to ask and answer coding questions",
      category: "development",
      icon: "/api/placeholder/50/50",
      favorite: false,
      lastUsed: "Today",
    },
    {
      id: 10,
      title: "Vercel",
      url: "https://vercel.com",
      description: "Platform for frontend frameworks and static sites",
      category: "development",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Yesterday",
    },
    {
      id: 11,
      title: "Slack",
      url: "https://slack.com",
      description: "Business communication platform",
      category: "work",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Today",
    },
    {
      id: 12,
      title: "ChatGPT",
      url: "https://chat.openai.com",
      description: "AI language model for assistance with various tasks",
      category: "tools",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Today",
    },
  ]

  // Filter resources by search term and category
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchTerm === "" ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      activeCategory === "All" ||
      resource.category === activeCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Sort resources by favorite status and then by last used
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (a.favorite && !b.favorite) return -1
    if (!a.favorite && b.favorite) return 1

    // Compare last used dates
    const lastUsedOrder = { Today: 0, Yesterday: 1 }
    const aOrder =
      lastUsedOrder[a.lastUsed] !== undefined ? lastUsedOrder[a.lastUsed] : 2
    const bOrder =
      lastUsedOrder[b.lastUsed] !== undefined ? lastUsedOrder[b.lastUsed] : 2

    return aOrder - bOrder
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl text-myBlack font-bold mb-8">Daily Resources</h1>

      {/* Search and view options */}
      <div className="mb-8">
        <Card>
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* View options */}
              <div className="flex items-center space-x-4">
                <button
                  className={`p-2 rounded-md transition ${
                    viewMode === "grid" ? "bg-slate-200" : "hover:bg-slate-100"
                  }`}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <Grid className="size-4" />
                </button>
                <button
                  className={`p-2 rounded-md transition ${
                    viewMode === "list" ? "bg-slate-200" : "hover:bg-slate-100"
                  }`}
                  onClick={() => setViewMode("list")}
                  title="List view"
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                activeCategory === category.name
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-gray-700"
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              <span className="mr-2">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Resources */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedResources.map((resource) => (
            <Card
              key={resource.id}
              className="h-full hover:shadow-md transition cursor-pointer"
              onClick={() => window.open(resource.url, "_blank")}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </div>
                  {resource.favorite && (
                    <Star className="size-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">
                  {resource.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Clock className="size-3 mr-1" />
                  {resource.lastUsed}
                </div>
                <div className="flex items-center">
                  <ExternalLink className="size-3" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <ul className="divide-y">
              {sortedResources.map((resource) => (
                <li
                  key={resource.id}
                  className="py-3 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
                  onClick={() => window.open(resource.url, "_blank")}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={resource.icon}
                      alt={resource.title}
                      className="w-6 h-6 rounded"
                    />
                    <div>
                      <h3 className="font-medium text-myBlack flex items-center">
                        {resource.title}
                        {resource.favorite && (
                          <Star className="size-3 text-yellow-400 fill-yellow-400 ml-2" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="size-3 mr-1" />
                      {resource.lastUsed}
                    </span>
                    <ExternalLink className="size-4 text-gray-400" />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {sortedResources.length === 0 && (
        <div className="text-center py-12">
          <Link className="mx-auto size-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">
            No resources found
          </h3>
          <p className="text-gray-500">Try adjusting your search or category</p>
        </div>
      )}

      {/* Add new resource button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ResourcesPage
