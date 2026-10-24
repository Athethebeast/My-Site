const projectStatus = document.querySelector("#project-status");
const projectList = document.querySelector("#project-list");

async function showRecentProjects() {
  try {
    const response = await fetch(
      "https://api.github.com/users/Athethebeast/repos?sort=updated&direction=desc&per_page=100"
    );

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const repositories = await response.json();
    const recentProjects = repositories
      .filter((repository) => !repository.fork && !repository.archived)
      .slice(0, 3);

    if (recentProjects.length === 0) {
      projectStatus.textContent = "No public projects found yet.";
      return;
    }

    for (const repository of recentProjects) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = repository.html_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = repository.name;
      item.append(link);
      projectList.append(item);
    }

    projectStatus.textContent = "Showing up to 3 recently updated public GitHub projects.";
  } catch (error) {
    console.error("Unable to load recent GitHub projects:", error);
    projectStatus.textContent = "Couldn’t load projects right now. Visit the GitHub profile below.";
  }
}

if (projectStatus && projectList) {
  showRecentProjects();
}
