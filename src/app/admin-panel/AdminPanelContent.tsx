'use client';
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase/config";

const AdminPanelContent = () => {
  // State for Profile Information
  const [profile, setProfile] = useState({
    name: "",
    role: "",
    description: "",
    github: "",
    linkedin: "",
  });

  // State for About Me
  const [about, setAbout] = useState("");

  // State for Projects
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    stack: "",
    liveLink: "",
  });

  // State for Work Experience
  const [experience, setExperience] = useState([]);
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });

  // Fetch data from Firestore on load
  useEffect(() => {
    const fetchData = async () => {
      const profileDoc = await getDocs(collection(db, "profile"));
      const aboutDoc = await getDocs(collection(db, "about"));
      const projectDocs = await getDocs(collection(db, "projects"));
      const experienceDocs = await getDocs(collection(db, "experience"));

      setProfile(profileDoc.docs[0]?.data() || {});
      setAbout(aboutDoc.docs[0]?.data()?.content || "");
      setProjects(projectDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setExperience(
        experienceDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchData();
  }, []);

  // Handlers for Profile Information
  const handleSaveProfile = async () => {
    try {
      await setDoc(doc(db, "profile", "main"), profile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handlers for About Me
  const handleSaveAbout = async () => {
    try {
      await setDoc(doc(db, "about", "main"), { content: about });
      alert("About Me updated successfully!");
    } catch (error) {
      console.error("Error updating About Me:", error);
    }
  };

  // Handlers for Projects
  const handleAddProject = async () => {
    try {
      const docRef = await addDoc(collection(db, "projects"), newProject);
      setProjects([...projects, { id: docRef.id, ...newProject }]);
      setNewProject({ title: "", description: "", stack: "", liveLink: "" });
      alert("Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter((project) => project.id !== id));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Handlers for Work Experience
  const handleAddExperience = async () => {
    try {
      const docRef = await addDoc(collection(db, "experience"), newExperience);
      setExperience([...experience, { id: docRef.id, ...newExperience }]);
      setNewExperience({
        role: "",
        company: "",
        duration: "",
        description: "",
      });
      alert("Experience added successfully!");
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await deleteDoc(doc(db, "experience", id));
      setExperience(experience.filter((exp) => exp.id !== id));
      alert("Experience deleted successfully!");
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* Profile Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Role"
          value={profile.role}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <textarea
          placeholder="Description"
          value={profile.description}
          onChange={(e) =>
            setProfile({ ...profile, description: e.target.value })
          }
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <input
          type="text"
          placeholder="GitHub"
          value={profile.github}
          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <input
          type="text"
          placeholder="LinkedIn"
          value={profile.linkedin}
          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <button
          onClick={handleSaveProfile}
          className="p-2 bg-indigo-600 rounded"
        >
          Save Profile
        </button>
      </div>

      {/* About Me Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <button onClick={handleSaveAbout} className="p-2 bg-indigo-600 rounded">
          Save About Me
        </button>
      </div>

      {/* Projects Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        {projects.map((project) => (
          <div key={project.id} className="flex justify-between items-center mb-2">
            <p>{project.title}</p>
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="p-2 bg-red-600 rounded"
            >
              Delete
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Title"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <input
          type="text"
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
          onClick={handleAddProject}
          className="p-2 bg-indigo-600 rounded"
        >
          Add Project
        </button>
      </div>

      {/* Experience Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="flex justify-between items-center mb-2">
            <p>
              {exp.role} at {exp.company}
            </p>
            <button
              onClick={() => handleDeleteExperience(exp.id)}
              className="p-2 bg-red-600 rounded"
            >
              Delete
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder="Role"
          value={newExperience.role}
          onChange={(e) =>
            setNewExperience({ ...newExperience, role: e.target.value })
          }
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Company"
          value={newExperience.company}
          onChange={(e) =>
            setNewExperience({ ...newExperience, company: e.target.value })
          }
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Duration"
          value={newExperience.duration}
          onChange={(e) =>
            setNewExperience({ ...newExperience, duration: e.target.value })
          }
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <textarea
          placeholder="Description"
          value={newExperience.description}
          onChange={(e) =>
            setNewExperience({ ...newExperience, description: e.target.value })
          }
          className="w-full p-2 bg-gray-700 rounded mb-2"
        />
        <button
          onClick={handleAddExperience}
          className="p-2 bg-indigo-600 rounded"
        >
          Add Experience
        </button>
      </div>
    </div>
  );
};

export default AdminPanelContent;
