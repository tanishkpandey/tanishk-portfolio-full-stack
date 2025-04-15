"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/app/firebase/config"
import { doc, setDoc, deleteDoc, collection } from "firebase/firestore"
import { BaseDialog } from "./BaseDialog"

interface ExperienceDialogProps {
  experience?: {
    id: string
    role: string
    company: string
    duration: string
    description: string[]
  }
  onSuccess: () => void
}

export function ExperienceDialog({
  experience,
  onSuccess,
}: ExperienceDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    role: experience?.role || "",
    company: experience?.company || "",
    duration: experience?.duration || "",
    description: experience?.description?.join("\n") || "",
  })

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (!db) {
        throw new Error("Firestore is not initialized")
      }

      const experienceRef = experience
        ? doc(db, "Experience", experience.id)
        : doc(collection(db, "Experience"))

      await setDoc(experienceRef, {
        role: formData.role,
        company: formData.company,
        duration: formData.duration,
        description: formData.description.split("\n").filter(Boolean),
      })

      toast({
        title: "Success",
        description: experience
          ? "Experience updated successfully"
          : "Experience added successfully",
      })
      onSuccess()
    } catch (error) {
      console.error("Error saving experience:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!experience) return
    setLoading(true)
    try {
      if (!db) {
        throw new Error("Firestore is not initialized")
      }

      await deleteDoc(doc(db, "Experience", experience.id))
      toast({
        title: "Success",
        description: "Experience deleted successfully",
      })
      onSuccess()
    } catch (error) {
      console.error("Error deleting experience:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseDialog
      title={experience ? "Edit Experience" : "Add Experience"}
      triggerText={experience ? "Edit Experience" : "Add Experience"}
      onSubmit={handleSubmit}
      onDelete={experience ? handleDelete : undefined}
      showDelete={!!experience}
      loading={loading}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="role">Role</label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="company">Company</label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="duration">Duration</label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description">Description (one point per line)</label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            className="min-h-[100px]"
          />
        </div>
      </div>
    </BaseDialog>
  )
}
