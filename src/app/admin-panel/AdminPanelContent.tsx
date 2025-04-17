"use client"

import { useState, useEffect, SetStateAction } from "react"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore"
import { db } from "@/app/firebase/config"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BiSolidEdit } from "react-icons/bi"
import { RiAddCircleLine, RiDeleteBin3Line } from "react-icons/ri"
import { MdOutlineCancel } from "react-icons/md"
import { GoListUnordered } from "react-icons/go"
import { useToast } from "@/components/ui/use-toast"
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

const AdminPanelContent = () => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<Profile>({})
  const [about, setAbout] = useState<string>("")
  const [experience, setExperience] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState<Project>({
    title: "",
    description: "",
    stack: "",
    liveLink: "",
  })
  const [newExperience, setNewExperience] = useState<Experience>({
    role: "",
    company: "",
    duration: "",
    description: [""],
  })
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState<string>("")
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(
    null
  )
  const [addProjectVisible, setAddProjectVisible] = useState<boolean>(false)
  const [addSkillsVisible, setAddSkillsVisible] = useState<boolean>(false)
  const [addExpVisible, setAddExpVisible] = useState<boolean>(false)

  // Fetch data from all collections on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // Fetch Profile
        if (!db) {
          console.error("Firestore is not initialized.")
          return
        }
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

    fetchData()
  }, [toast])

  // Profile Save Handler
  const handleSaveProfile = async () => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return
      }
      await setDoc(doc(db, "Profile", "PArB5TcvuHEVztorw4LB"), profile)
      toast({
        variant: "success",
        title: "Success",
        description: "Profile updated successfully!",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      })
    }
  }

  // About Save Handler
  const handleSaveAbout = async () => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return
      }
      await setDoc(doc(db, "About", "zj68ikIqsTCVdIBhIHuG"), {
        content: about,
      })
      toast({
        variant: "success",
        title: "Success",
        description: "About updated successfully!",
      })
    } catch (error) {
      console.error("Error updating About:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update About. Please try again.",
      })
    }
  }

  // Add or Update Project
  const handleSaveProject = async () => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return
      }
      if (newProject.id) {
        // Update Project
        const docRef = doc(db, "Projects", newProject.id)
        await updateDoc(docRef, newProject)
        setProjects((prev) =>
          prev.map((proj) => (proj.id === newProject.id ? newProject : proj))
        )
      } else {
        // Add New Project
        const docRef = await addDoc(collection(db, "Projects"), newProject)
        setProjects([...projects, { id: docRef.id, ...newProject }])
      }
      setNewProject({ title: "", description: "", stack: "", liveLink: "" })
      toast({
        variant: "success",
        title: "Success",
        description: "Project saved successfully!",
      })
    } catch (error) {
      console.error("Error saving project:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save project. Please try again.",
      })
    }
  }

  const handleEditProject = (project: SetStateAction<Project>) => {
    setAddProjectVisible(true)
    setNewProject({ ...project })
  }

  const handleDeleteProject = async (id: string | undefined) => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return
      }

      if (!id) {
        throw new Error("Document ID is required.")
      }

      await deleteDoc(doc(db, "Projects", id))
      setProjects(projects.filter((proj) => proj.id !== id))
      toast({
        variant: "success",
        title: "Success",
        description: "Project deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting project:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete project. Please try again.",
      })
    }
  }

  const handleSaveSkill = async () => {
    if (newSkill.trim() === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Skill cannot be empty.",
      })
      return
    }

    let updatedSkills

    if (editingSkillIndex !== null) {
      // Update an existing skill
      updatedSkills = [...skills]
      updatedSkills[editingSkillIndex] = newSkill
    } else {
      // Add a new skill
      updatedSkills = [...skills, newSkill]
    }

    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return
      }
      // Save updated skills to Firebase
      await setDoc(doc(db, "Skills", "W3xwilcBbb6XvU5al2it"), {
        Skills: updatedSkills,
      })
      setSkills(updatedSkills) // Update local state
      setNewSkill("") // Clear input field
      setEditingSkillIndex(null) // Reset editing index
      toast({
        variant: "success",
        title: "Success",
        description: "Skills updated successfully!",
      })
    } catch (error) {
      console.error("Error saving skills:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update skills. Please try again.",
      })
    }
  }

  const handleCancelEdit = () => {
    setNewSkill("") // Clear the input field
    setEditingSkillIndex(null) // Reset editing state
  }

  const handleEditSkill = (index: number) => {
    setNewSkill(skills[index]) // Set the input to the selected skill
    setEditingSkillIndex(index) // Track the index of the skill being edited
  }

  const handleDeleteSkill = async (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index)

    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return
      }
      // Save updated skills to Firebase
      await setDoc(doc(db, "Skills", "W3xwilcBbb6XvU5al2it"), {
        Skills: updatedSkills,
      })
      setSkills(updatedSkills) // Update local state
      toast({
        variant: "success",
        title: "Success",
        description: "Skill deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting skill:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete skill. Please try again.",
      })
    }
  }

  // Add or Update Experience
  const handleSaveExperience = async () => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return
      }
      if (newExperience.id) {
        // Update Experience
        const docRef = doc(db, "Experience", newExperience.id)
        await updateDoc(docRef, { ...newExperience })
        setExperience((prev) =>
          prev.map((exp) => (exp.id === newExperience.id ? newExperience : exp))
        )
      } else {
        if (!db) {
          console.error("Error in firebase initialization")
          return
        }
        // Add New Experience
        const docRef = await addDoc(collection(db, "Experience"), {
          ...newExperience,
        })
        setExperience([...experience, { id: docRef.id, ...newExperience }])
      }
      setNewExperience({
        role: "",
        company: "",
        duration: "",
        description: [""],
      })
      toast({
        variant: "success",
        title: "Success",
        description: "Experience saved successfully!",
      })
    } catch (error) {
      console.error("Error saving experience:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save experience. Please try again.",
      })
    }
  }

  const handleEditExperience = (exp: SetStateAction<Experience>) =>
    setNewExperience(exp)

  const handleDeleteExperience = async (id: string | undefined) => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return
      }
      if (!id) {
        throw new Error("Document ID is required.")
      }
      await deleteDoc(doc(db, "Experience", id))
      setExperience(experience.filter((exp) => exp.id !== id))
      toast({
        variant: "success",
        title: "Success",
        description: "Experience deleted successfully!",
      })
    } catch (error) {
      console.error("Error deleting experience:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete experience. Please try again.",
      })
    }
  }

  if (isLoading) {
    return <Loading text="Loading admin panel..." />
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Profile Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-4">
            Profile
          </h2>
          <CardContent>
            <Input
              type="text"
              placeholder="Name"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="mt-3"
            />
            <Input
              type="text"
              placeholder="Role"
              value={profile.role || ""}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="mt-3"
            />
            <Input
              type="text"
              placeholder="Description"
              value={profile.description || ""}
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
              className="mt-3"
            />
            <Input
              type="text"
              placeholder="Github"
              value={profile.github || ""}
              onChange={(e) =>
                setProfile({ ...profile, github: e.target.value })
              }
              className="mt-3"
            />
            <Input
              type="text"
              placeholder="LinkedIn"
              value={profile.linkedin || ""}
              onChange={(e) =>
                setProfile({ ...profile, linkedin: e.target.value })
              }
              className="mt-3"
            />
            <Input
              type="email"
              placeholder="Contact Email"
              value={profile.email || ""}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="mt-3"
            />
            <Input
              type="text"
              placeholder="Resume Link"
              value={profile.resume || ""}
              onChange={(e) =>
                setProfile({ ...profile, resume: e.target.value })
              }
              className="mt-3"
            />
            <Input
              type="text"
              placeholder="Profile Picture Link"
              value={profile.userImage || ""}
              onChange={(e) =>
                setProfile({ ...profile, userImage: e.target.value })
              }
              className="mt-3"
            />
            <button
              onClick={handleSaveProfile}
              className="mt-5 bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-lg w-full shadow-md focus:ring-2 focus:ring-ring focus:outline-none"
            >
              Save Profile
            </button>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-card-foreground mb-4">
            About
          </h2>
          <CardContent>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="p-3 bg-muted border border-input rounded-lg w-full mt-2 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:outline-none resize-none"
              placeholder="Write something about yourself..."
              rows={5}
            />
            <button
              onClick={handleSaveAbout}
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-lg w-full shadow-md focus:ring-2 focus:ring-ring focus:outline-none"
            >
              Save About
            </button>
          </CardContent>
        </Card>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-card-foreground">
                Projects
              </h2>
              <div onClick={() => setAddProjectVisible((prev) => !prev)}>
                {addProjectVisible === false ? (
                  <RiAddCircleLine className="size-5 text-card-foreground" />
                ) : (
                  <MdOutlineCancel className="size-5 text-card-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="flex justify-between items-center mb-4"
              >
                <p className="text-card-foreground font-medium">{proj.title}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProject(proj)}
                    className="hover:text-muted-foreground text-xl text-card-foreground p-2 rounded-full"
                  >
                    <BiSolidEdit />
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="hover:text-destructive transition text-xl text-card-foreground p-2 rounded-full">
                        <RiDeleteBin3Line />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the project.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteProject(proj.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
            {addProjectVisible && (
              <div className="mt-4">
                <h3 className="text-xl mb-2 font-semibold text-card-foreground">
                  {newProject.id ? "Edit Project" : "Add Project"}
                </h3>
                <Input
                  type="text"
                  placeholder="Title"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  className="mb-2"
                />
                <textarea
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-muted border border-input rounded-lg mb-2 text-foreground placeholder:text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Tech Stack"
                  value={newProject.stack}
                  onChange={(e) =>
                    setNewProject({ ...newProject, stack: e.target.value })
                  }
                  className="mb-2"
                />
                <Input
                  type="text"
                  placeholder="Live Link"
                  value={newProject.liveLink}
                  onChange={(e) =>
                    setNewProject({ ...newProject, liveLink: e.target.value })
                  }
                  className="mb-2"
                />
                <button
                  onClick={handleSaveProject}
                  className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg w-full"
                >
                  {newProject.id ? "Update Project" : "Add Project"}
                </button>
                {newProject.id && (
                  <button
                    onClick={() =>
                      setNewProject({
                        title: "",
                        description: "",
                        stack: "",
                        liveLink: "",
                      })
                    }
                    className="p-3 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg w-full mt-2"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-card-foreground">
                Skills
              </h2>
              <div onClick={() => setAddSkillsVisible((prev) => !prev)}>
                {addSkillsVisible === false ? (
                  <RiAddCircleLine className="size-5 text-card-foreground" />
                ) : (
                  <MdOutlineCancel className="size-5 text-card-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 text-card-foreground"
                >
                  <span>{skill}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditSkill(index)}
                      className="hover:text-muted-foreground transition text-xl text-card-foreground p-2 rounded-full"
                    >
                      <BiSolidEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(index)}
                      className="hover:text-destructive transition text-xl text-card-foreground p-2 rounded-full"
                    >
                      <RiDeleteBin3Line />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {addSkillsVisible && (
              <div className="mt-4">
                <Input
                  type="text"
                  placeholder="Enter a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="mb-2"
                />
                <button
                  onClick={handleSaveSkill}
                  className="p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg w-full"
                >
                  {editingSkillIndex !== null ? "Update Skill" : "Add Skill"}
                </button>
                {editingSkillIndex !== null && (
                  <button
                    onClick={handleCancelEdit}
                    className="p-3 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg w-full mt-2"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-card-foreground">
                Experience
              </h2>
              <div onClick={() => setAddExpVisible((prev) => !prev)}>
                {addExpVisible === false ? (
                  <RiAddCircleLine className="size-5 text-card-foreground" />
                ) : (
                  <MdOutlineCancel className="size-5 text-card-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="flex justify-between items-center mb-4 text-card-foreground"
              >
                <p>
                  {exp.role} at {exp.company}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditExperience(exp)}
                    className="hover:text-muted-foreground transition text-xl text-card-foreground p-2 rounded-full"
                  >
                    <BiSolidEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="hover:text-destructive transition text-xl text-card-foreground p-2 rounded-full"
                  >
                    <RiDeleteBin3Line />
                  </button>
                </div>
              </div>
            ))}

            {addExpVisible && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-card-foreground">
                  {newExperience.id ? "Edit Experience" : "Add Experience"}
                </h3>
                <Input
                  type="text"
                  placeholder="Company"
                  value={newExperience.company}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      company: e.target.value,
                    })
                  }
                  className="mb-2"
                />

                <div>
                  <h4 className="font-semibold mb-1 text-card-foreground">
                    Description
                  </h4>
                  {newExperience?.description?.map((line, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        type="text"
                        value={line}
                        onChange={(e) => {
                          const updatedDescription = [
                            ...(newExperience.description ?? []),
                          ]
                          updatedDescription[index] = e.target.value
                          setNewExperience({
                            ...newExperience,
                            description: updatedDescription,
                          })
                        }}
                        className="w-full"
                      />
                      <button
                        onClick={() => {
                          const updatedDescription =
                            newExperience?.description?.filter(
                              (_, i) => i !== index
                            )
                          setNewExperience({
                            ...newExperience,
                            description: updatedDescription,
                          })
                        }}
                        className="hover:text-destructive ml-2 transition text-xl text-card-foreground p-2 rounded-full"
                      >
                        <RiDeleteBin3Line />
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-center my-2">
                    <button
                      onClick={() =>
                        setNewExperience({
                          ...newExperience,
                          description: [
                            ...(newExperience.description ?? []),
                            "",
                          ],
                        })
                      }
                      className="p-3 flex justify-center gap-2 items-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg w-full"
                    >
                      <GoListUnordered className="size-5" />
                      Add Point
                    </button>
                  </div>
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Duration"
                    value={newExperience.duration}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        duration: e.target.value,
                      })
                    }
                    className="mb-2"
                  />
                  <Input
                    type="text"
                    placeholder="Role"
                    value={newExperience.role}
                    onChange={(e) =>
                      setNewExperience({
                        ...newExperience,
                        role: e.target.value,
                      })
                    }
                    className="mb-2"
                  />
                  <button
                    onClick={handleSaveExperience}
                    className="p-3 flex justify-center gap-2 items-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg w-full"
                  >
                    {newExperience.id ? "Update Experience" : "Add Experience"}
                  </button>
                  {newExperience.id && (
                    <button
                      onClick={() =>
                        setNewExperience({
                          company: "",
                          description: [],
                          duration: "",
                          role: "",
                        })
                      }
                      className="p-3 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg w-full mt-2"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminPanelContent
