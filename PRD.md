# Product Requirements Document (PRD) - Personal Portfolio Website

## 1. Project Overview
**Project Name:** Aaradhya Malaviya Professional Portfolio  
**Version:** 4.0 (Live Preview Cards Release)  
**Author:** Aaradhya Malaviya  
**Status:** Production Ready  
**Deployment Path:** GitHub → Vercel (CI/CD)

### 1.1 Executive Summary
A high-performance, responsive Single-Page Application (SPA) designed to act as a comprehensive professional identity hub. The platform bridges the gap between a traditional resume and a live project showcase by integrating real-time data from GitHub, interactive certification verification, and live project preview images that visually represent each deployed application.

### 1.2 Core Objectives
*   **Trust & Verification:** Use live APIs, project preview images, and modal previews to prove skills rather than just listing them.
*   **Visual Showcase:** Display real project preview screenshots on each card, making the portfolio feel professional and portfolio-ready.
*   **User Engagement:** Employ high-end UI/UX patterns (3D Tilt, Typing, Scroll Reveal, Preview Hover Overlays, Floating Orbs) to increase "Time on Page" for recruiters.
*   **Accessibility & Inclusion:** Ensure a seamless experience across all device types and lighting conditions (Light/Dark mode).
*   **Career Management:** Integrate back-office tracking for job applications directly into the repository.

---

## 2. Comprehensive User Flows

### 2.1 The "Recruiter Discovery" Flow
1.  **Landing:** User arrives at the root URL.
2.  **Introduction:** Sidebar typing animation immediately establishes the candidate's core roles.
3.  **Context:** User reads the "About Me" summary for a high-level fit assessment.
4.  **Verification:** User navigates to "Projects" to see live preview images of actual applications, or "Certifications" to see tangible proof of expertise.
5.  **Exploration:** User hovers over a project card to reveal the "View Live" overlay and clicks to open the deployed project.
6.  **Conversion:** User clicks "Download Resume" or submits the "Contact Form".

### 2.2 The "Hiring Manager Deep-Dive" Flow
1.  **Technical Audit:** User navigates to "Projects" and filters by "Python" or "TypeScript".
2.  **Visual Assessment:** User sees real preview images of each project, immediately understanding what each application looks like.
3.  **Live Inspection:** User clicks a project preview to visit the live Vercel deployment, or clicks "Source" to view the repository on GitHub.
4.  **Credential Check:** User navigates to "Certifications" and opens modal previews for specific AWS or Anthropic certificates.
5.  **History Check:** User reviews the "Resume" timeline for career progression and education.

---

## 3. Technical Component Specifications

### 3.1 Single-Page Navigation System
*   **Logic:** Uses `data-page` attributes on articles and `data-nav-link` on buttons.
*   **Implementation:** `script.js` iterates through all pages, adding/removing the `.active` class based on innerHTML matching.
*   **State:** Each page transition triggers `window.scrollTo(0, 0)` for consistent user experience.

### 3.2 Master Projects Catalog & Dynamic GitHub Engine (v5.0)
*   **Dual Data Architecture:**
    *   **Master Catalog (`projects-data.js`):** Offline-first, comprehensive registry containing all 35 repositories (18 Public, 17 Private) with rich descriptions, technology pills, direct repository/demo URLs, and visibility indicators.
    *   **Live Background Sync (`api.github.com`):** Queries GitHub API asynchronously for live updates to star counts, fork counts, and push timestamps for public repositories without rate-limit blocking or hiding private projects.
*   **Data Processing:** 
    *   **Formatting:** Clean display names, technology stack tags, and visibility badges (`Public`, `Private`, `Featured`, `Forked`).
    *   **Relative Time:** Custom `timeAgo()` function converts ISO timestamps to natural human language.
    *   **Branding:** Deterministic `hashColor()` generates unique card gradient banners.
*   **Interactive Controls:**
    *   **Live Search Bar:** Real-time search by title, tech stack keywords (Python, React, FastAPI...), or description with dynamic count update.
    *   **Categorized Filter Tabs:** `All (35)`, `Featured`, `Public (18)`, `Private (17)`, `AI / ML`, `Full-Stack`, `TypeScript`, `Python`, `JavaScript`, `Automation`, `Web`.
    *   **Live Stats Bar:** Real-time summary showing visible project count, public/private breakdown, and GitHub sync status indicator.
*   **UI Features:** 
    *   **Preview Images:** High-resolution screenshots for flagship projects with glassmorphic "View Live" / "View Project" hover overlay.
    *   **Fallback Banner:** Projects without static preview images use dynamic gradient banners with category/security icons.
    *   **3D Tilt:** Perspective-based interactive tilt with cursor-following glare overlay.
    *   **Protected Access Indication:** Private repositories are styled with clear lock badges and contextual source buttons.

