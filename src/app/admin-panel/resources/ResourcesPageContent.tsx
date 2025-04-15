"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/app/firebase/config"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card" // adjust the path if needed
import { Pencil } from "lucide-react"

interface Resources {
  id?: string
  title?: string
  description?: string
  url?: string
  category?: string
}

export default function ResourcesPageContent() {
  const [resources, setResources] = useState<Resources[]>([])

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Resources"))
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setResources(data)
      } catch (error) {
        console.error("Error fetching resources:", error)
      }
    }

    fetchResources()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Resources</h1>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Resources</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="flex flex-col items-center justify-between p-4">
            {resources.map((resource) => (
              <CardHeader key={resource.id} className="flex justify-between">
                <CardTitle className="text-base font-medium">
                  {resource.title}
                </CardTitle>
                <Pencil className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" />
              </CardHeader>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
