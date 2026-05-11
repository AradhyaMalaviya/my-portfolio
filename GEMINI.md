# Personal Portfolio Website - Project Context

## Project Overview
This repository contains the Personal Portfolio Website for Aaradhya Malaviya. It is a static, highly interactive, and fully responsive front-end web application designed to showcase the developer's skills, projects, certifications, and career objectives. It acts as a comprehensive digital resume with a premium, modern aesthetic.

### Main Technologies
*   **HTML5:** Semantic markup structure in a Single Page Application (SPA) style layout.
*   **CSS3 (Vanilla):** Extensive use of custom CSS variables for theming, complex gradients, glassmorphism (`backdrop-filter`), responsive design, and premium UI animations (floating background orbs, scroll reveals).
*   **JavaScript (Vanilla ES6):** Handles all UI logic, including:
    *   **Dynamic GitHub API:** Fetches and renders repositories with language-based filtering, skeleton loading, and retry logic.
    *   **Interactivity:** 3D tilt effects on cards, typing animations for roles, and staggered scroll reveals.
    *   **Modals:** Custom modal systems for testimonials and certification previews (PDF/Image support).
*   **AI/ML Stack (Project Focus):** Projects leverage Python, FastAPI, PyTorch, Scikit-learn, OpenCV, and EasyOCR.
*   **FormSubmit:** Process contact form submissions with AJAX, providing real-time feedback (Loading/Success/Error).
*   **Ionicons:** Icon library integrated via CDN.

## Project Architecture & Directory Structure
*   `index.html`: The core HTML file containing the entire single-page structure.
*   `404.html`: A stylized custom error page matching the main theme.
*   `indeed-application-queue.md`: Tracking document for job applications, candidate positioning, and screening answers.
*   `assets/css/style.css`: The central stylesheet. Contains a robust set of CSS variables and specific overrides for `.light-theme`.
*   `assets/js/script.js`: The central logic file, organized into modules:
    *   `initThemeToggle`: Manages light/dark mode with local storage persistence.
    *   `loadGitHubProjects`: Handles API fetching, card generation, and 3D tilt initialization.
    *   `initScrollReveal`: Uses `IntersectionObserver` to automate fade-in animations.
    *   `initTypingAnimation`: Animates the developer roles in the header/sidebar.
    *   `initCertificateModal`: Specific modal logic for certification previews.
*   `assets/images/`: Contains static images, SVGs, and avatars.
    *   `assets/images/certificates/`: SVG previews for certificates.
*   `assets/certificates/`: Source PDF or JPG versions of acquired certificates.
*   `resume file/`: Houses the downloadable resume documents.

## Building and Running
The project is a vanilla static site. No build tools are required for development, though a `src/` and `dist/` structure exists for potential future scaling.

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
    *   **Theming:** Always use CSS variables. Ensure new elements support `.light-theme` by defining overrides in `style.css`.
    *   **Glassmorphism:** Use `backdrop-filter: blur(10px)` and semi-transparent backgrounds for the "premium" feel.
2.  **Animations:**
    *   **Scroll Reveal:** Apply the `.reveal` class to new sections. The `script.js` observer will handle the `revealed` state.
    *   **Card Effects:** Projects should use the `gh-card premium-card` classes to inherit 3D tilt and hover effects.
3.  **Project Content:**
    *   The "Projects" section is dynamic. Updates to descriptions or links should be made on GitHub.
    *   The "Certifications" section is static in `index.html`. New certificates require an `<li>` in the `certifications` article and matching files in `assets/certificates/`.
4.  **Job Tracking:**
    *   Keep `indeed-application-queue.md` updated with recent applications and screening responses to maintain consistency across job platforms.