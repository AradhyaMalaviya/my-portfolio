# Personal Portfolio Website - Project Context

## Project Overview
This repository contains the Personal Portfolio Website for Aaradhya Malaviya. It is a static, highly interactive, and fully responsive front-end web application designed to showcase the developer's skills, projects, certifications, and career objectives. It acts as a comprehensive digital resume.

### Main Technologies
*   **HTML5:** Semantic markup structure in a Single Page Application (SPA) style layout.
*   **CSS3 (Vanilla):** Extensive use of custom CSS variables for theming, complex gradients, glassmorphism, responsive design (media queries), and premium UI animations (floating background orbs, scroll reveals). 
*   **JavaScript (Vanilla ES6):** Handles UI interactions, intersection observers for scroll animations, dynamic GitHub API data fetching, and AJAX form submissions.
*   **GitHub API:** Used to dynamically fetch and display projects from the `AradhyaMalaviya` GitHub account.
*   **FormSubmit:** An external service used to process the contact form without requiring a custom backend.
*   **Ionicons:** Icon library integrated via CDN.

## Project Architecture & Directory Structure
*   `index.html`: The core HTML file containing the entire single-page structure (About, Resume, Projects, Certifications, Contact).
*   `404.html`: A stylized custom error page for broken links.
*   `assets/css/style.css`: The central stylesheet. It contains a robust set of CSS variables defining the design system, including a full set of variables mapped for `.light-theme` compatibility.
*   `assets/js/script.js`: The central JavaScript file. Contains logic for:
    *   Sidebar toggling and page navigation.
    *   Fetching and rendering GitHub repositories with 3D tilt effects.
    *   Intersection Observer implementations for staggered fade-in scroll animations (`.reveal`, `.fade-in`).
    *   Light/Dark mode local storage and toggling.
    *   AJAX handling for the FormSubmit contact form.
    *   Modal handling for testimonials and certificates.
*   `assets/images/`: Contains all static images, SVGs, and avatars used across the site.
*   `assets/certificates/`: Contains PDF or SVG versions of acquired certificates.
*   `resume file/`: Houses the downloadable resume document.

## Building and Running
Because this is a vanilla static site, no complex build tools (like Webpack or Vite) are strictly required for the core application. 

**To run locally:**
Use any standard local HTTP server in the root directory.
*   Using Python: `python -m http.server 8000`
*   Using Node.js: `npx serve` or `npx http-server`
*   Using VS Code: The "Live Server" extension.

**To deploy:**
The `index.html`, `404.html`, and `assets/` folder can be directly deployed to static hosting providers such as Vercel, Netlify, or GitHub Pages.

## Development Conventions
1.  **Styling & Theming:** 
    *   **Do not use Tailwind or Bootstrap.** Maintain the existing custom vanilla CSS architecture.
    *   Always utilize the defined CSS variables (e.g., `var(--orange-yellow-crayola)`, `var(--bg-gradient-onyx)`) to maintain brand consistency.
    *   When adding new UI elements, ensure they respect the Light/Dark mode toggle by defining appropriate variable overrides inside the `body.light-theme` selector in `style.css`.
2.  **JavaScript Interactivity:**
    *   Stick to Vanilla JS. Avoid introducing heavy frameworks like React or jQuery for simple DOM manipulation.
    *   Wrap feature initialization in IIFE (Immediately Invoked Function Expressions) or distinct functions to avoid polluting the global namespace (e.g., `(function initThemeToggle() { ... })();`).
3.  **Project Content:**
    *   The "Projects" section is populated dynamically from GitHub. To update project descriptions, tags, or links, do so directly on the repository settings at GitHub, not within the HTML.
4.  **Animations:**
    *   Use CSS transitions and keyframes for hover effects and continuous background animations.
    *   For scroll-triggered animations, apply the `.reveal` or `.hidden-fade` classes in HTML and let the central IntersectionObservers in `script.js` handle the visibility toggling.