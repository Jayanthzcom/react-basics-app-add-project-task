import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NoProject from "./components/NoProject.jsx";

import NewProject from "./components/NewProject.jsx";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";
function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const textId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: textId,
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id),
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: null };
    });
  }

  function handleAddProject(projectData) {
    const projectId = Math.random();
    const newProject = {
      ...projectData,
      id: projectId,
    };
    setProjectsState((prevState) => {
      return {
        ...prevState,
        projects: [...prevState.projects, newProject],
        selectedProjectId: undefined,
      };
    });
  }

  function clickSelectedProject(id) {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: id };
    });
  }

  function handleCancel() {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: undefined };
    });
  }

  function onDeleteClick() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      deleteClick={onDeleteClick}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancelClick={handleCancel} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProject onStartAddProject={handleStartAddProject} />;
  }
  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectSidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          selectedProjectId={projectsState.selectedProjectId}
          showSelectedProject={clickSelectedProject}
        />
        {content}
      </main>
    </>
  );
}

export default App;
