'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// ──────────────────────────────────────────────
//  GITHUB PROJECTS – fetch & render
// ──────────────────────────────────────────────

const GH_USERNAME = "AradhyaMalaviya";
const GH_API      = `https://api.github.com/users/${GH_USERNAME}/repos?type=public&per_page=100&sort=pushed`;

// Language → colour mapping (GitHub's official palette subset)
const LANG_COLORS = {
  JavaScript:  "#f1e05a",
  TypeScript:  "#3178c6",
  HTML:        "#e34c26",
  CSS:         "#563d7c",
  Python:      "#3572A5",
  Java:        "#b07219",
  Kotlin:      "#A97BFF",
  "C++":       "#f34b7d",
  C:           "#555555",
  "C#":        "#178600",
  PHP:         "#4F5D95",
  Ruby:        "#701516",
  Go:          "#00ADD8",
  Rust:        "#dea584",
  Swift:       "#F05138",
  Dart:        "#00B4AB",
  Shell:       "#89e051",
  Vue:         "#41b883",
  SCSS:        "#c6538c",
  Jupyter:     "#DA5B0B",
};

/**
 * Format a repo name for display (replace dashes/underscores with spaces, title-case)
 */
function formatRepoName(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Relative time string, e.g. "3 days ago"
 */
function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  const intervals = [
    { label: "year",   secs: 31536000 },
    { label: "month",  secs: 2592000 },
    { label: "week",   secs: 604800 },
    { label: "day",    secs: 86400 },
    { label: "hour",   secs: 3600 },
    { label: "minute", secs: 60 },
  ];
  for (const { label, secs } of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `Updated ${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "Updated just now";
}

/**
 * Generate a color from string hash
 */
function hashColor(str, offset = 0) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash += offset * 1000;
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 60%)`;
}

/**
 * 3D Tilt Effect
 */
function applyTiltEffect(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    const glare = card.querySelector('.gh-card-glare');
    if (glare) {
      glare.style.transform = `translate(${x - rect.width}px, ${y - rect.height}px)`;
      glare.style.opacity = '0.6';
    }
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const glare = card.querySelector('.gh-card-glare');
    if (glare) {
      glare.style.opacity = '0';
    }
  });
}

/**
 * Project preview image mapping
 * Maps repo names (lowercase) to their preview image paths
 */
const PROJECT_PREVIEWS = {
  "fitbox":                             "./assets/images/projects/fitbox.png",
  "fitbox-mobile":                      "./assets/images/projects/fitbox.png",
  "fitbox-project-":                    "./assets/images/projects/fitbox.png",
  "heart_diseases-_predictions-":       "./assets/images/projects/heart-diseases-predictions.png",
  "heart-risk-ai":                      "./assets/images/projects/heart-diseases-predictions.png",
  "email-automation-tool":              "./assets/images/projects/email-automation-tool.png",
  "internship-finder-automation-tool":   "./assets/images/projects/email-automation-tool.png",
  "rackandroll-cafe":                   "./assets/images/projects/rackandroll-cafe.png",
  "thebadgercompany":                   "./assets/images/projects/thebadgercompany.png",
  "neural-retail-ai":                   "./assets/images/projects/neural-retail-ai.png",
  "neuralretail":                       "./assets/images/projects/neural-retail-ai.png",
  "detoxing":                           "./assets/images/projects/detoxing.jpg",
  "web-development-internship-project": "./assets/images/projects/web-development-internship.webp",
  "my-portfolio":                       "./assets/images/readme/portfolio-hero.png",
  "aradhya-portfolio":                  "./assets/images/readme/portfolio-hero.png",
  "aradhyas-portfolio":                 "./assets/images/readme/portfolio-hero.png",
};

// Global projects state
let masterProjectsList = [];
let activeFilterKey = "all";

/**
 * Build a single project-card <li> element
 */
