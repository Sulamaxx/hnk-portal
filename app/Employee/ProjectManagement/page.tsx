"use client";

import React, { useEffect, useState } from "react";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [projectID, setProjectID] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectEmployeeGroupName, setProjectEmployeeGroupName] = useState("");
  const [projectGroupMemberCount, setProjectGroupMemberCount] = useState("");
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
    setProjectID(projectId);
    setProjectName(project.name);
    setProjectDescription(project.description);
    setProjectEmployeeGroupName(project.employeeGroup.name);
    setProjectGroupMemberCount(project.employeeGroup.members.length);
    setProjectClient(project.client.first_name);
  };

  const handleUpdateProject = () => {
    if (projectID == "") {
      alert("Please select the project");
    } else {
      const details = JSON.stringify({
        name: projectName,
        description: projectDescription,
      });
      fetch("http://localhost:5000/api/projects/" + projectID, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: details,
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          loadProjectDetails();
          clearTextFields();
        });
    }
  };

  const clearTextFields = function () {
    setProjectName("");
    setProjectClient("");
    setProjectDescription("");
    setProjectEmployeeGroupName("");
    setProjectGroupMemberCount("");
  };

  const handleDeleteProject = (projectId) => {
    fetch("http://localhost:5000/api/projects/" + projectId, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        loadProjectDetails();
        clearTextFields();
      });
  };

  const handleCreateProject = () => {};

  const [selectedProject, setSelectedProject] = useState({});
  const [creatingNewProject, setCreatingNewProject] = useState(false);

  // Functions for CRUD operations

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
    <div className=" p-8">
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
                  onClick={() => handleDeleteProject(project._id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
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
                {/* <input
                  readOnly
                  type="text"
                  className="w-full p-2 border border-gray-300"
                  value={projectEmployeeGroupName}
                  onChange={(e) => setProjectEmployeeGroupName(e.target.value)}
                /> */}
                <select name="" id="">
                  <option value="">1 </option>
                </select>
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
                onClick={handleUpdateProject}
              >
                Update Project Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" ">
        <h1 className="text-3xl font-bold mb-8">Create New Project</h1>

        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Project Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 border border-gray-300"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="employeeGroup"
              className="block text-sm font-semibold mb-2"
            >
              Employee Group Name:
            </label>
            <input
              type="text"
              id="employeeGroup"
              name="employeeGroup"
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="client"
              className="block text-sm font-semibold mb-2"
            >
              Client:
            </label>
            <input
              type="text"
              id="client"
              name="client"
              className="w-full p-2 border border-gray-300"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="members"
              className="block text-sm font-semibold mb-2"
            >
              Members:
            </label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option value="">Option1 </option>
              <option value="">Option2 </option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCreateProject}
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectManagement;