### 3.3 Project Preview Image System
*   **Architecture:** Static image files in `assets/images/projects/` mapped to repo names via `PROJECT_PREVIEWS` and `projects-data.js`.
*   **Showcased Mappings:**
    | Repo Name (Key) | Image File | Link Target |
    |---|---|---|
    | `fitbox` | `fitbox.png` | `fitbox-cto.pages.dev/auth` |
    | `heart_diseases-_predictions-` | `heart-diseases-predictions.png` | `heartdisease-taupe.vercel.app` |
    | `email-automation-tool` | `email-automation-tool.png` | GitHub source |
    | `rackandroll-cafe` | `rackandroll-cafe.png` | GitHub source |
    | `thebadgercompany` | `thebadgercompany.png` | GitHub source |
    | `neural-retail-ai` | `neural-retail-ai.png` | GitHub source |
    | `detoxing` | `detoxing.jpg` | `detoxingwithbagga.vercel.app` |
    | `web-development-internship-project` | `web-development-internship.webp` | `web-development-internship-project.vercel.app` |
    | `my-portfolio` | `portfolio-hero.png` | `personal-portfolio-iota-silk-19.vercel.app/` |
*   **Banner Variants:**
    *   `.gh-card-banner--preview`: Full-bleed responsive image with subtle dark gradient overlay and interactive zoom.
    *   `.gh-card-banner--fallback`: Dynamic gradient banner with reactive icons (`hardware-chip-outline`, `shield-checkmark-outline`, `code-slash-outline`).
*   **CSS Specifications:**
    *   Banner height: `180px`.
    *   Preview image: `object-fit: cover`, `object-position: top center`, `filter: brightness(0.85)`.
    *   Hover state: `transform: scale(1.08)`, `filter: brightness(1)`.

### 3.4 Certification Verification System
*   **Architecture:** Static HTML grid with dynamic modal injection.
*   **Modal Logic:** 
    *   `data-certificate-src` stores the path to PDF or JPG.
    *   `initCertificateModal` injects the source into a dedicated `<iframe>` for real-time viewing.
    *   Supports `Esc` key to close and scroll-lock on background body.

### 3.5 Theming & Design Tokens
| Category | Token | Value (Dark / Light) |
|---|---|---|
| Background | `--smoky-black` | `#070707` / `#f0f0f0` |
| Accent | `--orange-yellow-crayola` | `hsl(45, 100%, 72%)` |
| Surface | `--bg-gradient-onyx` | Translucent Glassmorphism (Blur 10px) |
| Transition | `--transition-1` | `0.25s ease` |
| Typography | `--ff-poppins` | Poppins (Weights: 300, 400, 500, 600) |

---

## 4. Design & Motion System

### 4.1 Glassmorphism Standard
*   **Standard:** All primary containers (sidebar, articles, cards) must use `backdrop-filter: blur(10px)` and a semi-transparent border (`1px solid var(--jet)`).
*   **Preview Hover Chip:** Uses `backdrop-filter: blur(14px)` with `background: hsla(0,0%,0%,0.55)` and a `1px solid hsla(0,0%,100%,0.15)` border.

### 4.2 Premium UI Animations
*   **Floating Background Orbs:** Three animated orbs with variable sizes and `ease-in-out` infinite loops (22s to 30s durations).
*   **Avatar Gradient Ring:** `conic-gradient` border rotating every 5 seconds on the sidebar profile image.
*   **Animated Skill Bars:** Percentage-based progress bars that animate from 0 to target value when scrolled into view.
*   **3D Tilt Effect:** Max rotation ±10° on both axes. `scale3d(1.02, 1.02, 1.02)` on hover with glare overlay.

### 4.3 Scroll Reveal Engine
*   **Trigger:** Intersection Observer with `threshold: 0.08`.
*   **Animation:** Elements start at `opacity: 0` and `translateY(20px)`.
*   **Staggering:** Sibling elements are automatically tagged with `reveal-delay-X` classes for a sequential "wave" effect.

---

## 5. Data & Career Management

### 5.1 Internal Project Tracking (`indeed-application-queue.md`)
*   **Purpose:** Tracks live job applications and maintains consistent screening answers.
*   **Structure:**
    *   **Candidate Positioning:** Core summary for various roles (Python, ML, Full Stack).
    *   **Queued Roles:** Markdown table with Company, Role, Fit-check, and URL.
    *   **Screening Answers:** Standardized responses for remote work, availability, and specific tech stack experience.

### 5.2 Content Update Guide
*   **Experience Timeline:** Update directly in `index.html` within the `resume` article's `<ol class="timeline-list">`.
*   **Projects:** Update descriptions or links on GitHub. Preview images mapped in `PROJECT_PREVIEWS` in `script.js`.
*   **Resume:** Replace `resume file/Aaradhya_Malaviya_Resume.pdf`.
*   **Certifications:** 
    1. Upload PDF/JPG to `assets/certificates/`.
    2. Upload SVG preview to `assets/images/certificates/`.
    3. Add a new `<li>` to `index.html` within the `certifications` section.

---

## 6. Non-Functional Requirements

### 6.1 SEO & Performance
*   **Meta Tags:** Full OpenGraph support for LinkedIn/Twitter sharing.
*   **Semantic HTML:** Usage of `<article>`, `<aside>`, `<nav>`, and `<time>` tags.
*   **Load Time:** Target < 1.5s for initial render. Project preview images use `loading="lazy"`.

### 6.2 Security
*   **Contact Form:** Protection via FormSubmit's built-in honeypot and email verification.
*   **Dependencies:** Zero heavy frameworks (Vanilla JS/CSS) to minimize vulnerability surface.
*   **External Links:** All external links use `rel="noopener noreferrer"` and `target="_blank"`.