function createProjectCard(project, index) {
  const li = document.createElement("li");
  li.className = "gh-card premium-card";
  li.dataset.language = (project.language || "Other").toLowerCase();
  li.dataset.category = (project.category || "Other").toLowerCase();
  li.dataset.visibility = project.isPrivate ? "private" : "public";
  li.dataset.featured = project.isFeatured ? "true" : "false";
  li.dataset.name = (project.name || "").toLowerCase();
  li.style.animationDelay = `${Math.min(index * 0.04, 0.6)}s`;

  const langColor = LANG_COLORS[project.language] || "#8b949e";
  const hasDesc = project.description && project.description.trim();
  const description = hasDesc ? project.description : "No description provided.";
  const descClass = hasDesc ? "gh-card-desc" : "gh-card-desc empty";
  const liveUrl = project.liveUrl || project.homepage || "";
  const repoUrl = project.repoUrl || project.html_url || `https://github.com/${GH_USERNAME}/${project.name}`;

  // Badges
  const visibilityBadge = project.isPrivate
    ? `<span class="gh-card-visibility-badge private"><ion-icon name="lock-closed"></ion-icon> Private</span>`
    : `<span class="gh-card-visibility-badge public"><ion-icon name="globe-outline"></ion-icon> Public</span>`;

  const featuredBadge = project.isFeatured
    ? `<span class="gh-card-visibility-badge featured"><ion-icon name="sparkles"></ion-icon> Featured</span>`
    : "";

  const forkBadge = project.isFork || project.fork
    ? `<span class="gh-card-fork-badge"><ion-icon name="git-branch-outline"></ion-icon> Forked</span>`
    : "";

  // Action Buttons
  let demoBtn = "";
  if (liveUrl && liveUrl.trim()) {
    demoBtn = `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-primary">
      <ion-icon name="open-outline"></ion-icon>
      <span>Live Demo</span>
    </a>`;
  }

  const sourceBtn = project.isPrivate
    ? `<a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-secondary gh-btn--private" title="Private GitHub Repository (Protected Access)">
        <ion-icon name="lock-closed-outline"></ion-icon>
        <span>Private Repo</span>
      </a>`
    : `<a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-secondary" title="View Source Code on GitHub">
        <ion-icon name="logo-github"></ion-icon>
        <span>Source</span>
      </a>`;

  // Colors
  const color1 = hashColor(project.name, 1);
  const color2 = hashColor(project.name, 2);

  // Determine preview image
  const repoKey = project.name.toLowerCase();
  const previewImg = project.previewImage || PROJECT_PREVIEWS[repoKey] || null;
  const hasLive = liveUrl && liveUrl.trim();
  const displayName = project.displayName || formatRepoName(project.name);

  // Build the banner content
  let bannerContent;
  if (previewImg) {
    const bannerInner = `
       <div class="gh-card-banner-overlay gh-card-banner-overlay--subtle"></div>
       <img class="gh-card-preview-img" src="${previewImg}" alt="Preview of ${displayName}" loading="lazy" />
       <div class="gh-card-preview-hover">
         <ion-icon name="${hasLive ? 'open-outline' : (project.isPrivate ? 'lock-closed-outline' : 'eye-outline')}"></ion-icon>
         <span>${hasLive ? 'View Live' : (project.isPrivate ? 'Private Repo' : 'View Project')}</span>
       </div>
    `;

    if (hasLive) {
      bannerContent = `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="gh-card-banner gh-card-banner--preview" style="background: linear-gradient(135deg, ${color1}, ${color2});" aria-label="Open ${displayName} live demo">
        ${bannerInner}
      </a>`;
    } else {
      bannerContent = `<a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="gh-card-banner gh-card-banner--preview" style="background: linear-gradient(135deg, ${color1}, ${color2});" aria-label="View ${displayName} repository">
        ${bannerInner}
      </a>`;
    }
  } else {
    // Fallback gradient banner with code icon
    const bannerTarget = hasLive ? liveUrl : repoUrl;
    bannerContent = `<a href="${bannerTarget}" target="_blank" rel="noopener noreferrer" class="gh-card-banner gh-card-banner--fallback" style="background: linear-gradient(135deg, ${color1}, ${color2});" aria-label="View ${displayName}">
      <div class="gh-card-banner-overlay"></div>
      <div class="gh-card-icon-large">
        <ion-icon name="${project.category === 'AI/ML' ? 'hardware-chip-outline' : (project.isPrivate ? 'shield-checkmark-outline' : 'code-slash-outline')}"></ion-icon>
      </div>
      <div class="gh-card-preview-hover">
        <ion-icon name="${hasLive ? 'open-outline' : 'eye-outline'}"></ion-icon>
        <span>${hasLive ? 'View Live' : (project.isPrivate ? 'Private Repo' : 'View Project')}</span>
      </div>
    </a>`;
  }

  // Tech tags HTML
  const techList = (project.languages && project.languages.length ? project.languages : [project.language]).filter(Boolean).slice(0, 4);
  const techTagsHtml = techList.length
    ? `<div class="gh-card-tags">${techList.map(t => `<span class="gh-tech-pill">${t}</span>`).join('')}</div>`
    : "";

  const starsCount = project.stars ?? project.stargazers_count ?? 0;
  const forksCount = project.forks ?? project.forks_count ?? 0;
  const updatedDate = project.pushedAt || project.pushed_at || new Date().toISOString();

  li.innerHTML = `
    <div class="gh-card-glare"></div>
    ${bannerContent}
    <div class="gh-card-content">
      <div class="gh-card-header">
        <div class="gh-card-title-row">
          <h3 class="gh-card-name" title="${displayName}">${displayName}</h3>
        </div>
        <div class="gh-card-badges">
          ${visibilityBadge}
          ${featuredBadge}
          ${forkBadge}
        </div>
      </div>

      <div class="gh-card-body">
        <p class="${descClass}">${description}</p>
        ${techTagsHtml}

        <div class="gh-card-meta">
          ${project.language ? `<span class="gh-meta-item">
            <span class="gh-lang-dot" style="--lang-color:${langColor}; box-shadow: 0 0 8px ${langColor}"></span>
            <span>${project.language}</span>
          </span>` : ""}
          <span class="gh-meta-item" title="Stars">
            <ion-icon name="star"></ion-icon>
            <span>${starsCount}</span>
          </span>
          <span class="gh-meta-item" title="Forks">
            <ion-icon name="git-branch"></ion-icon>
            <span>${forksCount}</span>
          </span>
        </div>
      </div>

      <div class="gh-card-footer">
        <div class="gh-card-actions">
          ${sourceBtn}
          ${demoBtn}
        </div>
        <p class="gh-card-updated">
          <ion-icon name="time-outline"></ion-icon>
          ${timeAgo(updatedDate)}
        </p>
      </div>
    </div>
  `;

  applyTiltEffect(li);
  return li;
}

