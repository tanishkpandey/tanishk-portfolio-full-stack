"use client";

import { useState, useEffect } from "react";
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

const AdminPanelContent = () => {
  const [profile, setProfile] = useState({});
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState([]);

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    stack: "",
    liveLink: "",
  });
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    duration: "",
    description: [""],
  });
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editingSkillIndex, setEditingSkillIndex] = useState(null);

  // Fetch data from all collections on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Profile
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
      await setDoc(doc(db, "Profile", "PArB5TcvuHEVztorw4LB"), profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // About Save Handler
  const handleSaveAbout = async () => {
    try {
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

  const handleEditProject = (project) => {
    setNewProject({ ...project });
  };

  const handleDeleteProject = async (id) => {
    try {
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

  const handleEditSkill = (index) => {
    setNewSkill(skills[index]); // Set the input to the selected skill
    setEditingSkillIndex(index); // Track the index of the skill being edited
  };

  const handleDeleteSkill = async (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);

    try {
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
      if (newExperience.id) {
        // Update Experience
        const docRef = doc(db, "Experience", newExperience.id);
        await updateDoc(docRef, { ...newExperience });
        setExperience((prev) =>
          prev.map((exp) => (exp.id === newExperience.id ? newExperience : exp))
        );
      } else {
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

  const handleEditExperience = (exp) => setNewExperience(exp);

  const handleDeleteExperience = async (id) => {
    try {
      await deleteDoc(doc(db, "Experience", id));
      setExperience(experience.filter((exp) => exp.id !== id));
      alert("Experience deleted successfully!");
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <AdminNavbar />

      {/* Profile Section */}
      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <input
          type="text"
          placeholder="Name"
          value={profile.name || ""}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="p-2 bg-gray-700 rounded w-full mt-2"
        />
        <input
          type="text"
          placeholder="Role"
          value={profile.role || ""}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          className="p-2 bg-gray-700 rounded w-full mt-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={profile.description || ""}
          onChange={(e) =>
            setProfile({ ...profile, description: e.target.value })
          }
          className="p-2 bg-gray-700 rounded w-full mt-2"
        />
        <input
          type="text"
          placeholder="Github"
          value={profile.github || ""}
          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
          className="p-2 bg-gray-700 rounded w-full mt-2"
        />
        <input
          type="text"
          placeholder="LinkedIn"
          value={profile.linkedin || ""}
          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
          className="p-2 bg-gray-700 rounded w-full mt-2"
        />
        <input
          type="email"
          placeholder="Contact Email"
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="p-2 bg-gray-700 rounded w-full mt-2"
        />
        <button
          onClick={handleSaveProfile}
          className="mt-4 bg-blue-500 p-2 rounded"
        >
          Save Profile
        </button>
      </div>

      {/* About Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">About</h2>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="p-2 bg-gray-700 rounded w-full mt-2"
        />
        <button
          onClick={handleSaveAbout}
          className="mt-4 bg-blue-500 p-2 rounded"
        >
          Save About
        </button>
      </div>

      {/* Projects Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        {projects.map((proj) => (
          <div key={proj.id} className="flex justify-between items-center">
            <p>{proj.title}</p>
            <div>
              <button
                onClick={() => handleEditProject(proj)}
                className="bg-yellow-500 p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProject(proj.id)}
                className="bg-red-500 p-2 rounded ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Project Form */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold">
            {newProject.id ? "Edit Project" : "Add Project"}
          </h3>
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="w-full p-2 bg-gray-700 rounded mb-2"
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="w-full p-2 bg-gray-700 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Tech Stack"
            value={newProject.stack}
            onChange={(e) =>
              setNewProject({ ...newProject, stack: e.target.value })
            }
            className="w-full p-2 bg-gray-700 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Live Link"
            value={newProject.liveLink}
            onChange={(e) =>
              setNewProject({ ...newProject, liveLink: e.target.value })
            }
            className="w-full p-2 bg-gray-700 rounded mb-2"
          />
          <button
            onClick={handleSaveProject}
            className="p-2 bg-indigo-600 rounded"
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
              className="p-2 bg-gray-500 rounded ml-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Skills</h2>

        {/* Display the list of skills */}
        <ul className="list-disc pl-6 mb-4">
          {skills.map((skill, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{skill}</span>
              <div>
                <button
                  onClick={() => handleEditSkill(index)}
                  className="bg-yellow-500 p-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSkill(index)}
                  className="bg-red-500 p-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Add/Edit skill form */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter a skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded mb-2"
          />
          <button
            onClick={handleSaveSkill}
            className="p-2 bg-indigo-600 rounded"
          >
            {editingSkillIndex !== null ? "Update Skill" : "Add Skill"}
          </button>
          {editingSkillIndex !== null && (
            <button
              onClick={handleCancelEdit}
              className="p-2 bg-gray-500 rounded ml-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="flex justify-between items-center">
            <p>
              {exp.role} at {exp.company}
            </p>
            <div>
              <button
                onClick={() => handleEditExperience(exp)}
                className="bg-yellow-500 p-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteExperience(exp.id)}
                className="bg-red-500 p-2 rounded ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Experience Form */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold">
            {newExperience.id ? "Edit Experience" : "Add Experience"}
          </h3>

          <input
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
            className="w-full p-2 bg-gray-700 rounded mb-2"
          />

          <div>
            <h4 className="font-semibold mb-1">Description</h4>

            {newExperience.description.map((line, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={line}
                  onChange={(e) => {
                    const updatedDescription = [...newExperience.description];
                    updatedDescription[index] = e.target.value;
                    setNewExperience({
                      ...newExperience,
                      description: updatedDescription,
                    });
                  }}
                  className="w-full p-2 bg-gray-700 rounded"
                />
                <button
                  onClick={() => {
                    const updatedDescription = newExperience.description.filter(
                      (_, i) => i !== index
                    );
                    setNewExperience({
                      ...newExperience,
                      description: updatedDescription,
                    });
                  }}
                  className="bg-red-500 p-2 rounded ml-2"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setNewExperience({
                  ...newExperience,
                  description: [...newExperience.description, ""],
                })
              }
              className="bg-green-500 p-2 rounded"
            >
              Add Description Line
            </button>
          </div>

          <input
            type="text"
            placeholder="Duration"
            value={newExperience.duration}
            onChange={(e) =>
              setNewExperience({ ...newExperience, duration: e.target.value })
            }
            className="w-full p-2 bg-gray-700 rounded mb-2"
          />

          <input
            type="text"
            placeholder="Role"
            value={newExperience.role}
            onChange={(e) =>
              setNewExperience({ ...newExperience, role: e.target.value })
            }
            className="w-full p-2 bg-gray-700 rounded mb-2"
          />

          <button
            onClick={handleSaveExperience}
            className="p-2 bg-indigo-600 rounded"
          >
            {newExperience.id ? "Update Experience" : "Add Experience"}
          </button>
          {newExperience.id && (
            <button
              onClick={() =>
                setNewProject({
                  title: "",
                  description: "",
                  stack: "",
                  liveLink: "",
                })
              }
              className="p-2 bg-gray-500 rounded ml-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanelContent;
