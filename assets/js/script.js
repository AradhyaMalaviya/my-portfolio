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
  "fitbox":                         "./assets/images/projects/fitbox.png",
  "heart_diseases-_predictions-":   "./assets/images/projects/heart-diseases-predictions.png",
  "email-automation-tool":          "./assets/images/projects/email-automation-tool.png",
  "rackandroll-cafe":               "./assets/images/projects/rackandroll-cafe.png",
  "thebadgercompany":               "./assets/images/projects/thebadgercompany.png",
};

/**
 * Build a single project-card <li> element
 */
function createProjectCard(repo, index) {
  const li = document.createElement("li");
  li.className = "gh-card premium-card";
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

  const color1 = hashColor(repo.name, 1);
  const color2 = hashColor(repo.name, 2);

  // Determine preview image
  const repoKey = repo.name.toLowerCase();
  const previewImg = PROJECT_PREVIEWS[repoKey] || null;
  const hasHomepage = homepage && homepage.trim();

  // Build the banner content
  let bannerContent;
  if (previewImg) {
    // Show real project preview image
    const bannerInner = `
       <div class="gh-card-banner-overlay gh-card-banner-overlay--subtle"></div>
       <img class="gh-card-preview-img" src="${previewImg}" alt="Preview of ${formatRepoName(repo.name)}" loading="lazy" />
       <div class="gh-card-preview-hover">
         <ion-icon name="${hasHomepage ? 'open-outline' : 'eye-outline'}"></ion-icon>
         <span>${hasHomepage ? 'View Live' : 'View Project'}</span>
       </div>
    `;

    if (hasHomepage) {
      bannerContent = `<a href="${homepage}" target="_blank" rel="noopener noreferrer" class="gh-card-banner gh-card-banner--preview" style="background: linear-gradient(135deg, ${color1}, ${color2});" aria-label="Open ${formatRepoName(repo.name)} live demo">
        ${bannerInner}
      </a>`;
    } else {
      bannerContent = `<a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="gh-card-banner gh-card-banner--preview" style="background: linear-gradient(135deg, ${color1}, ${color2});" aria-label="View ${formatRepoName(repo.name)} source code">
        ${bannerInner}
      </a>`;
    }
  } else {
    // Fallback: use a generated SVG-style icon for repos without preview images
    if (hasHomepage) {
      bannerContent = `<a href="${homepage}" target="_blank" rel="noopener noreferrer" class="gh-card-banner gh-card-banner--fallback" style="background: linear-gradient(135deg, ${color1}, ${color2});" aria-label="Open ${formatRepoName(repo.name)} live demo">
        <div class="gh-card-banner-overlay"></div>
        <div class="gh-card-icon-large">
          <ion-icon name="code-slash-outline"></ion-icon>
        </div>
        <div class="gh-card-preview-hover">
          <ion-icon name="open-outline"></ion-icon>
          <span>View Live</span>
        </div>
      </a>`;
    } else {
      bannerContent = `<div class="gh-card-banner gh-card-banner--fallback" style="background: linear-gradient(135deg, ${color1}, ${color2});">
        <div class="gh-card-banner-overlay"></div>
        <div class="gh-card-icon-large">
          <ion-icon name="code-slash-outline"></ion-icon>
        </div>
      </div>`;
    }
  }

  li.innerHTML = `
    <div class="gh-card-glare"></div>
    ${bannerContent}
    <div class="gh-card-content">
      <div class="gh-card-header">
        <div class="gh-card-title-row">
          <h3 class="gh-card-name">${formatRepoName(repo.name)}</h3>
        </div>
        ${forkBadge}
      </div>

      <div class="gh-card-body">
        <p class="${descClass}">${description}</p>

        <div class="gh-card-meta">
          ${repo.language ? `<span class="gh-meta-item">
            <span class="gh-lang-dot" style="--lang-color:${langColor}; box-shadow: 0 0 8px ${langColor}"></span>
            <span>${repo.language}</span>
          </span>` : ""}
          <span class="gh-meta-item">
            <ion-icon name="star"></ion-icon>
            <span>${repo.stargazers_count}</span>
          </span>
          <span class="gh-meta-item">
            <ion-icon name="git-branch"></ion-icon>
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
    </div>
  `;
  
  applyTiltEffect(li);
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
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
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