/**
 * Filter & search handler
 */
function applyFiltersAndSearch() {
  const searchInput = document.getElementById("gh-search-input");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const filterKey = activeFilterKey.toLowerCase();
  const gridEl = document.getElementById("gh-project-grid");
  const emptyStateEl = document.getElementById("gh-empty-state");
  const visibleCountEl = document.getElementById("gh-visible-count");

  if (!gridEl) return;

  const cards = gridEl.querySelectorAll(".gh-card");
  let visibleCount = 0;

  cards.forEach((card, i) => {
    const cardLang = (card.dataset.language || "").toLowerCase();
    const cardCat = (card.dataset.category || "").toLowerCase();
    const cardVis = (card.dataset.visibility || "").toLowerCase();
    const isFeatured = card.dataset.featured === "true";
    const cardText = (card.textContent || "").toLowerCase();

    // Check filter match
    let matchesFilter = false;
    if (filterKey === "all") {
      matchesFilter = true;
    } else if (filterKey === "featured") {
      matchesFilter = isFeatured;
    } else if (filterKey === "public" || filterKey === "private") {
      matchesFilter = cardVis === filterKey;
    } else if (filterKey === "ai / ml" || filterKey === "ai/ml" || filterKey === "ai") {
      matchesFilter = cardCat.includes("ai") || cardCat.includes("ml") || cardCat.includes("data");
    } else if (filterKey === "full-stack") {
      matchesFilter = cardCat === "full-stack";
    } else if (filterKey === "web") {
      matchesFilter = cardCat === "web";
    } else if (filterKey === "automation") {
      matchesFilter = cardCat === "automation";
    } else {
      // Language match or general tag
      matchesFilter = cardLang === filterKey || cardText.includes(filterKey);
    }

    // Check search match
    const matchesSearch = !query || cardText.includes(query);

    if (matchesFilter && matchesSearch) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  if (visibleCountEl) visibleCountEl.textContent = visibleCount;
  if (emptyStateEl) emptyStateEl.style.display = visibleCount === 0 ? "" : "none";
}

/**
 * Build dynamic categorized filter buttons
 */
function buildFilterBar(projects) {
  const filterList = document.getElementById("gh-filter-list");
  if (!filterList) return;

  const publicCount = projects.filter(p => !p.isPrivate).length;
  const privateCount = projects.filter(p => p.isPrivate).length;
  const featuredCount = projects.filter(p => p.isFeatured).length;

  // Preset core categories
  const categories = [
    { label: `All (${projects.length})`, key: "all" },
    { label: `Featured (${featuredCount})`, key: "featured" },
    { label: `Public (${publicCount})`, key: "public" },
    { label: `Private (${privateCount})`, key: "private" },
    { label: "AI / ML", key: "ai / ml" },
    { label: "Full-Stack", key: "full-stack" },
    { label: "TypeScript", key: "typescript" },
    { label: "Python", key: "python" },
    { label: "JavaScript", key: "javascript" },
    { label: "Automation", key: "automation" },
    { label: "Web", key: "web" },
  ];

  filterList.innerHTML = "";

  categories.forEach(cat => {
    const li = document.createElement("li");
    li.className = "gh-filter-item";
    const isActive = cat.key === activeFilterKey ? "active" : "";
    li.innerHTML = `<button class="gh-filter-btn ${isActive}" data-filter="${cat.key}">${cat.label}</button>`;
    filterList.appendChild(li);
  });

  // Attach click listener to buttons
  const buttons = filterList.querySelectorAll(".gh-filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilterKey = btn.dataset.filter;
      applyFiltersAndSearch();
    });
  });
}

