"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/app/firebase/config"
import { doc, setDoc, deleteDoc } from "firebase/firestore"
import { BaseDialog } from "./BaseDialog"

interface ProjectDialogProps {
  project?: {
    id: string
    title: string
    description: string
    stack: string
    liveLink: string
  }
  onSuccess: () => void
}

export function ProjectDialog({ project, onSuccess }: ProjectDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    stack: project?.stack || "",
    liveLink: project?.liveLink || "",
  })

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (!db) {
        throw new Error("Firestore is not initialized")
      }

      const projectRef = project
        ? doc(db, "Projects", project.id)
        : doc(collection(db, "Projects"))

      await setDoc(projectRef, {
        title: formData.title,
        description: formData.description,
        stack: formData.stack,
        liveLink: formData.liveLink,
      })

      toast({
        title: "Success",
        description: project
          ? "Project updated successfully"
          : "Project added successfully",
      })
      onSuccess()
    } catch (error) {
      console.error("Error saving project:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!project) return
    setLoading(true)
    try {
      if (!db) {
        throw new Error("Firestore is not initialized")
      }

      await deleteDoc(doc(db, "Projects", project.id))
      toast({
        title: "Success",
        description: "Project deleted successfully",
      })
      onSuccess()
    } catch (error) {
      console.error("Error deleting project:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseDialog
      title={project ? "Edit Project" : "Add Project"}
      triggerText={project ? "Edit Project" : "Add Project"}
      onSubmit={handleSubmit}
      onDelete={project ? handleDelete : undefined}
      showDelete={!!project}
      loading={loading}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="stack">Tech Stack</label>
          <Input
            id="stack"
            value={formData.stack}
            onChange={(e) =>
              setFormData({ ...formData, stack: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="liveLink">Live Link</label>
          <Input
            id="liveLink"
            value={formData.liveLink}
            onChange={(e) =>
              setFormData({ ...formData, liveLink: e.target.value })
            }
            required
          />
        </div>
      </div>
    </BaseDialog>
  )
}
