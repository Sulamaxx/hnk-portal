"use client";

import React, { useEffect, useState } from "react";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [projectID, setProjectID] = useState();
  const [projectName, setProjectName] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [projectEmployeeGroupName, setProjectEmployeeGroupName] = useState();
  const [projectGroupMemberCount, setProjectGroupMemberCount] = useState();
  const [projectClient, setProjectClient] = useState();

  const loadProjectDetails = function () {
    fetch("http://localhost:5000/api/projects", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data.allProjects));

        setProjects(data.allProjects);
      });
  };

  useEffect(loadProjectDetails, []);

  const handleViewProject = (project) => {
    const projectId = project._id;
    setProjectID(projectID);
    setProjectName(project.name);
    setProjectDescription(project.description);
    setProjectEmployeeGroupName(project.employeeGroup.name);
    setProjectGroupMemberCount(project.employeeGroup.members.length);
    setProjectClient(project.client.first_name);
  };

  const handleUpdateProject = (projectId) => {};

  const [selectedProject, setSelectedProject] = useState({});
  const [creatingNewProject, setCreatingNewProject] = useState(false);

  // Functions for CRUD operations
  const handleCreateProject = () => {
    setCreatingNewProject(true);
    setSelectedProject({});
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
              <li key={project._id} className="cursor-pointer">
                <span
                  onClick={() => handleViewProject(project)}
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
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            onClick={handleCreateProject}
          >
            Create New Project
          </button> */}
        </div>

        {/* Project Details Form */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Project Details</h2>
          <div className="p-4 border rounded-md bg-gray-100">
            <div>
              <label className="block mb-4" htmlFor="ProjectName">
                Project Name:
                <input
                  type="text"
                  id="newProjectName"
                  name="name"
                  className="w-full p-2 border border-gray-300"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </label>

              <label className="block mb-4">
                Client:
                <input
                  type="text"
                  readOnly
                  className="w-full p-2 border border-gray-300"
                  value={projectClient}
                  onChange={(e) => setProjectClient(e.target.value)}
                />
              </label>

              <label className="block mb-4" htmlFor="ProjectDescription">
                Project Description:
                <textarea
                  id="newProjectDescription"
                  name="description"
                  className="w-full p-2 border border-gray-300"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </label>

              <label className="block mb-4">
                Employee Group Name:
                <input
                  readOnly
                  type="text"
                  className="w-full p-2 border border-gray-300"
                  value={projectEmployeeGroupName}
                  onChange={(e) => setProjectEmployeeGroupName(e.target.value)}
                />
              </label>
              <label className="block mb-4">
                Member count of Employee Group :
                <input
                  readOnly
                  type="text"
                  className="w-full p-2 border border-gray-300"
                  value={projectGroupMemberCount}
                  onChange={(e) => setProjectGroupMemberCount(e.target.value)}
                />
              </label>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleUpdateProject()}
              >
                Update Project Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
