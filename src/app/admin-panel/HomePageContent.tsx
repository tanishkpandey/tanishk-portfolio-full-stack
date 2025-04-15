"use client"

import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/app/firebase/config"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loading } from "@/components/ui/loading"
import { ProjectDialog } from "@/components/admin/ProjectDialog"
import { ProfileDialog } from "@/components/admin/ProfileDialog"
import { AboutDialog } from "@/components/admin/AboutDialog"
import { SkillsDialog } from "@/components/admin/SkillsDialog"
import { ExperienceDialog } from "@/components/admin/ExperienceDialog"

interface Profile {
  name?: string
  role?: string
  description?: string
  github?: string
  linkedin?: string
  email?: string
  resume?: string
  userImage?: string
}

interface Project {
  id?: string
  title?: string
  description?: string
  stack?: string
  liveLink?: string
}

interface Experience {
  id?: string
  role?: string
  company?: string
  duration?: string
  description?: string[]
}

export default function HomePageContent() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<Profile>({})
  const [about, setAbout] = useState<string>("")
  const [experience, setExperience] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [skills, setSkills] = useState<string[]>([])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      if (!db) {
        console.error("Firestore is not initialized.")
        return
      }

      // Fetch Profile
      const profileSnapshot = await getDocs(collection(db, "Profile"))
      const profileData = profileSnapshot.docs[0]?.data() || {}
      setProfile(profileData)

      // Fetch About
      const aboutSnapshot = await getDocs(collection(db, "About"))
      const aboutData = aboutSnapshot.docs[0]?.data()?.content || ""
      setAbout(aboutData)

      // Fetch Projects
      const projectsSnapshot = await getDocs(collection(db, "Projects"))
      const projectsData = projectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProjects(projectsData)

      // Fetch Skills
      const skillsSnapshot = await getDocs(collection(db, "Skills"))
      const skillsData = skillsSnapshot.docs[0]?.data()?.Skills || []
      setSkills(skillsData)

      // Fetch Experience
      const experienceSnapshot = await getDocs(collection(db, "Experience"))
      const experienceData = experienceSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setExperience(experienceData)
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch data. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return <Loading text="Loading dashboard..." />
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">Profile</h2>
          <ProfileDialog profile={profile} onSuccess={fetchData} />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.role}</p>
            </div>
            <p className="text-sm">{profile.description}</p>
            <div className="flex gap-4">
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                GitHub
              </a>
              <a
                href={`https://linkedin.com/in/${profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">About</h2>
          <AboutDialog content={about} onSuccess={fetchData} />
        </CardHeader>
        <CardContent>
          <p className="text-sm">{about}</p>
        </CardContent>
      </Card>

      {/* Projects Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">Projects</h2>
          <ProjectDialog onSuccess={fetchData} />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-sm text-muted-foreground">
                        {project.stack}
                      </span>
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                  <ProjectDialog project={project} onSuccess={fetchData} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">Skills</h2>
          <SkillsDialog skills={skills} onSuccess={fetchData} />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-muted rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-bold">Experience</h2>
          <ExperienceDialog onSuccess={fetchData} />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exp.company} • {exp.duration}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {exp.description?.map((item, index) => (
                        <li
                          key={index}
                          className="text-sm list-disc list-inside"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ExperienceDialog experience={exp} onSuccess={fetchData} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
