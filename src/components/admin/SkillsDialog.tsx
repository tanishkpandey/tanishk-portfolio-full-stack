"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { db } from "@/app/firebase/config"
import { doc, setDoc } from "firebase/firestore"
import { BaseDialog } from "./BaseDialog"
import { RiDeleteBin6Line } from "react-icons/ri"

interface SkillsDialogProps {
  skills: string[]
  onSuccess: () => void
}

export function SkillsDialog({ skills, onSuccess }: SkillsDialogProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    newSkill: "",
    skills: [...skills],
  })

  const handleAddSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkill.trim()],
        newSkill: "",
      })
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (!db) {
        throw new Error("Firestore is not initialized")
      }

      const skillsRef = doc(db, "Skills", "skills")
      await setDoc(skillsRef, { Skills: formData.skills })

      toast({
        title: "Success",
        description: "Skills updated successfully",
      })
      onSuccess()
    } catch (error) {
      console.error("Error saving skills:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseDialog
      title="Manage Skills"
      triggerText="Manage Skills"
      onSubmit={handleSubmit}
      loading={loading}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="newSkill">Add New Skill</label>
          <div className="flex gap-2">
            <Input
              id="newSkill"
              value={formData.newSkill}
              onChange={(e) =>
                setFormData({ ...formData, newSkill: e.target.value })
              }
              placeholder="Enter a new skill"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
            >
              Add
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label>Current Skills</label>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-muted rounded-full"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <RiDeleteBin6Line size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseDialog>
  )
}