/**
 * Render all projects into grid
 */
function renderProjects(projects) {
  const gridEl = document.getElementById("gh-project-grid");
  const loadingEl = document.getElementById("gh-loading");
  const errorEl = document.getElementById("gh-error");

  if (!gridEl) return;

  if (loadingEl) loadingEl.style.display = "none";
  if (errorEl) errorEl.style.display = "none";
  gridEl.innerHTML = "";

  projects.forEach((p, idx) => {
    gridEl.appendChild(createProjectCard(p, idx));
  });

  gridEl.style.display = "";

  // Update counter badges
  const totalCountEl = document.getElementById("gh-total-count");
  const publicCountEl = document.getElementById("gh-public-count");
  const privateCountEl = document.getElementById("gh-private-count");
  const visibleCountEl = document.getElementById("gh-visible-count");

  const pubCount = projects.filter(p => !p.isPrivate).length;
  const privCount = projects.filter(p => p.isPrivate).length;

  if (totalCountEl) totalCountEl.textContent = projects.length;
  if (publicCountEl) publicCountEl.textContent = pubCount;
  if (privateCountEl) privateCountEl.textContent = privCount;
  if (visibleCountEl) visibleCountEl.textContent = projects.length;
}

/**
 * Background Live Sync with GitHub API
 * Safely enriches public repositories with live stars, forks, and push times
 */
