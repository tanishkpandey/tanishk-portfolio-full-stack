"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/app/firebase/config"
import { doc, setDoc } from "firebase/firestore"
import { BaseDialog } from "./BaseDialog"

interface AboutDialogProps {
  content: string
  onSuccess: () => void
}

export function AboutDialog({ content, onSuccess }: AboutDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(content)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (!db) {
        throw new Error("Firestore is not initialized")
      }

      const aboutRef = doc(db, "About", "about")
      await setDoc(aboutRef, { content: formData })

      toast({
        title: "Success",
        description: "About section updated successfully",
      })
      onSuccess()
    } catch (error) {
      console.error("Error saving about section:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseDialog
      title="Edit About Section"
      triggerText="Edit About"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <div className="space-y-2">
        <label htmlFor="content">Content</label>
        <Textarea
          id="content"
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
          required
          className="min-h-[200px]"
        />
      </div>
    </BaseDialog>
  )
}
