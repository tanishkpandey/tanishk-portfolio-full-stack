"use client"

import React, { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import {
  Folder,
  Search,
  Grid,
  List,
  ExternalLink,
  Link,
} from "lucide-react"
import { db } from "../firebase/config"
import { collection, getDocs } from "firebase/firestore"

interface ResourcesCategory {
  id: string
  name: string
  icon?: string
}

interface Resource {
  id: string
  title: string
  url: string
  description: string
  category: string
  icon: string
  favorite: boolean
  lastUsed: string
}

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [resourcesCategories, setResourcesCategories] = useState<
    ResourcesCategory[]
  >([])
  const [resources, setResources] = useState<Resource[]>([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFirebaseData = async () => {
      try {
        if (!db) {
          console.error("Firebase not initialized")
          return
        }

        // Fetch Resource Categories
        const categoryCollection = collection(db, "Resource Category")
        const categorySnapshot = await getDocs(categoryCollection)
        const fetchedResourcesCategory = categorySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setResourcesCategories(fetchedResourcesCategory as ResourcesCategory[])

        // Fetch Resources
        const resourcesCollection = collection(db, "Resources")
        const resourcesSnapshot = await getDocs(resourcesCollection)
        const fetchedResources = resourcesSnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title || "",
            url: data.url || "",
            description: data.description || "",
            category: data.category || "",
            icon: data.icon || "/api/placeholder/50/50",
            favorite: data.favorite || false,
          }
        })
        setResources(fetchedResources as Resource[])
      } catch (error) {
        console.error("Error fetching data from Firebase:", error)
        // Load fallback data if Firebase fails
        setResources(fallbackResources)
      } finally {
        setLoading(false)
      }
    }

    fetchFirebaseData()
  }, [])

  // Create categories array from the fetched data
  const categories = [
    { id: "all", name: "All", icon: <Folder className="size-4" /> },
    ...resourcesCategories.map((category) => ({
      id: category.id,
      name: category.name,
      icon: category.icon,
    })),
  ]

  // Fallback resources data in case Firebase fails
  const fallbackResources: Resource[] = [
    {
      id: "3",
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      description: "Resources for developers, by developers",
      category: "documentation",
      icon: "/api/placeholder/50/50",
      favorite: false,
      lastUsed: "Yesterday",
    },
    {
      id: "4",
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
      id: "5",
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
      id: "6",
      title: "React Documentation",
      url: "https://reactjs.org",
      description: "Official React documentation",
      category: "documentation",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Yesterday",
    },
    {
      id: "7",
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
      id: "8",
      title: "Jira",
      url: "https://atlassian.com/software/jira",
      description: "Issue & project tracking software",
      category: "work",
      icon: "/api/placeholder/50/50",
      favorite: false,
      lastUsed: "3 days ago",
    },
    {
      id: "9",
      title: "Stack Overflow",
      url: "https://stackoverflow.com",
      description: "Public platform to ask and answer coding questions",
      category: "development",
      icon: "/api/placeholder/50/50",
      favorite: false,
      lastUsed: "Today",
    },
    {
      id: "10",
      title: "Vercel",
      url: "https://vercel.com",
      description: "Platform for frontend frameworks and static sites",
      category: "development",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Yesterday",
    },
    {
      id: "11",
      title: "Slack",
      url: "https://slack.com",
      description: "Business communication platform",
      category: "work",
      icon: "/api/placeholder/50/50",
      favorite: true,
      lastUsed: "Today",
    },
    {
      id: "12",
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
      resource.category.toLowerCase() === activeCategory.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Sort resources by favorite status and then by last used
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (a.favorite && !b.favorite) return -1
    if (!a.favorite && b.favorite) return 1

    // Compare last used dates
    const lastUsedOrder = { Today: 0, Yesterday: 1 }
    const aOrder =
      lastUsedOrder[a.lastUsed as keyof typeof lastUsedOrder] !== undefined
        ? lastUsedOrder[a.lastUsed as keyof typeof lastUsedOrder]
        : 2
    const bOrder =
      lastUsedOrder[b.lastUsed as keyof typeof lastUsedOrder] !== undefined
        ? lastUsedOrder[b.lastUsed as keyof typeof lastUsedOrder]
        : 2

    return aOrder - bOrder
  })

  return (
    <div className="container mx-auto py-8">
      {/* Search and view options */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <h1 className="text-3xl text-foreground font-bold mb-3">
              Resources
            </h1>

            <CardContent>
              <p className="text-muted-foreground text-[14px] -ml-5">
                Here&apos;s a collection of my go-to resources that I use in my
                projects. <br /> Feel free to explore and grab anything you find
                useful — they&apos;re all handpicked with 💖!
              </p>
            </CardContent>
          </CardHeader>

          <CardContent className="-mt-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="w-full pl-10 text-[14px] pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* View options */}

              <div className="flex items-center space-x-4">
                <button
                  className={`p-2 rounded-md transition ${
                    viewMode === "grid" ? "bg-muted" : "hover:bg-muted"
                  }`}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <Grid className="size-4" />
                </button>
                <button
                  className={`p-2 rounded-md transition ${
                    viewMode === "list" ? "bg-muted" : "hover:bg-muted"
                  }`}
                  onClick={() => setViewMode("list")}
                  title="List view"
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>

            {/* Catagories */}
            <div className=" mt-8 text-[14px] overflow-x-auto">
              {loading ? (
                <div className="flex space-x-2 min-w-max pb-2 animate-pulse">
                  <div className="flex items-center px-5 py-4 border shadow rounded-lg  bg-muted"></div>
                  <div className="flex items-center px-14 py-4 border shadow rounded-lg  bg-muted"></div>
                  <div className="flex items-center px-14 py-4 border shadow rounded-lg  bg-muted"></div>
                </div>
              ) : (
                <div className="flex space-x-2 min-w-max pb-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`flex text-red-600 items-center px-4 py-2 transition ${
                        activeCategory === category.name
                          ? "border-b-2 border-myBlack text-white"
                          : "hover:bg-muted text-gray-700"
                      }`}

                      onClick={() => setActiveCategory(category.name)}
                    >
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Loading state */}
            <div className="mt-4">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
                  <div className="h-full  bg-muted border shadow rounded-lg">
                    <div className="p-4   border-gray-100">
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                    <div className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                  </div>

                  <div className="h-full  bg-muted border shadow rounded-lg">
                    <div className="p-4   border-gray-100">
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                    <div className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                  </div>

                  <div className="h-full  bg-muted border shadow rounded-lg">
                    <div className="p-4   border-gray-100">
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                    <div className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                  </div>

                  <div className="h-full  bg-muted border shadow rounded-lg">
                    <div className="p-4   border-gray-100">
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                    <div className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                  </div>

                  <div className="h-full  bg-muted border shadow rounded-lg">
                    <div className="p-4   border-gray-100">
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                    <div className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                  </div>

                  <div className="h-full  bg-muted border shadow rounded-lg">
                    <div className="p-4   border-gray-100">
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                    <div className="p-4">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Resources Grid View */}
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
                              <div className="flex items-center justify-end">
                                <div className="text-[16px]">
                                  {resource.title}
                                </div>
                              </div>
                              <div className="flex mt-1 items-center">
                                <ExternalLink className="size-3" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className=" text-[14px] line-clamp-2">
                              {resource.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    // Resources List View
                    <Card>
                      <CardContent className="p-6">
                        <ul className="divide-y">
                          {sortedResources.map((resource) => (
                            <li
                              key={resource.id}
                              className="-ml-6 p-3 rounded flex items-center justify-between hover:bg-slate-50 transition cursor-pointer"
                              onClick={() =>
                                window.open(resource.url, "_blank")
                              }
                            >
                              <div className="flex items-center space-x-4">
                                <div>
                                  <h3 className="font-medium text-foreground flex items-center">
                                    {resource.title}
                                  </h3>
                                  <p className="text-[14px] text-gray-500">
                                    {resource.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-6">
                                <ExternalLink className=" text-gray-400 size-4" />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Empty state */}
                  {sortedResources.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <Link className="mx-auto size-12 text-gray-600 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700">
                        No resources found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or category
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResourcesPage
