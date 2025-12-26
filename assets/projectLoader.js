/**
 * Dynamic Project Loader
 * Reads projects from data/projects.json and generates cards automatically
 *
 * HOW TO ADD A NEW PROJECT:
 * 1. Open data/projects.json
 * 2. Add a new project object to the "projects" array:
 *    {
 *      "id": 7,                          // Unique ID
 *      "name": "Your Project Name",      // Project title
 *      "description": "Description...",  // Short description
 *      "category": ["fullstack"],        // Categories: fullstack, frontend, cloud, algorithm
 *      "tech": ["React", "Node.js"],     // Tech stack tags
 *      "github": "https://github.com/...", // GitHub link (empty string if none)
 *      "live": "https://...",            // Live demo link (empty string if none)
 *      "featured": true,                 // Show on home page? true/false
 *      "order": 7                        // Display order (lower = first)
 *    }
 * 3. Save the file - projects update automatically!
 */

class ProjectLoader {
  constructor() {
    this.projects = [];
    this.categories = {};
  }

  // Load projects from JSON file
  async loadProjects() {
    try {
      const response = await fetch("data/projects.json");
      if (!response.ok) throw new Error("Failed to load projects");
      const data = await response.json();
      const base = Array.isArray(data.projects) ? data.projects : [];
      const extras = Array.isArray(data.extraPages) ? data.extraPages : [];
      this.projects = [...base, ...extras].sort((a, b) => a.order - b.order);
      this.categories = data.categories;
      return true;
    } catch (error) {
      console.error("Error loading projects:", error);
      return false;
    }
  }

  // Get category label
  getCategoryLabel(categories) {
    if (categories.includes("fullstack")) return "Full Stack";
    if (categories.includes("cloud")) return "Cloud & DevOps";
    if (categories.includes("algorithm")) return "Algorithms";
    if (categories.includes("frontend")) return "Frontend";
    return "Project";
  }

  // Generate GitHub icon SVG
  getGitHubIcon() {
    return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
  }

  // Generate live link icon SVG
  getLiveIcon() {
    return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`;
  }

  // Generate a single project card (for projects page - grid style)
  generateProjectCard(project) {
    const categoryLabel = this.getCategoryLabel(project.category);
    const techTags = project.tech
      .map((t) => `<span class="tech-tag">${t}</span>`)
      .join("");

    let links = "";
    if (project.live) {
      links += `<a href="${
        project.live
      }" target="_blank" rel="noopener noreferrer" class="text-orange-600 hover:text-orange-700" aria-label="View live demo">${this.getLiveIcon()}</a>`;
    }
    if (project.github) {
      links += `<a href="${
        project.github
      }" target="_blank" rel="noopener noreferrer" class="text-orange-600 hover:text-orange-700" aria-label="View code on GitHub">${this.getGitHubIcon()}</a>`;
    }
    if (!project.github && !project.live) {
      links = `<span class="text-gray-400" title="Private/Coming Soon">${this.getGitHubIcon()}</span>`;
    }

    return `
      <div class="project-card" data-category="${project.category.join(" ")}">
        <div class="project-card-inner group border border-black/10 rounded-2xl p-6 hover:border-orange-500 transition-all duration-500 bg-white/40 hover:shadow-2xl">
          <div class="flex justify-between items-start mb-4">
            <span class="mono text-xs opacity-40">${categoryLabel}</span>
            <div class="flex gap-3">${links}</div>
          </div>
          <h3 class="text-2xl sm:text-3xl serif font-semibold mb-3 group-hover:text-orange-600 transition-colors">${
            project.name
          }</h3>
          <p class="text-sm opacity-70 mb-4 leading-relaxed">${
            project.description
          }</p>
          <div class="flex flex-wrap gap-2">${techTags}</div>
        </div>
      </div>
    `;
  }

  // Generate a single project row (for home page - list style)
  generateProjectRow(project, index) {
    const link = project.live || project.github || "#";
    const isExternal = link.startsWith("http");
    const targetAttr = isExternal
      ? 'target="_blank" rel="noopener noreferrer"'
      : "";

    return `
      <a
        href="${link}"
        ${targetAttr}
        aria-label="${project.name} project${
      isExternal ? " - opens in new tab" : ""
    }"
        class="project-row group border-t border-black/10 py-6 sm:py-8 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:px-4 md:hover:px-6 transition-all duration-700"
      >
        <div class="flex items-center gap-4 sm:gap-8 md:gap-12">
          <span class="mono opacity-30 text-sm sm:text-base" aria-hidden="true">${String(
            index + 1
          ).padStart(2, "0")}</span>
          <div>
            <h3 class="text-xl sm:text-2xl md:text-3xl lg:text-5xl serif group-hover:italic group-hover:text-orange-600 transition-all">
              ${project.name}
            </h3>
            <p class="mono opacity-40 mt-1 text-xs sm:text-sm">
              ${project.tech.slice(0, 4).join(" / ")}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 sm:gap-8 mt-3 md:mt-0">
          <p class="max-w-xs text-sm opacity-50 hidden lg:block">
            ${project.description.substring(0, 80)}${
      project.description.length > 80 ? "..." : ""
    }
          </p>
          <div class="project-arrow text-xl sm:text-2xl md:text-3xl transform transition-transform duration-500 group-hover:text-orange-600" aria-hidden="true">
            →
          </div>
        </div>
      </a>
    `;
  }

  // Render all projects (projects page)
  async renderProjectsPage(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const loaded = await this.loadProjects();
    if (!loaded) {
      container.innerHTML =
        '<p class="text-center opacity-60">Failed to load projects. Please refresh.</p>';
      return;
    }

    container.innerHTML = this.projects
      .map((p) => this.generateProjectCard(p))
      .join("");
    this.initFilters();
  }

  // Render featured projects (home page)
  async renderFeaturedProjects(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const loaded = await this.loadProjects();
    if (!loaded) return;

    const featured = this.projects.filter((p) => p.featured);
    container.innerHTML = featured
      .map((p, i) => this.generateProjectRow(p, i))
      .join("");
  }

  // Initialize filter buttons
  initFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        filterBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        projectCards.forEach((card) => {
          if (filter === "all") {
            card.classList.remove("hidden");
            card.style.animation = "fadeInUp 0.4s ease forwards";
          } else {
            const categories = card.getAttribute("data-category");
            if (categories.includes(filter)) {
              card.classList.remove("hidden");
              card.style.animation = "fadeInUp 0.4s ease forwards";
            } else {
              card.classList.add("hidden");
            }
          }
        });
      });
    });
  }

  // Initialize custom cursor (deprecated - handled globally on each page)
  initCursor() {}
}

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const loader = new ProjectLoader();

  // Check which page we're on and render accordingly
  if (document.getElementById("projects-grid")) {
    loader.renderProjectsPage("projects-grid");
  }

  if (document.getElementById("featured-projects")) {
    loader.renderFeaturedProjects("featured-projects");
  }
});
