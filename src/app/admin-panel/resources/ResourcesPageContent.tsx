"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/app/firebase/config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { BiSolidEdit } from "react-icons/bi"
import { RiDeleteBin3Line } from "react-icons/ri"
import { RiAddCircleLine } from "react-icons/ri"
import { MdOutlineCancel } from "react-icons/md"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loading } from "@/components/ui/loading"

interface Resource {
  id?: string
  title: string
  description: string
  url: string
  category: string
}

export default function ResourcesPageContent() {
  const { toast } = useToast()
  const [resources, setResources] = useState<Resource[]>([])
  const [newResource, setNewResource] = useState<Resource>({
    title: "",
    description: "",
    url: "",
    category: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    try {
      setIsLoading(true)
      const resourcesSnapshot = await getDocs(collection(db, "Resources"))
      const resourcesData = resourcesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Resource[]
      setResources(resourcesData)
    } catch (error) {
      console.error("Error fetching resources:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch resources. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveResource = async () => {
    try {
      if (!db) {
        throw new Error("Firestore is not initialized")
      }

      if (editingResource?.id) {
        // Update existing resource
        await setDoc(doc(db, "Resources", editingResource.id), {
          title: newResource.title,
          description: newResource.description,
          url: newResource.url,
          category: newResource.category,
        })
        toast({
          title: "Success",
          description: "Resource updated successfully",
        })
      } else {
        // Add new resource
        const docRef = doc(collection(db, "Resources"))
        await setDoc(docRef, {
          title: newResource.title,
          description: newResource.description,
          url: newResource.url,
          category: newResource.category,
        })
        toast({
          title: "Success",
          description: "Resource added successfully",
        })
      }

      setNewResource({
        title: "",
        description: "",
        url: "",
        category: "",
      })
      setEditingResource(null)
      setIsEditing(false)
      fetchResources()
    } catch (error) {
      console.error("Error saving resource:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save resource. Please try again.",
      })
    }
  }

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource)
    setNewResource(resource)
    setIsEditing(true)
  }

  const handleDeleteResource = async (id: string) => {
    try {
      if (!db) {
        throw new Error("Firestore is not initialized")
      }

      await deleteDoc(doc(db, "Resources", id))
      toast({
        title: "Success",
        description: "Resource deleted successfully",
      })
      fetchResources()
    } catch (error) {
      console.error("Error deleting resource:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete resource. Please try again.",
      })
    }
  }

  const handleCancel = () => {
    setNewResource({
      title: "",
      description: "",
      url: "",
      category: "",
    })
    setEditingResource(null)
    setIsEditing(false)
  }

  if (isLoading) {
    return <Loading text="Loading Resources..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Resources</h1>
        <Button
          onClick={() => {
            setEditingResource(null)
            setNewResource({
              title: "",
              description: "",
              url: "",
              category: "",
            })
            setIsEditing(true)
          }}
          className="flex items-center gap-2"
        >
          <RiAddCircleLine className="h-5 w-5" />
          Add Resource
        </Button>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingResource ? "Edit Resource" : "Add New Resource"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                value={newResource.title}
                onChange={(e) =>
                  setNewResource({ ...newResource, title: e.target.value })
                }
                placeholder="Enter resource title"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                value={newResource.description}
                onChange={(e) =>
                  setNewResource({
                    ...newResource,
                    description: e.target.value,
                  })
                }
                placeholder="Enter resource description"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="url">Link</label>
              <Input
                id="url"
                value={newResource.url}
                onChange={(e) =>
                  setNewResource({ ...newResource, url: e.target.value })
                }
                placeholder="Enter resource url"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <Input
                id="category"
                value={newResource.category}
                onChange={(e) =>
                  setNewResource({ ...newResource, category: e.target.value })
                }
                placeholder="Enter resource category"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <MdOutlineCancel className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveResource}>
                {editingResource ? "Update" : "Add"} Resource
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{resource.title}</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditResource(resource)}
                >
                  <BiSolidEdit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <RiDeleteBin3Line className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the resource.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          resource.id && handleDeleteResource(resource.id)
                        }
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {resource.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Category:</span>
                <span className="text-sm text-muted-foreground">
                  {resource.category}
                </span>
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View Resource
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
