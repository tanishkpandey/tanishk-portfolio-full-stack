"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/app/firebase/config"
import { doc, setDoc } from "firebase/firestore"
import { BaseDialog } from "./BaseDialog"

interface ProfileDialogProps {
  profile: {
    name?: string
    role?: string
    description?: string
    github?: string
    linkedin?: string
    email?: string
    resume?: string
    userImage?: string
  }
  onSuccess: () => void
}

export function ProfileDialog({ profile, onSuccess }: ProfileDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    role: profile?.role || "",
    description: profile?.description || "",
    github: profile?.github || "",
    linkedin: profile?.linkedin || "",
    email: profile?.email || "",
    resume: profile?.resume || "",
    userImage: profile?.userImage || "",
  })

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (!db) {
        throw new Error("Firestore is not initialized")
      }

      const profileRef = doc(db, "Profile", "profile")
      await setDoc(profileRef, formData)

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
      onSuccess()
    } catch (error) {
      console.error("Error saving profile:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseDialog
      title="Edit Profile"
      triggerText="Edit Profile"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
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
          <label htmlFor="github">GitHub Username</label>
          <Input
            id="github"
            value={formData.github}
            onChange={(e) =>
              setFormData({ ...formData, github: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="linkedin">LinkedIn Username</label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) =>
              setFormData({ ...formData, linkedin: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="resume">Resume Link</label>
          <Input
            id="resume"
            value={formData.resume}
            onChange={(e) =>
              setFormData({ ...formData, resume: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="userImage">Profile Image URL</label>
          <Input
            id="userImage"
            value={formData.userImage}
            onChange={(e) =>
              setFormData({ ...formData, userImage: e.target.value })
            }
            required
          />
        </div>
      </div>
    </BaseDialog>
  )
}
