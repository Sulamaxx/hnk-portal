"use client";

import React, { useState } from "react";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([
    // Initial projects data (replace with your actual data)
    { id: "1", name: "Project A", description: "Description for Project A" },
    { id: "2", name: "Project B", description: "Description for Project B" },
    // Add more projects as needed
  ]);

  const [selectedProject, setSelectedProject] = useState({});
  const [creatingNewProject, setCreatingNewProject] = useState(false);

  // Functions for CRUD operations
  const handleCreateProject = () => {
    setCreatingNewProject(true);
    setSelectedProject({});
  };

  const handleViewProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
    setCreatingNewProject(false);
  };

  const handleUpdateProject = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedProject(project);
    setCreatingNewProject(true);
  };

  const handleDeleteProject = (projectId) => {
    // Implement delete logic
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    setProjects(updatedProjects);
    setSelectedProject({});
    setCreatingNewProject(false);
    // Inform beenz system about the interaction
    informBeenzSystem("Delete", projectId);
  };

  const handleSaveProject = (projectDetails) => {
    // Implement save/update logic
    if (creatingNewProject) {
      const newProject = {
        id: projects.length + 1,
        ...projectDetails,
      };
      setProjects([...projects, newProject]);
      // Inform beenz system about the interaction
      informBeenzSystem("Create", newProject.id);
    } else {
      const updatedProjects = projects.map((p) =>
        p.id === selectedProject.id ? { ...p, ...projectDetails } : p
      );
      setProjects(updatedProjects);
      // Inform beenz system about the interaction
      informBeenzSystem("Update", selectedProject.id);
    }
    setCreatingNewProject(false);
  };

  const informBeenzSystem = (action, projectId) => {
    // Implement logic to inform the beenz system about the employee interaction
    console.log(
      `Informing beenz system about ${action} action on project ${projectId}`
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Project Management</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Project List */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Projects</h2>
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.id} className="cursor-pointer">
                <span
                //   onClick={() => handleViewProject(project.id)}
                  className="text-blue-500 hover:underline"
                >
                  {project.name}
                </span>
                <button
                //   onClick={() => handleUpdateProject(project.id)}
                  className="text-green-500 hover:underline ml-2"
                >
                  Edit
                </button>
                <button
                //   onClick={() => handleDeleteProject(project.id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            onClick={handleCreateProject}
          >
            Create New Project
          </button>
        </div>

        {/* Project Details Form */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">
            {creatingNewProject ? "Create New Project" : "Project Details"}
          </h2>
          <div className="p-4 border rounded-md bg-gray-100">
            {creatingNewProject ? (
              <div>
                <label className="block mb-4" htmlFor="newProjectName">
                  Project Name:
                  <input
                    type="text"
                    id="newProjectName"
                    name="name"
                    className="w-full p-2 border border-gray-300"
                    value={projectDetails.name}
                    onChange={handleChange}
                  />
                </label>

                <label className="block mb-4" htmlFor="newProjectDescription">
                  Project Description:
                  <textarea
                    id="newProjectDescription"
                    name="description"
                    className="w-full p-2 border border-gray-300"
                    value={projectDetails.description}
                    onChange={handleChange}
                  />
                </label>
              </div>
            ) : (
              <div>
                {selectedProject.id ? (
                  <div>
                    <h3 className="text-lg font-bold mb-2">
                      {selectedProject.name}
                    </h3>
                    <p>{selectedProject.description}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Select a project to view details.
                  </p>
                )}
              </div>
            )}
          </div>
          {creatingNewProject && (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
              onClick={handleSave}
            >
              Save New Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
