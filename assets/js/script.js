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



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

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
 * Build a single project-card <li> element
 */
function createProjectCard(repo, index) {
  const li = document.createElement("li");
  li.className = "gh-card";
  li.dataset.language = (repo.language || "Other").toLowerCase();
  li.style.animationDelay = `${index * 0.06}s`;

  const langColor = LANG_COLORS[repo.language] || "#8b949e";
  const hasDesc = repo.description && repo.description.trim();
  const description = hasDesc ? repo.description : "No description provided.";
  const descClass = hasDesc ? "gh-card-desc" : "gh-card-desc empty";
  const homepage = repo.homepage;

  let forkBadge = "";
  if (repo.fork) {
    forkBadge = `<span class="gh-card-fork-badge"><ion-icon name="git-branch-outline"></ion-icon> Forked</span>`;
  }

  let demoBtn = "";
  if (homepage && homepage.trim()) {
    demoBtn = `<a href="${homepage}" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-primary">
      <ion-icon name="open-outline"></ion-icon>
      <span>Live Demo</span>
    </a>`;
  }

  li.innerHTML = `
    <div class="gh-card-header">
      <div class="gh-card-title-row">
        <div class="gh-card-icon">
          <ion-icon name="code-slash-outline"></ion-icon>
        </div>
        <h3 class="gh-card-name">${formatRepoName(repo.name)}</h3>
      </div>
      ${forkBadge}
    </div>

    <div class="gh-card-body">
      <p class="${descClass}">${description}</p>

      <div class="gh-card-meta">
        ${repo.language ? `<span class="gh-meta-item">
          <span class="gh-lang-dot" style="--lang-color:${langColor}"></span>
          <span>${repo.language}</span>
        </span>` : ""}
        <span class="gh-meta-item">
          <ion-icon name="star-outline"></ion-icon>
          <span>${repo.stargazers_count}</span>
        </span>
        <span class="gh-meta-item">
          <ion-icon name="git-branch-outline"></ion-icon>
          <span>${repo.forks_count}</span>
        </span>
      </div>
    </div>

    <div class="gh-card-footer">
      <div class="gh-card-actions">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="gh-btn gh-btn-secondary">
          <ion-icon name="logo-github"></ion-icon>
          <span>Source</span>
        </a>
        ${demoBtn}
      </div>
      <p class="gh-card-updated">
        <ion-icon name="time-outline"></ion-icon>
        ${timeAgo(repo.pushed_at)}
      </p>
    </div>
  `;
  return li;
}

/**
 * Build language filter buttons from repo data
 */
function buildFilterBar(repos) {
  const filterList = document.getElementById("gh-filter-list");
  if (!filterList) return;

  const languages = new Set();
  repos.forEach(r => { if (r.language) languages.add(r.language); });

  // Clear existing (except "All")
  filterList.innerHTML = `
    <li class="gh-filter-item">
      <button class="gh-filter-btn active" data-lang="all">All</button>
    </li>
  `;

  Array.from(languages).sort().forEach(lang => {
    const li = document.createElement("li");
    li.className = "gh-filter-item";
    li.innerHTML = `<button class="gh-filter-btn" data-lang="${lang.toLowerCase()}">${lang}</button>`;
    filterList.appendChild(li);
  });

  // Attach filter events
  const buttons = filterList.querySelectorAll(".gh-filter-btn");
  let activeBtn = buttons[0];

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      activeBtn.classList.remove("active");
      btn.classList.add("active");
      activeBtn = btn;

      const lang = btn.dataset.lang;
      const cards = document.querySelectorAll("#gh-project-grid .gh-card");

      cards.forEach((card, i) => {
        if (lang === "all" || card.dataset.language === lang) {
          card.style.display = "";
          card.style.animation = "none";
          // Force reflow to restart animation
          card.offsetHeight;
          card.style.animation = `cardFadeIn 0.4s ease both`;
          card.style.animationDelay = `${i * 0.04}s`;
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/**
 * Main fetch & render
 */
async function loadGitHubProjects() {
  const loadingEl = document.getElementById("gh-loading");
  const errorEl   = document.getElementById("gh-error");
  const gridEl    = document.getElementById("gh-project-grid");

  if (!loadingEl || !errorEl || !gridEl) return;

  loadingEl.style.display = "";
  errorEl.style.display   = "none";
  gridEl.style.display    = "none";
  gridEl.innerHTML        = "";

  try {
    const res = await fetch(GH_API);
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const repos = await res.json();

    // Sort: most recently pushed first
    repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    // Render cards
    repos.forEach((repo, i) => {
      gridEl.appendChild(createProjectCard(repo, i));
    });

    // Build filter bar
    buildFilterBar(repos);

    // Show grid
    loadingEl.style.display = "none";
    gridEl.style.display    = "";

  } catch (err) {
    console.error("Failed to load GitHub projects:", err);
    loadingEl.style.display = "none";
    errorEl.style.display   = "";
  }
}

// Retry button
const retryBtn = document.getElementById("gh-retry-btn");
if (retryBtn) {
  retryBtn.addEventListener("click", loadGitHubProjects);
}

// Kick off on page load
loadGitHubProjects();


// contact form variables
// const form = document.querySelector("[data-form]");
// const formInputs = document.querySelectorAll("[data-form-input]");
// const formBtn = document.querySelector("[data-form-btn]");

// // add event to all form input field
// for (let i = 0; i < formInputs.length; i++) {
//   formInputs[i].addEventListener("input", function () {

//     // check form validation
//     if (form.checkValidity()) {
//       formBtn.removeAttribute("disabled");
//     } else {
//       formBtn.setAttribute("disabled", "");
//     }

//   });
// }



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Contact form elements
const form = document.querySelector("[data-form]");
const inputs = document.querySelectorAll("[data-form-input]");
const submitBtn = document.querySelector("[data-form-btn]");

// Enable button only when form is valid
inputs.forEach(input => {
  input.addEventListener("input", () => {
    submitBtn.disabled = !form.checkValidity();
  });
});



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
        const items = entry.target.querySelectorAll
          ? document.querySelectorAll('.skill-progress-fill')
          : [entry.target];

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
