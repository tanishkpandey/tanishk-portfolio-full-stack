"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/app/firebase/config"
import { doc, setDoc, deleteDoc, collection } from "firebase/firestore"
import { RiDeleteBin6Line } from "react-icons/ri"

interface BaseDialogProps {
  title: string
  triggerText: string
  children: React.ReactNode
  onSubmit: () => Promise<void>
  onDelete?: () => Promise<void>
  showDelete?: boolean
  loading: boolean
}

export function BaseDialog({
  title,
  triggerText,
  children,
  onSubmit,
  onDelete,
  showDelete = false,
  loading,
}: BaseDialogProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit()
      setOpen(false)
    } catch (error) {
      console.error("Error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
      })
    }
  }

  const handleDelete = async () => {
    if (!onDelete) return
    try {
      await onDelete()
      setOpen(false)
    } catch (error) {
      console.error("Error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete. Please try again.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {children}
          <div className="flex justify-between">
            {showDelete && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <RiDeleteBin6Line />
                Delete
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 