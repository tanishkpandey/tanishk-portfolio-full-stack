"use client";

import { useState, useEffect, SetStateAction } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";
import AdminNavbar from "@/components/AdminNavbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BiSolidEdit } from "react-icons/bi";
import { RiAddCircleLine } from "react-icons/ri";
import { RiDeleteBin3Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { GoListUnordered } from "react-icons/go";


interface Profile {
  name?: string;
  role?: string;
  description?: string;
  github?: string;
  linkedin?: string;
  email?: string;
  resume?: string;
  userImage?: string;
}

interface Project {
  id?: string;
  title?: string;
  description?: string;
  stack?: string;
  liveLink?: string;
  [key: string]: unknown;
}

interface Experience {
  id?: string;
  role?: string;
  company?: string;
  duration?: string;
  description?: string[];
}


const AdminPanelContent = () => {
  const [profile, setProfile] = useState<Profile>({});
  const [about, setAbout] = useState<string>("");
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    title: "",
    description: "",
    stack: "",
    liveLink: "",
  });
  const [newExperience, setNewExperience] = useState<Experience>({
    role: "",
    company: "",
    duration: "",
    description: [""],
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>("");
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null);
  const [addProjectVisible, setAddProjectVisible] = useState<boolean>(false);
  const [addSkillsVisible, setAddSkillsVisible] = useState<boolean>(false);
  const [addExpVisible, setAddExpVisible] = useState<boolean>(false);

  // Fetch data from all collections on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Profile
        if (!db) {
          console.error("Firestore is not initialized.");
          return;
        }
        const profileSnapshot = await getDocs(collection(db, "Profile"));
        const profileData = profileSnapshot.docs[0]?.data() || {};
        setProfile(profileData);

        // Fetch About
        const aboutSnapshot = await getDocs(collection(db, "About"));
        const aboutData = aboutSnapshot.docs[0]?.data()?.content || "";
        setAbout(aboutData);

        // Fetch Projects
        const projectsSnapshot = await getDocs(collection(db, "Projects"));
        const projectsData = projectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);

        // Fetch Skills
        const skillsSnapshot = await getDocs(collection(db, "Skills"));
        const skillsData = skillsSnapshot.docs[0]?.data()?.Skills || [];
        setSkills(skillsData);

        // Fetch Experience
        const experienceSnapshot = await getDocs(collection(db, "Experience"));
        const experienceData = experienceSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExperience(experienceData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Profile Save Handler
  const handleSaveProfile = async () => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return;
      }
      await setDoc(doc(db, "Profile", "PArB5TcvuHEVztorw4LB"), profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // About Save Handler
  const handleSaveAbout = async () => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return;
      }
      await setDoc(doc(db, "About", "zj68ikIqsTCVdIBhIHuG"), {
        content: about,
      });
      alert("About updated successfully!");
    } catch (error) {
      console.error("Error updating About:", error);
    }
  };

  // Add or Update Project
  const handleSaveProject = async () => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return;
      }
      if (newProject.id) {
        // Update Project
        const docRef = doc(db, "Projects", newProject.id);
        await updateDoc(docRef, newProject);
        setProjects((prev) =>
          prev.map((proj) => (proj.id === newProject.id ? newProject : proj))
        );
      } else {
        // Add New Project
        const docRef = await addDoc(collection(db, "Projects"), newProject);
        setProjects([...projects, { id: docRef.id, ...newProject }]);
      }
      setNewProject({ title: "", description: "", stack: "", liveLink: "" });
      alert("Project saved successfully!");
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEditProject = (project: SetStateAction<Project>) => {
    setAddProjectVisible(true)
    setNewProject({ ...project });
  };

  const handleDeleteProject = async (id: string | undefined) => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return;
      }

      if (!id) {
        throw new Error("Document ID is required.");
      }

      await deleteDoc(doc(db, "Projects", id));
      setProjects(projects.filter((proj) => proj.id !== id));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleSaveSkill = async () => {
    if (newSkill.trim() === "") {
      alert("Skill cannot be empty.");
      return;
    }

    let updatedSkills;

    if (editingSkillIndex !== null) {
      // Update an existing skill
      updatedSkills = [...skills];
      updatedSkills[editingSkillIndex] = newSkill;
    } else {
      // Add a new skill
      updatedSkills = [...skills, newSkill];
    }

    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return;
      }
      // Save updated skills to Firebase
      await setDoc(doc(db, "Skills", "W3xwilcBbb6XvU5al2it"), {
        Skills: updatedSkills,
      });
      setSkills(updatedSkills); // Update local state
      setNewSkill(""); // Clear input field
      setEditingSkillIndex(null); // Reset editing index
      alert("Skills updated successfully!");
    } catch (error) {
      console.error("Error saving skills:", error);
    }
  };

  const handleCancelEdit = () => {
    setNewSkill(""); // Clear the input field
    setEditingSkillIndex(null); // Reset editing state
  };

  const handleEditSkill = (index: number) => {
    setNewSkill(skills[index]); // Set the input to the selected skill
    setEditingSkillIndex(index); // Track the index of the skill being edited
  };

  const handleDeleteSkill = async (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);

    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return;
      }
      // Save updated skills to Firebase
      await setDoc(doc(db, "Skills", "W3xwilcBbb6XvU5al2it"), {
        Skills: updatedSkills,
      });
      setSkills(updatedSkills); // Update local state
      alert("Skill deleted successfully!");
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // Add or Update Experience
  const handleSaveExperience = async () => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return;
      }
      if (newExperience.id) {
        // Update Experience
        const docRef = doc(db, "Experience", newExperience.id);
        await updateDoc(docRef, { ...newExperience });
        setExperience((prev) =>
          prev.map((exp) => (exp.id === newExperience.id ? newExperience : exp))
        );
      } else {
        if (!db) {
          console.error("Error in firebase initialization")
          return;
        }
        // Add New Experience
        const docRef = await addDoc(collection(db, "Experience"), {
          ...newExperience,
        });
        setExperience([...experience, { id: docRef.id, ...newExperience }]);
      }
      setNewExperience({
        role: "",
        company: "",
        duration: "",
        description: [""],
      });
      alert("Experience saved successfully!");
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  const handleEditExperience = (exp: SetStateAction<Experience>) => setNewExperience(exp);

  const handleDeleteExperience = async (id: string | undefined) => {
    try {
      if (!db) {
        console.error("Error in firebase initialization")
        return;
      }
      if (!id) {
        throw new Error("Document ID is required.");
      }
      await deleteDoc(doc(db, "Experience", id));
      setExperience(experience.filter((exp) => exp.id !== id));
      alert("Experience deleted successfully!");
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50  min-h-screen">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Profile Section */}
        <Card className="p-6 bg-white border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>
          <CardContent>
            <input
              type="text"
              placeholder="Name"
              value={profile.name || ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="p-3 bg-gray-100 border rounded-lg w-full mt-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Role"
              value={profile.role || ""}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="p-3 bg-gray-100 border rounded-lg w-full mt-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Description"
              value={profile.description || ""}
              onChange={(e) =>
                setProfile({ ...profile, description: e.target.value })
              }
              className="p-3 bg-gray-100 border rounded-lg w-full mt-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Github"
              value={profile.github || ""}
              onChange={(e) => setProfile({ ...profile, github: e.target.value })}
              className="p-3 bg-gray-100 border rounded-lg w-full mt-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="LinkedIn"
              value={profile.linkedin || ""}
              onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
              className="p-3 bg-gray-100 border rounded-lg w-full mt-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Contact Email"
              value={profile.email || ""}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="p-3 bg-gray-100 border rounded-lg w-full mt-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Resume Link"
              value={profile.resume || ""}
              onChange={(e) => setProfile({ ...profile, resume: e.target.value })}
              className="p-3 bg-gray-100 border rounded-lg w-full mt-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Profile Picture Link"
              value={profile.userImage || ""}
              onChange={(e) => setProfile({ ...profile, userImage: e.target.value })}
              className="p-3 bg-gray-100 border rounded-lg w-full mt-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              onClick={handleSaveProfile}
              className="mt-5 bg-myBlack hover:bg-gray-700 text-white p-3 rounded-lg w-full shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Save Profile
            </button>
          </CardContent>
        </Card>



        {/* About Section */}
        <Card className="mt-6 p-6 bg-white border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
          <CardContent>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="p-3 bg-gray-100 border rounded-lg w-full mt-2 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
              placeholder="Write something about yourself..."
              rows={5} // Adjust rows as needed
            />
            <button
              onClick={handleSaveAbout}
              className="mt-4 bg-myBlack hover:bg-gray-700 text-white p-3 rounded-lg w-full shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Save About
            </button>
          </CardContent>
        </Card>


        {/* Projects Section */}
        <Card className="mt-6 bg-white border rounded-lg shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
              <div onClick={() => setAddProjectVisible((prev) => !prev)}>
                {addProjectVisible === false ? <RiAddCircleLine className="size-5" /> : <MdOutlineCancel className="size-5" />}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {projects.map((proj) => (
              <div key={proj.id} className="flex justify-between items-center mb-4">
                <p className="text-gray-700 font-medium">{proj.title}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProject(proj)}
                    className=" hover:text-gray-600 text-xl text-myBlack p-2 rounded-full"
                  >
                    <BiSolidEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className=" hover:text-red-500 transition text-xl text-myBlack p-2 rounded-full"
                  >
                    <RiDeleteBin3Line />
                  </button>
                </div>
              </div>
            ))}
            {addProjectVisible && (

              <div className="mt-4">
                <h3 className="text-xl mb-2 font-semibold text-gray-800">
                  {newProject.id ? "Edit Project" : "Add Project"}
                </h3>
                <input
                  type="text"
                  placeholder="Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full p-3 bg-gray-100 border rounded-lg mb-2"
                />
                <textarea
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                  className="w-full p-3 bg-gray-100 border rounded-lg mb-2"
                />
                <input
                  type="text"
                  placeholder="Tech Stack"
                  value={newProject.stack}
                  onChange={(e) => setNewProject({ ...newProject, stack: e.target.value })}
                  className="w-full p-3 bg-gray-100 border rounded-lg mb-2"
                />
                <input
                  type="text"
                  placeholder="Live Link"
                  value={newProject.liveLink}
                  onChange={(e) =>
                    setNewProject({ ...newProject, liveLink: e.target.value })
                  }
                  className="w-full p-3 bg-gray-100 border rounded-lg mb-2"
                />
                <button
                  onClick={handleSaveProject}
                  className="p-3 bg-myBlack hover:bg-gray-700 text-white rounded-lg w-full"
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
                    className="p-3 bg-gray-400 hover:bg-gray-300 text-white rounded-lg w-full mt-2"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </CardContent>
        </Card>


        {/* Skills Section */}
        <Card className="mt-6 bg-white border rounded-lg shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
              <div onClick={() => setAddSkillsVisible((prev) => !prev)}>
                {addSkillsVisible === false ? <RiAddCircleLine className="size-5" /> : <MdOutlineCancel className="size-5" />}
              </div>
            </div>          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 text-gray-700"
                >
                  <span>{skill}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditSkill(index)}
                      className=" hover:text-gray-600 transition text-xl text-myBlack p-2 rounded-full"
                    >
                      <BiSolidEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(index)}
                      className=" hover:text-red-500 transition text-xl text-myBlack p-2 rounded-full"
                    >
                      <RiDeleteBin3Line />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {
              addSkillsVisible && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Enter a skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="w-full p-3 bg-gray-100 border rounded-lg mb-2"
                  />
                  <button
                    onClick={handleSaveSkill}
                    className="p-3 bg-myBlack hover:bg-gray-700 text-white rounded-lg w-full"
                  >
                    {editingSkillIndex !== null ? "Update Skill" : "Add Skill"}
                  </button>
                  {editingSkillIndex !== null && (
                    <button
                      onClick={handleCancelEdit}
                      className="p-3 bg-gray-400 hover:bg-gray-300 text-white rounded-lg w-full mt-2"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )
            }

          </CardContent>
        </Card>


        {/* Experience Section */}
        <Card className="mt-6 bg-white border rounded-lg shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
              <div onClick={() => setAddExpVisible((prev) => !prev)}>
                {addExpVisible === false ? <RiAddCircleLine className="size-5" /> : <MdOutlineCancel className="size-5" />}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="flex justify-between items-center mb-4 text-gray-700"
              >
                <p>
                  {exp.role} at {exp.company}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditExperience(exp)}
                    className=" hover:text-gray-600 transition text-xl text-myBlack p-2 rounded-full"
                  >
                    <BiSolidEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    className=" hover:text-red-500 transition text-xl text-myBlack p-2 rounded-full"
                  >
                    <RiDeleteBin3Line />
                  </button>
                </div>
              </div>
            ))}

            {addExpVisible && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {newExperience.id ? "Edit Experience" : "Add Experience"}
                </h3>
                <input
                  type="text"
                  placeholder="Company"
                  value={newExperience.company}
                  onChange={(e) =>
                    setNewExperience({ ...newExperience, company: e.target.value })
                  }
                  className="w-full p-3 bg-gray-100 border rounded-lg mb-2"
                />

                <div>
                  <h4 className="font-semibold mb-1">Description</h4>
                  {newExperience?.description?.map((line, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => {
                          const updatedDescription = [...newExperience.description ?? []];
                          updatedDescription[index] = e.target.value;
                          setNewExperience({
                            ...newExperience,
                            description: updatedDescription,
                          });
                        }}
                        className="w-full p-3 bg-gray-100 border rounded-lg"
                      />
                      <button
                        onClick={() => {
                          const updatedDescription = newExperience?.description?.filter(
                            (_, i) => i !== index
                          );
                          setNewExperience({
                            ...newExperience,
                            description: updatedDescription,
                          });
                        }}
                        className="hover:text-red-500 ml-2 transition text-xl text-myBlack p-2 rounded-full"
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
                          description: [...(newExperience.description ?? []), ""],
                        })
                      }

                      className="p-3 flex justify-center gap-2 items-center bg-myBlack hover:bg-gray-700 text-white rounded-lg w-full"
                    >
                      <GoListUnordered className="size-5" />
                      Add Point
                    </button>
                  </div>
                </div>


                <div>
                  <input
                    type="text"
                    placeholder="Duration"
                    value={newExperience.duration}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, duration: e.target.value })
                    }
                    className="w-full p-3 bg-gray-100 border rounded-lg mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={newExperience.role}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, role: e.target.value })
                    }
                    className="w-full p-3 bg-gray-100 border rounded-lg mb-2"
                  />
                  <button
                    onClick={handleSaveExperience}
                    className="p-3 flex justify-center gap-2 items-center bg-myBlack hover:bg-gray-700 text-white rounded-lg w-full"
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
                      className="p-3 bg-gray-400 hover:bg-gray-300 text-white rounded-lg w-full mt-2"
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
  );
};

export default AdminPanelContent;
