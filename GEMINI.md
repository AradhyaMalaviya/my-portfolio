# Personal Portfolio Website - Project Context

## Project Overview
This repository contains the Personal Portfolio Website for Aaradhya Malaviya. It is a static, highly interactive, and fully responsive front-end web application designed to showcase the developer's skills, projects, certifications, and career objectives. It acts as a comprehensive digital resume with a premium, modern aesthetic.

### Main Technologies
*   **HTML5:** Semantic markup structure in a Single Page Application (SPA) style layout.
*   **CSS3 (Vanilla):** Extensive use of custom CSS variables for theming, complex gradients, glassmorphism (`backdrop-filter`), responsive design, and premium UI animations (floating background orbs, avatar gradient ring, scroll reveals).
*   **JavaScript (Vanilla ES6):** Handles all UI logic, including:
    *   **Dynamic GitHub API:** Fetches and renders repositories with language-based filtering, skeleton loading, and retry logic. Uses a custom `hashColor` function for repository-specific branding.
    *   **Project Preview System:** Maps repo names to local preview images via a `PROJECT_PREVIEWS` dictionary. Cards with preview images display clickable banners linking to live deployments or GitHub source. Repos without previews fall back to a gradient + icon banner (`code-slash-outline`).
    *   **Interactivity:** 3D tilt effects on cards, typing animations for roles, and staggered scroll reveals.
    *   **Modals:** Custom modal systems for testimonials and certification previews (PDF/Image support).
*   **AI/ML Stack (Project Focus):** Projects leverage Python, FastAPI, PyTorch, Scikit-learn, OpenCV, and EasyOCR.
*   **FormSubmit:** Process contact form submissions with AJAX, providing real-time feedback (Loading/Success/Error).
*   **Ionicons:** Icon library integrated via CDN.

## Project Architecture & Directory Structure
*   `index.html`: The core HTML file containing the entire single-page structure.
*   `404.html`: A stylized custom error page matching the main theme.
*   `PRD.md`: Master technical specification (Version 4.0 - Live Preview Cards Release).
*   `indeed-application-queue.md`: Tracking document for job applications, candidate positioning, and screening answers.
*   `assets/css/style.css`: The central stylesheet (~3400 lines). Contains:
    *   **CSS Variables:** Robust set for theming and design tokens.
    *   **Premium Card Styles:** 3D tilt, hover overlays, glassmorphism chips.
    *   **Animations:** Floating background orbs, avatar gradient ring rotation, and `.reveal` state transitions.
    *   **Themes:** Specific overrides for `.light-theme`.
*   `assets/js/script.js`: The central logic file (~755 lines), organized into modules:
    *   `PROJECT_PREVIEWS`: Dictionary mapping repo names (lowercase) to preview image paths in `assets/images/projects/`.
    *   `createProjectCard`: Generates project cards with preview images, clickable banners, 3D tilt, and hover overlay effects.
    *   `loadGitHubProjects`: Handles GitHub API fetching, card generation, and filter bar construction.
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
The project is a vanilla static site. No build tools are required for development.

**To run locally:**
Use any standard local HTTP server in the root directory:
*   `npx serve` or `npx http-server`
*   Python: `python -m http.server 8000`
*   VS Code: "Live Server" extension.

**To deploy:**
Deploy the root files (`index.html`, `404.html`, `assets/`) directly to Vercel, Netlify, or GitHub Pages.

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