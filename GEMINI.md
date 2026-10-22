# Personal Portfolio Website - Project Context

## Project Overview
This repository contains the Personal Portfolio Website for Aaradhya Malaviya. It is a static, highly interactive, and fully responsive front-end web application designed to showcase the developer's skills, projects, certifications, and career objectives. It acts as a comprehensive digital resume with a premium, modern aesthetic.

### Main Technologies
*   **HTML5:** Semantic markup structure in a Single Page Application (SPA) style layout.
*   **CSS3 (Vanilla):** Extensive use of custom CSS variables for theming, complex gradients, glassmorphism (`backdrop-filter`), responsive design, and premium UI animations (floating background orbs, avatar gradient ring, scroll reveals).
*   **JavaScript (Vanilla ES6):** Handles all UI logic, including:
    *   **Master Projects Engine & GitHub Sync:** Implements a dual-layer data architecture with `projects-data.js` (complete catalog of all 35 repositories, including 18 public and 17 private repos) and background GitHub API synchronization (`syncWithGitHub`). Supports real-time text search and category filtering (`All (35)`, `Featured`, `Public`, `Private`, `AI / ML`, `Full-Stack`, `TypeScript`, `Python`, etc.).
    *   **Project Preview System:** Maps repo names to preview images in `assets/images/projects/` via `PROJECT_PREVIEWS` and `projects-data.js`. Cards display interactive badges (`Public`, `Private`, `Featured`, `Forked`), tech pills, live deployment buttons, and protected access indicators for private repositories.
    *   **Interactivity:** 3D tilt effects on cards, typing animations for roles, and staggered scroll reveals.
    *   **Modals:** Custom modal systems for testimonials and certification previews (PDF/Image support).
*   **AI/ML Stack (Project Focus):** Projects leverage Python, FastAPI, PyTorch, Scikit-learn, OpenCV, and EasyOCR.
*   **FormSubmit:** Process contact form submissions with AJAX, providing real-time feedback (Loading/Success/Error).
*   **Ionicons:** Icon library integrated via CDN.

## Project Architecture & Directory Structure
*   `index.html`: The core HTML file containing the entire single-page structure.
*   `404.html`: A stylized custom error page matching the main theme.
*   `PRD.md`: Master technical specification (Version 5.1 / 2.1.0 - Cloudflare Pages Production Release).
*   `indeed-application-queue.md`: Tracking document for job applications, candidate positioning, and screening answers.
*   `assets/css/style.css`: The central stylesheet (~3600 lines). Contains:
    *   **CSS Variables:** Robust set for theming and design tokens.
    *   **Project Controls & Badges:** Live search, filter tabs, stats bar, visibility badges, tech tags.
    *   **Premium Card Styles:** 3D tilt, hover overlays, glassmorphism chips.
    *   **Animations:** Floating background orbs, avatar gradient ring rotation, and `.reveal` state transitions.
    *   **Themes:** Specific overrides for `.light-theme`.
*   `assets/js/projects-data.js`: Master project catalog containing metadata, descriptions, tech stacks, and links for all 35 repositories (public and private).
*   `assets/js/script.js`: The central logic file, organized into modules:
    *   `PROJECT_PREVIEWS`: Dictionary mapping repo names (lowercase) to preview image paths in `assets/images/projects/`.
    *   `createProjectCard`: Generates project cards with preview images, clickable banners, 3D tilt, visibility badges, and tech pills.
    *   `applyFiltersAndSearch`: Real-time fuzzy/keyword search and categorized filtering across all projects.
    *   `syncWithGitHub`: Asynchronous background synchronization with GitHub API for real-time stars, forks, and push timestamps.
    *   `initThemeToggle`: Manages light/dark mode with local storage persistence.
    *   `initScrollReveal`: Uses `IntersectionObserver` for automated fade-in animations.
    *   `initTypingAnimation`: Animates the developer roles in the header/sidebar.
    *   `initCertificateModal`: Specific modal logic for certification previews.
    *   `initSkillAnimation`: Triggers progress bar animations when in view.
*   `assets/images/`: Contains static images, SVGs, and avatars.
    *   `assets/images/certificates/`: SVG previews for certificates.
    *   `assets/images/projects/`: PNG preview images for project cards.
    *   `assets/images/readme/`: Real screenshots captured from the live portfolio for documentation.
*   `assets/certificates/`: Source PDF or JPG versions of acquired certificates.
*   `resume file/`: Houses the downloadable resume documents.

## Building and Running
The project is a vanilla static site. No heavy build step is required for development or production.

**To run locally:**
Use the npm script or standard local HTTP server in the repository directory:
*   `npm start` (Runs `python -m http.server 3000`)
*   `npx serve` or `npx http-server`
*   Python: `python -m http.server 3000`
*   VS Code: "Live Server" extension.

**To deploy:**
*   **Production (Cloudflare Pages):** Pushing to GitHub `master` branch triggers automatic continuous deployment to [https://aaradhya-malaviya-portfolio.pages.dev/](https://aaradhya-malaviya-portfolio.pages.dev/). Custom security headers and cache rules are governed by `_headers`.
*   **Alternative Environments:** Root files (`index.html`, `404.html`, `assets/`) can be hosted directly on Vercel, Netlify, or GitHub Pages.

## Development Conventions
1.  **Styling & Theming:**
    *   **Vanilla CSS Only:** Do not introduce Tailwind or Bootstrap.
    *   **Theming:** Always use CSS variables. Ensure new elements support `.light-theme`.
    *   **Glassmorphism:** Use `backdrop-filter: blur(10px)` and semi-transparent backgrounds.
2.  **Animations:**
    *   **Scroll Reveal:** Apply the `.reveal` class to new sections.
    *   **Premium UI:** Use `::before` pseudo-elements for gradient rings and background orbs.
    *   **Skill Bars:** Ensure `.skill-progress-fill` has an `animated` state triggered by `script.js`.
3.  **Project Content:**
    *   **Experience Timeline:** Updated in `index.html` under the `resume` article. Follow the `<li class="timeline-item">` structure.
    *   **GitHub Projects:** Dynamic section. Update descriptions and links directly on GitHub.
    *   **Project Preview Images:** To add/update:
        1. Place image in `assets/images/projects/<repo-name>.png`.
        2. Add entry to `PROJECT_PREVIEWS` in `script.js` (lowercase repo name).
        3. Set GitHub `homepage` field for "View Live" link.
    *   **Certifications:** Static in `index.html`. New certificates require an `<li>` in the `certifications` article and matching files in `assets/certificates/` and `assets/images/certificates/`.
4.  **Job Tracking:**
    *   Keep `indeed-application-queue.md` updated with recent applications and screening responses.