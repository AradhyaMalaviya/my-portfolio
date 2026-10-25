'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    const isExpanded = sidebar.classList.toggle("active");
    const span = sidebarBtn.querySelector("span");
    if (span) {
      span.textContent = isExpanded ? "Hide Contacts" : "Show Contacts";
    }
    sidebarBtn.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  });
}



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
  if (!modalContainer || !overlay) return;
  const isActive = modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("modal-open", isActive);
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
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// close testimonials modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalContainer && modalContainer.classList.contains("active")) {
    testimonialsModalFunc();
  }
});



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
  "Jupyter Notebook": "#DA5B0B",
  Markdown:    "#083fa1",
  Svelte:      "#ff3e00",
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
 * Generate rich, instant SVG developer preview mockup for projects
 * Ensures 100% zero-blank, zero-delay rendering with beautiful IDE/terminal/wireframe visuals
 */
function createProjectMockupSvg(project, color1, color2, uid) {
  const cat = (project.category || "Full-Stack").toLowerCase();
  const lang = project.language || "TypeScript";
  const name = project.name || "project";
  const safeName = (project.displayName || formatRepoName(name)).replace(/[<>&"]/g, "");
  const gradId = `g_${uid}`;
  const patId = `p_${uid}`;

  let interior = "";

  if (cat.includes("ai") || cat.includes("ml") || cat.includes("data")) {
    interior = `
      <g opacity="0.9" font-family="'Fira Code', 'JetBrains Mono', Consolas, monospace" font-size="10">
        <text x="36" y="68" fill="#f07178">import <tspan fill="#82aaff">torch.nn</tspan> as <tspan fill="#ffcb6b">nn</tspan></text>
        <text x="36" y="86" fill="#c792ea">class <tspan fill="#ffcb6b">NeuralModel</tspan>(nn.Module):</text>
        <text x="48" y="104" fill="#89ddff">def <tspan fill="#82aaff">forward</tspan>(self, x):</text>
        <text x="60" y="122" fill="#c3e88d">return <tspan fill="#f78c6c">softmax</tspan>(out)</text>
      </g>
      <rect x="228" y="54" width="138" height="88" rx="8" fill="#181822" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <circle cx="242" cy="70" r="4" fill="#27c93f"/>
      <text x="252" y="74" fill="#a0a0c0" font-family="system-ui, sans-serif" font-size="9" font-weight="600">MODEL METRICS</text>
      <rect x="242" y="112" width="12" height="18" rx="2" fill="${color1}" opacity="0.5"/>
      <rect x="258" y="104" width="12" height="26" rx="2" fill="${color1}" opacity="0.7"/>
      <rect x="274" y="96" width="12" height="34" rx="2" fill="${color1}" opacity="0.9"/>
      <rect x="290" y="86" width="12" height="44" rx="2" fill="${color2}"/>
      <text x="312" y="102" fill="#27c93f" font-family="monospace" font-size="11" font-weight="700">98.8%</text>
      <text x="312" y="118" fill="#707090" font-family="system-ui, sans-serif" font-size="8.5">ACCURACY</text>
    `;
  } else if (cat.includes("automation")) {
    interior = `
      <g opacity="0.95" font-family="'Fira Code', 'JetBrains Mono', Consolas, monospace" font-size="9.5">
        <text x="36" y="68" fill="#89ddff">➜ <tspan fill="#c3e88d">~/automation</tspan> <tspan fill="#ffffff">$ run-pipeline</tspan></text>
        <text x="36" y="88" fill="#82aaff">[✓] <tspan fill="#d0d0e0">Workers spawned:</tspan> <tspan fill="#ffcb6b">8 active</tspan></text>
        <text x="36" y="108" fill="#27c93f">[✓] <tspan fill="#d0d0e0">Tasks synced:</tspan> <tspan fill="#82aaff">100% complete</tspan></text>
        <text x="36" y="128" fill="#f78c6c">↳ Status: <tspan fill="#27c93f">HEALTHY (0.24s)</tspan> <tspan fill="#ffffff" opacity="0.8">▋</tspan></text>
      </g>
    `;
  } else if (cat.includes("mobile")) {
    interior = `
      <rect x="145" y="48" width="110" height="106" rx="12" fill="#161620" stroke="rgba(255,255,255,0.15)" stroke-width="1.2"/>
      <rect x="180" y="52" width="40" height="4" rx="2" fill="#303040"/>
      <rect x="155" y="64" width="90" height="28" rx="6" fill="${color1}" fill-opacity="0.25" stroke="rgba(255,255,255,0.06)"/>
      <rect x="160" y="70" width="45" height="5" rx="2.5" fill="#ffffff" opacity="0.8"/>
      <rect x="160" y="78" width="65" height="4" rx="2" fill="#ffffff" opacity="0.4"/>
      <rect x="155" y="98" width="42" height="22" rx="4" fill="rgba(255,255,255,0.06)"/>
      <rect x="203" y="98" width="42" height="22" rx="4" fill="rgba(255,255,255,0.06)"/>
      <rect x="155" y="126" width="90" height="18" rx="6" fill="${color2}" fill-opacity="0.85"/>
      <text x="200" y="138" fill="#ffffff" font-family="system-ui, sans-serif" font-size="8" font-weight="700" text-anchor="middle">LAUNCH APP</text>
    `;
  } else {
    interior = `
      <rect x="34" y="56" width="34" height="92" rx="6" fill="#161622" stroke="rgba(255,255,255,0.08)"/>
      <circle cx="51" cy="70" r="4.5" fill="${color1}"/>
      <rect x="42" y="84" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.3)"/>
      <rect x="42" y="94" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.3)"/>
      <rect x="42" y="104" width="18" height="3" rx="1.5" fill="rgba(255,255,255,0.3)"/>
      <rect x="76" y="56" width="290" height="92" rx="6" fill="#161622" stroke="rgba(255,255,255,0.08)"/>
      <rect x="88" y="66" width="100" height="6" rx="3" fill="#ffffff" opacity="0.7"/>
      <rect x="296" y="66" width="56" height="14" rx="4" fill="${color2}" fill-opacity="0.3" stroke="${color2}" stroke-width="0.8"/>
      <text x="324" y="76" fill="#ffffff" font-family="system-ui, sans-serif" font-size="8" font-weight="600" text-anchor="middle">ONLINE</text>
      <rect x="88" y="86" width="80" height="52" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)"/>
      <rect x="96" y="94" width="40" height="4" rx="2" fill="${color1}"/>
      <rect x="96" y="104" width="55" height="12" rx="2" fill="rgba(255,255,255,0.05)"/>
      <text x="96" y="128" fill="#27c93f" font-family="monospace" font-size="8">✓ 99.9% Up</text>
      <rect x="176" y="86" width="84" height="52" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)"/>
      <rect x="184" y="94" width="40" height="4" rx="2" fill="${color2}"/>
      <path d="M 186 126 Q 200 110, 214 118 T 248 106" fill="none" stroke="${color1}" stroke-width="1.8" stroke-linecap="round"/>
      <rect x="268" y="86" width="88" height="52" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)"/>
      <rect x="276" y="94" width="50" height="4" rx="2" fill="#ffcb6b"/>
      <text x="276" y="112" fill="#ffffff" font-family="monospace" font-size="9" font-weight="700">REST API</text>
      <text x="276" y="126" fill="#a0a0b0" font-family="monospace" font-size="8">200 OK</text>
    `;
  }

  return `
    <svg viewBox="0 0 400 180" width="100%" height="180" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="gh-card-svg-mockup">
      <defs>
        <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}" stop-opacity="0.32"/>
          <stop offset="50%" stop-color="#14141c" stop-opacity="0.85"/>
          <stop offset="100%" stop-color="${color2}" stop-opacity="0.28"/>
        </linearGradient>
        <pattern id="${patId}" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" fill="#ffffff" fill-opacity="0.08"/>
        </pattern>
      </defs>
      <rect width="400" height="180" fill="#121218"/>
      <rect width="400" height="180" fill="url(#${gradId})"/>
      <rect width="400" height="180" fill="url(#${patId})"/>
      <rect x="20" y="14" width="360" height="152" rx="10" fill="#161620" fill-opacity="0.88" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <circle cx="36" cy="30" r="4" fill="#ff5f56"/>
      <circle cx="48" cy="30" r="4" fill="#ffbd2e"/>
      <circle cx="60" cy="30" r="4" fill="#27c93f"/>
      <rect x="120" y="20" width="160" height="20" rx="5" fill="rgba(255,255,255,0.05)"/>
      <text x="200" y="34" text-anchor="middle" fill="#c0c0d8" font-family="'Fira Code', 'JetBrains Mono', Consolas, monospace" font-size="10" font-weight="600">${safeName.length > 22 ? safeName.substring(0, 20) + '...' : safeName}</text>
      <rect x="306" y="22" width="62" height="16" rx="4" fill="${color1}" fill-opacity="0.25"/>
      <text x="337" y="33" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="8.5" font-weight="700">${lang}</text>
      <line x1="20" y1="44" x2="380" y2="44" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      ${interior}
    </svg>
  `;
}

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
  // Zero-delay display for immediate rendering when clicking projects
  li.style.animationDelay = "0s";

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

  // Build high-reliability banner content with zero chance of blank state
  const mockupSvg = createProjectMockupSvg(project, color1, color2, index);
  const bannerTarget = hasLive ? liveUrl : repoUrl;
  const hoverText = hasLive ? 'View Live' : (project.isPrivate ? 'Private Repo' : 'View Project');
  const hoverIcon = hasLive ? 'open-outline' : (project.isPrivate ? 'lock-closed-outline' : 'eye-outline');

  let bannerContent;
  if (previewImg) {
    bannerContent = `
      <a href="${bannerTarget}" target="_blank" rel="noopener noreferrer" class="gh-card-banner gh-card-banner--preview" style="background: linear-gradient(135deg, ${color1}, ${color2});" aria-label="Open ${displayName}">
        <div class="gh-mockup-fallback">${mockupSvg}</div>
        <img class="gh-card-preview-img" src="${previewImg}" alt="Preview of ${displayName}" loading="${index < 6 ? 'eager' : 'lazy'}" onerror="this.style.display='none';" onload="this.classList.add('img-loaded');" />
        <div class="gh-card-banner-overlay gh-card-banner-overlay--subtle"></div>
        <div class="gh-card-preview-hover">
          <ion-icon name="${hoverIcon}"></ion-icon>
          <span>${hoverText}</span>
        </div>
      </a>
    `;
  } else {
    bannerContent = `
      <a href="${bannerTarget}" target="_blank" rel="noopener noreferrer" class="gh-card-banner gh-card-banner--mockup" style="background: linear-gradient(135deg, ${color1}, ${color2});" aria-label="Open ${displayName}">
        <div class="gh-mockup-fallback">${mockupSvg}</div>
        <div class="gh-card-banner-overlay gh-card-banner-overlay--subtle"></div>
        <div class="gh-card-preview-hover">
          <ion-icon name="${hoverIcon}"></ion-icon>
          <span>${hoverText}</span>
        </div>
      </a>
    `;
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

// ──────────────────────────────────────────────
//  NORMALIZED FILTER FUNCTION & TYPO SAFEGUARDS
// ──────────────────────────────────────────────

const filterBtn = document.querySelectorAll("[data-filter-btn]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value], [data-select-value]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  if (!selectedValue) return;
  const normalizedTarget = selectedValue.trim().toLowerCase();

  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = (filterItems[i].dataset.category || "").trim().toLowerCase();

    if (normalizedTarget === "all" || normalizedTarget === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

/**
 * Filter & search handler
 */
function applyFiltersAndSearch() {
  const searchInput = document.getElementById("gh-search-input");
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const filterKey = (activeFilterKey || "all").trim().toLowerCase();
  const gridEl = document.getElementById("gh-project-grid");
  const emptyStateEl = document.getElementById("gh-empty-state");
  const visibleCountEl = document.getElementById("gh-visible-count");

  if (!gridEl) return;

  const cards = gridEl.querySelectorAll(".gh-card");
  let visibleCount = 0;

  cards.forEach((card, i) => {
    const cardLang = (card.dataset.language || "").trim().toLowerCase();
    const cardCat = (card.dataset.category || "").trim().toLowerCase();
    const cardVis = (card.dataset.visibility || "").trim().toLowerCase();
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
    } else if (filterKey === "web" || filterKey === "web development") {
      matchesFilter = cardCat === "web" || cardCat.includes("web");
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
 * Update card stats directly in the existing DOM without clearing innerHTML
 */
function updateCardStatsInDOM(repoName, stars, forks, pushedAt) {
  const card = document.querySelector(`.gh-card[data-name="${repoName.toLowerCase()}"]`);
  if (!card) return;

  const starsEl = card.querySelector('[title="Stars"] span');
  if (starsEl) starsEl.textContent = stars;

  const forksEl = card.querySelector('[title="Forks"] span');
  if (forksEl) forksEl.textContent = forks;

  const updatedEl = card.querySelector('.gh-card-updated');
  if (updatedEl && pushedAt) {
    updatedEl.innerHTML = `<ion-icon name="time-outline"></ion-icon> ${timeAgo(pushedAt)}`;
  }
}

/**
 * Background Live Sync with GitHub API
 * Safely enriches public repositories with live stars, forks, and push times
 * Updates the DOM in-place to avoid flickering or blank states
 */
async function syncWithGitHub() {
  const syncIcon = document.getElementById("gh-sync-icon");
  const syncStatus = document.getElementById("gh-sync-status");

  if (syncIcon) syncIcon.classList.add("gh-sync-icon", "spinning");
  if (syncStatus) syncStatus.textContent = "Syncing...";

  try {
    const res = await fetch(GH_API);
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const remoteRepos = await res.json();

    const remoteMap = new Map();
    remoteRepos.forEach(r => remoteMap.set(r.name.toLowerCase(), r));

    masterProjectsList.forEach(p => {
      const match = remoteMap.get(p.name.toLowerCase());
      if (match) {
        if (p.stars !== match.stargazers_count || p.forks !== match.forks_count || p.pushedAt !== match.pushed_at) {
          p.stars = match.stargazers_count;
          p.forks = match.forks_count;
          p.pushedAt = match.pushed_at;
          updateCardStatsInDOM(p.name, p.stars, p.forks, p.pushedAt);
        }
      }
    });

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
let projectsEngineInitialized = false;

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

  if (projectsEngineInitialized) return;
  projectsEngineInitialized = true;

  // Setup Search Input
  const searchInput = document.getElementById("gh-search-input");
  if (searchInput) {
    searchInput.placeholder = `Search ${masterProjectsList.length}+ projects by name, technology (Python, React, FastAPI...), or keyword...`;
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


// ──────────────────────────────────────────────
//  PAGE NAVIGATION & HASH ROUTING
// ──────────────────────────────────────────────

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

function navigateToPage(targetPage, updateHash = true) {
  if (!targetPage) return;
  const pageName = targetPage.trim().toLowerCase().replace(/^#/, "");
  let found = false;

  for (let j = 0; j < pages.length; j++) {
    const pageKey = pages[j].dataset.page ? pages[j].dataset.page.trim().toLowerCase() : "";

    if (pageName === pageKey) {
      found = true;
      pages[j].classList.add("active");
      window.scrollTo(0, 0);

      // Immediately reveal all scroll-reveal / hidden-fade items in the active page
      pages[j].querySelectorAll('.reveal').forEach(el => el.classList.add('revealed'));
      pages[j].querySelectorAll('.hidden-fade').forEach(el => el.classList.add('fade-in'));

      // If target is projects, guarantee zero delay and ensure cards are displayed
      if (pageKey === "projects") {
        const ghSection = document.getElementById("github-projects-section");
        if (ghSection) {
          ghSection.classList.remove("reveal");
          ghSection.classList.add("revealed");
        }
        const gridEl = document.getElementById("gh-project-grid");
        if (gridEl && gridEl.children.length === 0 && masterProjectsList.length > 0) {
          renderProjects(masterProjectsList);
        }
      }
    } else {
      pages[j].classList.remove("active");
    }
  }

  // Update navigation button active state
  navigationLinks.forEach(link => {
    const linkText = link.textContent.trim().toLowerCase();
    if (linkText === pageName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if (found && updateHash && window.history && window.history.replaceState) {
    window.history.replaceState(null, "", `#${pageName}`);
  }
}

// Add event listeners to all nav links
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const targetPage = this.textContent.trim().toLowerCase();
    navigateToPage(targetPage, true);
  });
});

// Deep linking on load and hashchange
function handleHashRoute() {
  const hash = window.location.hash.replace(/^#/, "").trim().toLowerCase();
  if (hash) {
    navigateToPage(hash, false);
  }
}

window.addEventListener("hashchange", handleHashRoute);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", handleHashRoute);
} else {
  handleHashRoute();
}


// ──────────────────────────────────────────────
//  CONTACT FORM VALIDATION & RESILIENT FORMSUBMIT AJAX HANDLER
// ──────────────────────────────────────────────

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;

    const originalBtnHTML = formBtn.innerHTML;
    formBtn.setAttribute("disabled", "");
    formBtn.innerHTML = `<ion-icon name="sync-outline" class="spin"></ion-icon> <span>Sending...</span>`;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        form.action || "https://formsubmit.co/ajax/d2287a3bf0c44c8bb31035518ab9f74e",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok && (result.success === "true" || result.success === true)) {
        form.reset();
        formBtn.innerHTML = `<ion-icon name="checkmark-circle-outline"></ion-icon> <span>Message Sent ✓</span>`;
        if (typeof window.gtag === "function") {
          window.gtag("event", "contact_form_submit", { status: "success" });
        }
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Contact Form Error:", error);
      formBtn.innerHTML = `<ion-icon name="alert-circle-outline"></ion-icon> <span>Error — Try Direct Email</span>`;
      // Graceful fallback to mail client
      const nameVal = form.querySelector('[name="name"]')?.value || '';
      const emailVal = form.querySelector('[name="email"]')?.value || '';
      const messageVal = form.querySelector('[name="message"]')?.value || '';
      if (nameVal || messageVal) {
        const mailtoUrl = `mailto:aaradhya.malaviya2005@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + nameVal)}&body=${encodeURIComponent('From: ' + nameVal + ' (' + emailVal + ')\n\n' + messageVal)}`;
        window.location.href = mailtoUrl;
      }
    } finally {
      setTimeout(() => {
        formBtn.innerHTML = originalBtnHTML;
        if (!form.checkValidity()) {
          formBtn.setAttribute("disabled", "");
        } else {
          formBtn.removeAttribute("disabled");
        }
      }, 3500);
    }
  });
}


// ──────────────────────────────────────────────
//  CERTIFICATE PREVIEW MODAL
// ──────────────────────────────────────────────

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
      const isPdf = certificateSrc.toLowerCase().endsWith(".pdf");

      certificateModalTitle.textContent = certificateTitle;
      certificateModalProvider.textContent = certificateProvider;
      certificateModalFrame.src = certificateSrc;
      certificateModalFrame.title = `${certificateTitle} ${isPdf ? 'PDF' : 'Certificate'} preview`;
      certificateOpenLink.href = certificateSrc;
      certificateOpenLink.textContent = isPdf ? "Open PDF" : "Open Certificate";
      certificateOpenLink.setAttribute("aria-label", `Open ${certificateTitle} ${isPdf ? 'PDF' : 'Certificate'} in a new tab`);

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
    'Full-Stack & AI/ML Engineer',
    'Data Science Intern @ Amdox',
    'Machine Learning Engineer',
    'Full-Stack Developer',
    'Python & MLOps Specialist',
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

