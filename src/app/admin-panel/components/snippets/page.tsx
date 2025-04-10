"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BiSolidEdit, BiPlus } from "react-icons/bi"
import { RiDeleteBin3Line } from "react-icons/ri"

interface Snippet {
  id?: string
  title?: string
  code?: string
  language?: string
  description?: string
  tags?: string[]
}

export default function AdminSnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [isAddingSnippet, setIsAddingSnippet] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentSnippet, setCurrentSnippet] = useState<Snippet>({
    title: "",
    code: "",
    language: "",
    description: "",
    tags: [],
  })
  const [tagInput, setTagInput] = useState("")

  // Programming languages for the dropdown
  const languages = [
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "PHP",
    "C#",
    "Other",
  ]

  // Fetch snippets - replace with your actual data fetching logic
  useEffect(() => {
    // Mock data
    setSnippets([
      {
        id: "1",
        title: "React useState Hook",
        code: "const [state, setState] = useState(initialState);",
        language: "JavaScript",
        description: "Basic React useState hook example",
        tags: ["React", "Hooks"],
      },
      {
        id: "2",
        title: "Async/Await Function",
        code: "async function fetchData() {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}",
        language: "JavaScript",
        description: "Async/await pattern for API calls",
        tags: ["JavaScript", "Async"],
      },
    ])
  }, [])

  const handleAddSnippet = () => {
    // Add implementation
    console.log("Adding snippet:", currentSnippet)
    // Add to your database

    // Update local state
    setSnippets([...snippets, { ...currentSnippet, id: Date.now().toString() }])
    setCurrentSnippet({
      title: "",
      code: "",
      language: "",
      description: "",
      tags: [],
    })
    setIsAddingSnippet(false)
  }

  const handleUpdateSnippet = () => {
    // Update implementation
    console.log("Updating snippet:", currentSnippet)
    // Update in your database

    // Update local state
    setSnippets(
      snippets.map((snippet) =>
        snippet.id === currentSnippet.id ? currentSnippet : snippet
      )
    )
    setCurrentSnippet({
      title: "",
      code: "",
      language: "",
      description: "",
      tags: [],
    })
    setIsAddingSnippet(false)
    setIsEditing(false)
  }

  const handleDeleteSnippet = (id: string) => {
    // Delete implementation
    console.log("Deleting snippet:", id)
    // Delete from your database

    // Update local state
    setSnippets(snippets.filter((snippet) => snippet.id !== id))
  }

  const editSnippet = (snippet: Snippet) => {
    setCurrentSnippet(snippet)
    setIsEditing(true)
    setIsAddingSnippet(true)
  }

  const addTag = () => {
    if (tagInput.trim() && !currentSnippet.tags?.includes(tagInput.trim())) {
      setCurrentSnippet({
        ...currentSnippet,
        tags: [...(currentSnippet.tags || []), tagInput.trim()],
      })
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCurrentSnippet({
      ...currentSnippet,
      tags: currentSnippet.tags?.filter((tag) => tag !== tagToRemove),
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Code Snippets Management</h1>
        <button
          onClick={() => {
            setIsAddingSnippet(!isAddingSnippet)
            if (!isAddingSnippet) {
              setCurrentSnippet({
                title: "",
                code: "",
                language: "",
                description: "",
                tags: [],
              })
              setIsEditing(false)
            }
          }}
          className="flex items-center gap-2 bg-myBlack hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          {isAddingSnippet ? (
            "Cancel"
          ) : (
            <>
              <BiPlus />
              <span>Add New Snippet</span>
            </>
          )}
        </button>
      </div>

      {isAddingSnippet && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Snippet" : "Add New Snippet"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={currentSnippet.title}
                  onChange={(e) =>
                    setCurrentSnippet({
                      ...currentSnippet,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={currentSnippet.description}
                  onChange={(e) =>
                    setCurrentSnippet({
                      ...currentSnippet,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Language
                </label>
                <select
                  value={currentSnippet.language}
                  onChange={(e) =>
                    setCurrentSnippet({
                      ...currentSnippet,
                      language: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-100 border rounded-lg"
                >
                  <option value="">Select a language</option>
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <textarea
                  value={currentSnippet.code}
                  onChange={(e) =>
                    setCurrentSnippet({
                      ...currentSnippet,
                      code: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-gray-100 border rounded-lg font-mono"
                  rows={8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {currentSnippet.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    className="flex-1 p-3 bg-gray-100 border rounded-lg"
                    placeholder="Add a tag"
                  />
                  <button
                    onClick={addTag}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <button
                onClick={isEditing ? handleUpdateSnippet : handleAddSnippet}
                className="bg-myBlack hover:bg-gray-700 text-white p-3 rounded-lg w-full"
              >
                {isEditing ? "Update Snippet" : "Add Snippet"}
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