async function syncWithGitHub() {
  const syncIcon = document.getElementById("gh-sync-icon");
  const syncStatus = document.getElementById("gh-sync-status");

  if (syncIcon) syncIcon.classList.add("spinning");
  if (syncStatus) syncStatus.textContent = "Syncing...";

  try {
    const res = await fetch(GH_API);
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const remoteRepos = await res.json();

    let updatedAny = false;
    const remoteMap = new Map();
    remoteRepos.forEach(r => remoteMap.set(r.name.toLowerCase(), r));

    masterProjectsList.forEach(p => {
      const match = remoteMap.get(p.name.toLowerCase());
      if (match) {
        if (p.stars !== match.stargazers_count || p.forks !== match.forks_count || p.pushedAt !== match.pushed_at) {
          p.stars = match.stargazers_count;
          p.forks = match.forks_count;
          p.pushedAt = match.pushed_at;
          updatedAny = true;
        }
      }
    });

    if (updatedAny) {
      renderProjects(masterProjectsList);
      applyFiltersAndSearch();
    }

    if (syncStatus) syncStatus.textContent = "GitHub Synced";
  } catch (err) {
    console.warn("GitHub API live sync notice:", err.message);
    if (syncStatus) syncStatus.textContent = "Catalog Synced";
  } finally {
    if (syncIcon) syncIcon.classList.remove("spinning");
  }
}

/**
 * Master Initialization
 */
function initProjectsEngine() {
  // Load master projects list from window.ALL_PROJECTS
  masterProjectsList = (window.ALL_PROJECTS && Array.isArray(window.ALL_PROJECTS))
    ? [...window.ALL_PROJECTS]
    : [];

  if (!masterProjectsList.length) {
    console.warn("No projects found in window.ALL_PROJECTS");
    return;
  }

  // Render cards immediately
  renderProjects(masterProjectsList);
  buildFilterBar(masterProjectsList);

  // Setup Search Input
  const searchInput = document.getElementById("gh-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", applyFiltersAndSearch);
  }

  // Setup Reset Button in Empty State
  const clearBtn = document.getElementById("gh-clear-search-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      activeFilterKey = "all";
      const filterBtns = document.querySelectorAll("#gh-filter-list .gh-filter-btn");
      filterBtns.forEach(b => {
        b.classList.toggle("active", b.dataset.filter === "all");
      });
      applyFiltersAndSearch();
    });
  }

  // Setup Retry / Sync button
  const retryBtn = document.getElementById("gh-retry-btn");
  if (retryBtn) {
    retryBtn.addEventListener("click", syncWithGitHub);
  }

  // Trigger background sync with GitHub API
  syncWithGitHub();
}

// Kick off projects engine when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectsEngine);
} else {
  initProjectsEngine();
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}


// Contact form elements
const form = document.querySelector("[data-form]");
const inputs = document.querySelectorAll("[data-form-input]");
const submitBtn = document.querySelector("[data-form-btn]");

