"use client"
import React, { useState } from "react"
import { Search, Filter, Laptop, Server, Database, Code } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


const CodeSnippetsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedSnippet, setSelectedSnippet] = useState<any>(null)

  const handleCopy = (e: React.MouseEvent, snippetId: number, text: string) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopiedId(snippetId)
    setTimeout(() => setCopiedId(null), 2000) // Reset after 2 seconds
  }

  const openPreview = (e: React.MouseEvent, snippet: unknown) => {
    e.stopPropagation()
    setSelectedSnippet(snippet)
    setPreviewOpen(true)
  }
  // Dummy code snippets data
  const codeSnippets = [
    {
      id: 1,
      title: "React useEffect Cleanup",
      description:
        "A pattern for properly cleaning up side effects in React's useEffect hook",
      preview:
        "useEffect(() => { /* ... */ return () => { /* cleanup */ }; }, [dependency]);",
      language: "jsx",
      category: "Frontend",
      tags: ["React", "Hooks", "useEffect"],
      author: "Jane Smith",
      date: "April 5, 2025",
      views: 321,
      saves: 45,
    },
    {
      id: 2,
      title: "Express Error Middleware",
      description:
        "A middleware for handling errors in Express.js applications",
      preview:
        "app.use((err, req, res, next) => { /* error handling logic */ });",
      language: "javascript",
      category: "Backend",
      tags: ["Express", "Error Handling", "Middleware"],
      author: "Mike Johnson",
      date: "April 2, 2025",
      views: 256,
      saves: 32,
    },
    {
      id: 3,
      title: "PostgreSQL JSON Query",
      description:
        "Query for extracting and filtering data from JSON fields in PostgreSQL",
      preview:
        "SELECT id, data->>'name' as name FROM users WHERE data->>'role' = 'admin';",
      language: "sql",
      category: "Database",
      tags: ["PostgreSQL", "JSON", "SQL"],
      author: "Alex Chen",
      date: "March 28, 2025",
      views: 189,
      saves: 27,
    },
    {
      id: 4,
      title: "Tailwind CSS Responsive Grid",
      description: "A responsive grid layout using Tailwind CSS utilities",
      preview:
        '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">...</div>',
      language: "html",
      category: "Frontend",
      tags: ["Tailwind", "CSS", "Responsive"],
      author: "Sarah Williams",
      date: "March 25, 2025",
      views: 235,
      saves: 41,
    },
    {
      id: 5,
      title: "NextJS API Route",
      description:
        "A simple API route handler in Next.js with request validation",
      preview:
        "export default async function handler(req, res) { /* API logic */ }",
      language: "javascript",
      category: "Backend",
      tags: ["NextJS", "API", "Validation"],
      author: "Jane Smith",
      date: "March 22, 2025",
      views: 178,
      saves: 23,
    },
    {
      id: 6,
      title: "React Custom Hook",
      description: "A custom hook for handling form inputs with validation",
      preview:
        "function useFormInput(initialValue = '', validator) { /* hook logic */ }",
      language: "jsx",
      category: "Frontend",
      tags: ["React", "Hooks", "Forms"],
      author: "Mike Johnson",
      date: "March 20, 2025",
      views: 201,
      saves: 36,
    },
    {
      id: 7,
      title: "CSS Grid Layout Template",
      description: "A template for creating complex layouts with CSS Grid",
      preview:
        ".grid-container { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }",
      language: "css",
      category: "Frontend",
      tags: ["CSS", "Grid", "Layout"],
      author: "Sarah Williams",
      date: "March 18, 2025",
      views: 167,
      saves: 29,
    },
    {
      id: 8,
      title: "MongoDB Aggregation Pipeline",
      description: "Example of a complex aggregation pipeline in MongoDB",
      preview:
        "db.collection.aggregate([ { $match: { /* filter */ } }, { $group: { /* grouping */ } } ])",
      language: "javascript",
      category: "Database",
      tags: ["MongoDB", "NoSQL", "Aggregation"],
      author: "Alex Chen",
      date: "March 15, 2025",
      views: 143,
      saves: 22,
    },
  ]

  const categories = ["All", "Frontend", "Backend", "Database", "DevOps"]
  const languages = [
    "All",
    "jsx",
    "javascript",
    "typescript",
    "html",
    "css",
    "sql",
    "python",
  ]

  // Filter snippets based on search and filters
  const filteredSnippets = codeSnippets.filter((snippet) => {
    const matchesSearch =
      searchTerm === "" ||
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )

    const matchesCategory =
      selectedCategory === "All" || snippet.category === selectedCategory
    const matchesLanguage =
      selectedLanguage === "All" || snippet.language === selectedLanguage

    return matchesSearch && matchesCategory && matchesLanguage
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Laptop className="size-4" />
      case "Backend":
        return <Server className="size-4" />
      case "Database":
        return <Database className="size-4" />
      case "DevOps":
        return <Code className="size-4" />
      default:
        return <Code className="size-4" />
    }
  }

  return (
    <div className="container max-w-screen-lg mx-auto py-8">
      <div className="mb-8">
        <Card>
          <CardHeader>
            <h1 className="text-3xl text-foreground font-bold mb-3">
              Code Snippets
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
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search bar */}
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
                    <Input
                      type="text"
                      placeholder="Search snippets by title, description, or tags..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className={`p-2 rounded-md border transition ${
                      showFilters ? "bg-muted" : "hover:bg-muted/60"
                    }`}
                    onClick={() => setShowFilters(!showFilters)}
                    title="Filters"
                  >
                    <Filter className="size-4" />
                  </button>
                </div>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="flex flex-wrap gap-4">
                  {/* Category filter */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-foreground">Category:</span>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className={`px-3 py-1 text- cursor-pointer text-xs rounded-full border transition ${
                            selectedCategory === category &&
                            "bg-primary hover:none text-primary-foreground"
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Language filter */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-foreground">Language:</span>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((language) => (
                        <button
                          key={language}
                          className={`px-3 py-1 text-xs border rounded-full transition ${
                            selectedLanguage === language &&
                            "bg-primary hover:none text-primary-foreground"
                          }`}
                          onClick={() => setSelectedLanguage(language)}
                        >
                          {language}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Snippets grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSnippets.map((snippet) => (
          <Card
            key={snippet.id}
            className="overflow-hidden h-full flex flex-col hover:shadow-lg transition cursor-pointer"
            onClick={() => console.log(`Navigate to snippet ${snippet.id}`)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant="secondary"
                  className="flex p-1 items-center space-x-2"
                >
                  {getCategoryIcon(snippet.category)}
                  <span>{snippet.category}</span>
                </Badge>
              </div>
              <CardTitle className="text-lg">{snippet.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {snippet.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow py-4">
              <div className="bg-slate-50 rounded-lg p-3 overflow-hidden relative">
                <div className="absolute right-2 top-2 flex space-x-1">
                  {/* <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild> */}
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 bg-white"
                          onClick={(e) =>
                            handleCopy(e, snippet.id, snippet.preview)
                          }
                        >
                          <Copy className="size-3" />
                        </Button>
                      {/* </TooltipTrigger>
                      <TooltipContent>
                        {copiedId === snippet.id
                          ? "Copied!"
                          : "Copy to clipboard"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider> */}

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 bg-white"
                    onClick={(e) => openPreview(e, snippet)}
                  >
                    <Maximize2 className="size-3" />
                  </Button>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs text-slate-700 line-clamp-3">
                  {snippet.preview}
                </pre>
              </div>
            </CardContent>

            <CardFooter className="border-t pt-4 flex flex-col items-start space-y-3">
              <Badge
                variant="secondary"
                className="text-xs font-mono px-2 py-1"
              >
                {snippet.language}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedSnippet?.title}</DialogTitle>
          </DialogHeader>
          <div className="bg-slate-50 rounded-lg p-4 mt-4 relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => {
                if (selectedSnippet) {
                  navigator.clipboard.writeText(selectedSnippet.preview)
                  // Optional: add a visual indicator that it was copied
                }
              }}
            >
              <Copy className="size-4" />
            </Button>
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm">
              {selectedSnippet?.preview}
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      {/* Empty state */}
      {filteredSnippets.length === 0 && (
        <div className="text-center py-12">
          <Code className="mx-auto size-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">
            No snippets found
          </h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

export default CodeSnippetsPage