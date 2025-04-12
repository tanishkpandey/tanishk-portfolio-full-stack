"use client"

import Link from "next/link"
import { LuExternalLink } from "react-icons/lu"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { db } from "@/app/firebase/config"
import { collection, getDocs } from "firebase/firestore"

interface Project {
  id?: string
  title?: string
  description?: string
  liveLink?: string
}
export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!db) {
          console.error("Firebase not initialized")
          return
        }
        const projectsCollection = collection(db, "Projects")
        const projectSnapshot = await getDocs(projectsCollection)
        const fetchedProjects = projectSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        setProjects(fetchedProjects)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    // Skeleton Loader
    return (
      <>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6 h-full">
                <div className="animate-pulse flex flex-col h-full">
                  {/* Title skeleton */}
                  <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                  {/* Description skeleton */}
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-5/6 mb-auto"></div>
                  {/* Footer skeleton */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="h-4 bg-muted rounded-full mt-2 w-10"></div>
                    <div className="h-4 bg-muted rounded  mt-2 w-16"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <h2 className="text-xl font-bold text-foreground mb-4">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {projects.map((p) => (
          <Card key={p.id}>
            <CardContent className="pt-6 h-full">
              <div className="flex flex-col h-full">
                {/* Title */}
                <div className="font-semibold  text-foreground text-primary">
                  {p.title}
                </div>
                {/* Description */}
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  {p.description}
                </p>
                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <Link
                    href={p.liveLink || "#"}
                    target="_blank"
                    className="flex items-center text-foreground underline gap-2 text-sm text-primary hover:underline"
                  >
                    View Project
                    <LuExternalLink />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