// Enable button only when form is valid (with safety check)
if (form && submitBtn) {
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      submitBtn.disabled = !form.checkValidity();
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<ion-icon name="sync-outline" class="spin"></ion-icon> <span>Sending...</span>`;
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        submitBtn.innerHTML = `<ion-icon name="checkmark-circle-outline"></ion-icon> <span>Sent Successfully!</span>`;
        form.reset();
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = !form.checkValidity();
        }, 3000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      submitBtn.innerHTML = `<ion-icon name="close-circle-outline"></ion-icon> <span>Error, try again.</span>`;
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = !form.checkValidity();
      }, 3000);
    }
  });
}



// certificate preview modal
const certificateItems = document.querySelectorAll("[data-certificate-item]");
const certificateModal = document.querySelector("[data-certificate-modal]");
const certificateModalTitle = document.querySelector("[data-certificate-modal-title]");
const certificateModalProvider = document.querySelector("[data-certificate-modal-provider]");
const certificateModalFrame = document.querySelector("[data-certificate-modal-frame]");
const certificateOpenLink = document.querySelector("[data-certificate-open-link]");
const certificateModalCloseBtns = document.querySelectorAll("[data-certificate-modal-close]");

const closeCertificateModal = function () {
  if (!certificateModal) return;

  certificateModal.classList.remove("active");
  document.body.classList.remove("certificate-modal-open");

  if (certificateModalFrame) {
    certificateModalFrame.removeAttribute("src");
  }
}

if (certificateModal) {
  certificateItems.forEach(item => {
    item.addEventListener("click", event => {
      event.preventDefault();

      const certificateSrc = item.dataset.certificateSrc;
      const certificateTitle = item.dataset.certificateTitle;
      const certificateProvider = item.dataset.certificateProvider;

      certificateModalTitle.textContent = certificateTitle;
      certificateModalProvider.textContent = certificateProvider;
      certificateModalFrame.src = certificateSrc;
      certificateModalFrame.title = `${certificateTitle} PDF preview`;
      certificateOpenLink.href = certificateSrc;
      certificateOpenLink.setAttribute("aria-label", `Open ${certificateTitle} PDF in a new tab`);

      certificateModal.classList.add("active");
      document.body.classList.add("certificate-modal-open");
    });
  });

  certificateModalCloseBtns.forEach(button => {
    button.addEventListener("click", closeCertificateModal);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && certificateModal.classList.contains("active")) {
      closeCertificateModal();
    }
  });
}


// ──────────────────────────────────────────────
//  SCROLL REVEAL — IntersectionObserver
// ──────────────────────────────────────────────

(function initScrollReveal() {
  // Auto-tag elements that should reveal on scroll
  const revealSelectors = [
    '.about-text',
    '.service',
    '.service-item',
    '.testimonials',
    '.testimonials-item',
    '.timeline',
    '.skill',
    '.skills-list',
    '.blog-posts',
    '.blog-post-item',
    '.contact-form',
    '.mapbox',
    '#github-projects-section',
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        // Stagger siblings
        if (i > 0 && i <= 5) {
          el.classList.add(`reveal-delay-${i}`);
        }
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


// ──────────────────────────────────────────────
//  TYPING ANIMATION
// ──────────────────────────────────────────────

(function initTypingAnimation() {
  const el = document.getElementById('typed-role');
  if (!el) return;

  const roles = [
    'Software Developer',
    'Full Stack Developer',
    'Java Developer',
    'Web Developer',
    'Problem Solver',
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 45;
  const pauseEnd = 2000;
  const pauseStart = 500;

  // Add cursor
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  cursor.textContent = '|';
  el.parentNode.insertBefore(cursor, el.nextSibling);

  function tick() {
    const current = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      el.textContent = current.substring(0, charIdx);
    } else {
      charIdx++;
      el.textContent = current.substring(0, charIdx);
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === current.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = pauseStart;
    }

    setTimeout(tick, delay);
  }

  // Start after a brief delay
  setTimeout(tick, 1200);
})();


// ──────────────────────────────────────────────
//  ANIMATED SKILL BARS
// ──────────────────────────────────────────────

(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-progress-fill');
  if (!fills.length) return;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger the animation
                const items = entry.target.querySelectorAll('.skill-progress-fill');

        items.forEach((fill, i) => {
          setTimeout(() => {
            fill.classList.add('animated');
          }, i * 100);
        });

        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Observe the skills container
  const skillSection = document.querySelector('.skill');
  if (skillSection) {
    skillObserver.observe(skillSection);
  }
})();


// ──────────────────────────────────────────────
//  SCROLL-TO-TOP BUTTON
// ──────────────────────────────────────────────

(function initScrollTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ──────────────────────────────────────────────
//  LIGHT / DARK MODE TOGGLE
// ──────────────────────────────────────────────

(function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  if (!themeBtn || !themeIcon) return;

  // Check system preference or localStorage
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.setAttribute('name', 'moon-outline');
  }

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    let theme = 'dark';
    if (document.body.classList.contains('light-theme')) {
      theme = 'light';
      themeIcon.setAttribute('name', 'moon-outline');
    } else {
      themeIcon.setAttribute('name', 'sunny-outline');
    }
    localStorage.setItem('theme', theme);
  });
})();

// ──────────────────────────────────────────────
//  SCROLL ANIMATIONS (Fade In)
// ──────────────────────────────────────────────

(function initScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll('.service-item, .testimonials-item, .timeline-item, .project-item, .blog-post-item');
  
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elementsToAnimate.forEach(el => {
    el.classList.add('hidden-fade');
    scrollObserver.observe(el);
  });
})();

