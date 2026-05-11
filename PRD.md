# Product Requirements Document (PRD) - Personal Portfolio Website

## 1. Project Overview
**Project Name:** Aaradhya Malaviya Professional Portfolio  
**Version:** 3.0 (Master Technical Specification)  
**Author:** Aaradhya Malaviya  
**Status:** Production Ready  
**Deployment Path:** GitHub → Vercel (CI/CD)

### 1.1 Executive Summary
A high-performance, responsive Single-Page Application (SPA) designed to act as a comprehensive professional identity hub. The platform bridges the gap between a traditional resume and a live project showcase by integrating real-time data from GitHub and interactive certification verification.

### 1.2 Core Objectives
*   **Trust & Verification:** Use live APIs and modal previews to prove skills rather than just listing them.
*   **User Engagement:** Employ high-end UI/UX patterns (Tilt, Typing, Scroll Reveal) to increase "Time on Page" for recruiters.
*   **Accessibility & Inclusion:** Ensure a seamless experience across all device types and lighting conditions (Light/Dark mode).
*   **Career Management:** Integrate back-office tracking for job applications directly into the repository.

---

## 2. Comprehensive User Flows

### 2.1 The "Recruiter Discovery" Flow
1.  **Landing:** User arrives at the root URL.
2.  **Introduction:** Sidebar typing animation immediately establishes the candidate's core roles.
3.  **Context:** User reads the "About Me" summary for a high-level fit assessment.
4.  **Verification:** User navigates to "Projects" or "Certifications" to see tangible proof of expertise.
5.  **Conversion:** User clicks "Download Resume" or submits the "Contact Form".

### 2.2 The "Hiring Manager Deep-Dive" Flow
1.  **Technical Audit:** User navigates to "Projects" and filters by "Python" or "React".
2.  **Code Inspection:** User hovers over 3D cards to see metadata, then clicks "Source" to view the repository on GitHub.
3.  **Credential Check:** User navigates to "Certifications" and opens modal previews for specific AWS or Anthropic certificates.
4.  **History Check:** User reviews the "Resume" timeline for career progression and education.

---

## 3. Technical Component Specifications

### 3.1 Single-Page Navigation System
*   **Logic:** Uses `data-page` attributes on articles and `data-nav-link` on buttons.
*   **Implementation:** `script.js` iterates through all pages, adding/removing the `.active` class based on innerHTML matching.
*   **State:** Each page transition triggers `window.scrollTo(0, 0)` for consistent user experience.

### 3.2 Dynamic GitHub Projects Engine
*   **Endpoint:** `https://api.github.com/users/AradhyaMalaviya/repos?sort=pushed`
*   **Data Processing:** 
    *   **Sorting:** Most recently updated repos appear first.
    *   **Formatting:** Repo names are cleaned (dashes removed) and Title-Cased.
    *   **Relative Time:** Custom `timeAgo()` function converts timestamps to human-readable strings (e.g., "Updated 2 days ago").
*   **UI Features:** 
    *   **3D Tilt:** Raw JS calculation: `perspective(1000px) rotateX(calc(y - centerY)) rotateY(calc(x - centerX))`.
    *   **Language Color Mapping:** Custom dictionary mapping languages (e.g., Python: `#3572A5`) to UI dots and shadows.
    *   **Error Handling:** Stylized offline state with a `gh-retry-btn`.

### 3.3 Certification Verification System
*   **Architecture:** Static HTML grid with dynamic modal injection.
*   **Modal Logic:** 
    *   `data-certificate-src` stores the path to PDF or JPG.
    *   `initCertificateModal` injects the source into a dedicated `<iframe>` for real-time viewing.
    *   Supports `Esc` key to close and scroll-lock on background body.

### 3.4 Theming & Design Tokens
| Category | Token | Value (Dark / Light) |
|---|---|---|
| Background | `--smoky-black` | `#070707` / `#f0f0f0` (via overrides) |
| Accent | `--orange-yellow-crayola` | `hsl(45, 100%, 72%)` |
| Surface | `--bg-gradient-onyx` | Translucent Glassmorphism (Blur 10px) |
| Transition | `--transition-1` | `0.25s ease` |
| Typography | `--ff-poppins` | Poppins (Weights: 300, 400, 500, 600) |

---

## 4. Design & Motion System

### 4.1 Glassmorphism Standard
*   **Standard:** All primary containers (sidebar, articles, cards) must use `backdrop-filter: blur(10px)` and a semi-transparent border (`1px solid var(--jet)`).
*   **Glow Effects:** Cards use `box-shadow: var(--shadow-1)` which intensifies on hover during the 3D tilt.

### 4.2 Scroll Reveal Engine
*   **Trigger:** Intersection Observer with `threshold: 0.08`.
*   **Animation:** Elements start at `opacity: 0` and `translateY(20px)`.
*   **Staggering:** Sibling elements are automatically tagged with `reveal-delay-X` classes for a sequential "wave" effect.

### 4.3 Typing Animation Profile
*   **Sequence:** [Software Developer, Full Stack Developer, Java Developer, Web Developer, Problem Solver]
*   **Speeds:** Type: 80ms | Delete: 45ms | Pause at end: 2000ms.

---

## 5. Data & Career Management

### 5.1 Internal Project Tracking (`indeed-application-queue.md`)
*   **Purpose:** Tracks live job applications and maintains consistent screening answers.
*   **Structure:**
    *   **Candidate Positioning:** Core summary for various roles (Python, ML, Full Stack).
    *   **Queued Roles:** Markdown table with Company, Role, Fit-check, and URL.
    *   **Screening Answers:** Standardized responses for remote work, availability, and specific tech stack experience.

### 5.2 Content Update Guide
*   **Projects:** Update directly on GitHub (README/Tags). The site will sync on the next refresh.
*   **Resume:** Replace `resume file/Aaradhya_Malaviya_Resume.pdf`.
*   **Certifications:** 
    1. Upload PDF/JPG to `assets/certificates/`.
    2. Upload SVG preview to `assets/images/certificates/`.
    3. Add a new `<li>` to `index.html` within the `certifications` section.

---

## 6. Non-Functional Requirements

### 6.1 SEO & Performance
*   **Meta Tags:** Full OpenGraph support for LinkedIn/Twitter sharing.
*   **Semantic HTML:** Usage of `<article>`, `<aside>`, `<nav>`, and `<time>` tags for screen readers and search crawlers.
*   **Load Time:** Target < 1.5s for initial render (LCP).

### 6.2 Security
*   **Contact Form:** Protection via FormSubmit's built-in honeypot and email verification.
*   **Dependencies:** Zero heavy frameworks (Zero React/Vue/jQuery) to minimize vulnerability surface.
