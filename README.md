# 🎯 Personal Portfolio Website

> **Live Website:** [https://personal-portfolio-iota-silk-19.vercel.app/](https://personal-portfolio-iota-silk-19.vercel.app/)

---

# 💼 Personal Portfolio Website by Aaradhya Malaviya

Welcome to my **Personal Portfolio Website**, a premium, highly interactive Single-Page Application (SPA) designed to showcase my skills, projects, certifications, and career objectives. It acts as a comprehensive digital resume with a modern, glassmorphism-based aesthetic.

![Portfolio Hero — About Me section with animated typing roles](./assets/images/readme/portfolio-hero.png)

---

## 🌟 Overview

**Website Sections:**
- **About Me** – Introduction, career aspirations, and professional background
- **Resume** – Education, experience timeline, technical skills, and achievements
- **Projects** – Dynamic GitHub-powered project showcase with **live preview images**, 3D tilt effects, and language filtering
- **Certifications** – Interactive certificate gallery with modal previews (PDF/Image support)
- **Contact** – Contact form (FormSubmit AJAX integration with real-time feedback)

---

## 🚀 Projects — Live Preview Cards

Each project card displays a **real screenshot** of the deployed application, replacing generic folder icons with rich visual previews. Clicking any preview opens the live Vercel deployment or the GitHub source.

![Projects Section — Live preview cards with real application screenshots](./assets/images/readme/portfolio-projects.png)

### Project Cards in Detail

Every card includes the project preview image, technology tags, star/fork counts, action buttons (Source + Live Demo), and hover effects with a glassmorphism "View Live" overlay.

![Project Card Details — Titles, descriptions, tech tags, and action buttons](./assets/images/readme/portfolio-projects-2.png)

### Showcased Projects

| Project | Preview | Tech | Live URL |
|---------|---------|------|----------|
| **FitBox** | AI Fitness Coach — workout tracking, Indian meal logging, gym buddy matching | TypeScript, React, FastAPI | [art-decoder-tool.vercel.app](https://art-decoder-tool.vercel.app) |
| **Heart Disease Predictions** | ML-based cardiac risk assessment tool | Python, Scikit-learn, FastAPI | [heartdisease-taupe.vercel.app](https://heartdisease-taupe.vercel.app) |
| **Email Automation Tool** | Campaign analytics dashboard with email template editor | JavaScript | [GitHub Source](https://github.com/AradhyaMalaviya/email-automation-tool) |
| **Rackandroll Cafe** | Restaurant landing page with menu and reservation system | JavaScript | [GitHub Source](https://github.com/AradhyaMalaviya/rackandroll-cafe) |
| **TheBadgerCompany** | Luxury shoe e-commerce landing page | JavaScript | [GitHub Source](https://github.com/AradhyaMalaviya/thebadgercompany) |

### FitBox — AI Fitness Coach (Live Deployment)

![FitBox Landing Page — "Your AI Fitness Coach. Built for India."](./assets/images/readme/project-fitbox-live.png)

---

## 🎯 Career Objective

Actively seeking **Software Developer**, **Full-Stack Developer**, and **AI/ML Engineer** roles. Experienced in:
- Full-stack web development (React, Node.js, Express, FastAPI)
- AI/ML systems (PyTorch, Scikit-learn, OpenCV, EasyOCR)
- Generative AI (LLMs, Prompt Engineering, AI Agents)
- Database management (SQL, NoSQL)
- Cloud & DevOps (AWS, Docker, Git, GitHub)
- Deployment (Vercel, Netlify, GitHub Pages)

---

## 🔧 Technology Stack

### Portfolio Website Stack
| Category | Technologies |
|----------|-------------|
| **Structure** | HTML5 (Semantic SPA layout) |
| **Styling** | Vanilla CSS3 (Custom variables, gradients, glassmorphism, responsive design) |
| **Logic** | Vanilla JavaScript ES6 (GitHub API, 3D tilt, typing animation, scroll reveal) |
| **Icons** | Ionicons (CDN) |
| **Typography** | Google Fonts — Poppins (300, 400, 500, 600) |
| **Contact** | FormSubmit (AJAX with loading/success/error states) |
| **Deployment** | Vercel (CI/CD from GitHub) |

### Professional Stack (Showcased Projects)
| Category | Technologies |
|----------|-------------|
| **Languages** | C++, JavaScript, Python, SQL, HTML, CSS |
| **Frameworks** | React.js, Node.js, Express.js, FastAPI |
| **AI/ML** | pandas, NumPy, scikit-learn, PyTorch, OpenCV, EasyOCR |
| **Cloud & Tools** | AWS, Docker, Git, GitHub, VS Code |
| **Domains** | Machine Learning, Deep Learning, Generative AI, LLMs, Computer Vision, NLP |

---

## 📄 Resume Section

![Resume — Education timeline with degree details and achievements](./assets/images/readme/portfolio-resume.png)

---

## 📈 Key Features

- **Live Project Previews** — Each project card displays a real preview image/screenshot of the application instead of generic icons
- **Clickable Preview Banners** — Clicking a project preview navigates directly to the live Vercel deployment or GitHub source
- **Interactive Hover Effects** — Glassmorphism "View Live" overlay chip appears on hover with smooth zoom transitions
- **3D Tilt Effect** — Perspective-based tilt on project cards with glare overlay
- **Dynamic GitHub Integration** — Real-time project fetching from GitHub API with language filtering, skeleton loading, and retry logic
- **Typing Animation** — Animated role rotation in the sidebar (Software Developer, Full Stack Developer, etc.)
- **Light/Dark Mode** — Theme toggle with local storage persistence
- **Contact Form** — FormSubmit AJAX integration with loading, success, and error states
- **Interactive Certifications** — Modal previews with PDF/image viewer and keyboard (Esc) support
- **Scroll Reveal Animations** — IntersectionObserver-powered fade-in animations with staggered delays
- **Animated Floating Orbs** — Subtle background particle effects for a premium aesthetic
- **Fully Responsive** — Optimized for desktop, tablet, and mobile viewports
- **Custom 404 Page** — Stylized error page matching the portfolio's aesthetic

---

## 🏆 Certifications

![Certifications — AWS Training & Certification modal previews](./assets/images/readme/portfolio-certifications.png)

All certificates are viewable in the **Certifications** section with interactive modal previews. Recent certificates include:

**AWS Training & Certification (2026):**
- Fundamentals of Machine Learning and Artificial Intelligence
- Fundamentals of Generative AI
- Foundations of Prompt Engineering
- Introduction to Generative AI: Art of the Possible

**Anthropic Education (2026):**
- Claude 101, Claude Code 101
- Introduction to Claude Cowork
- Introduction to Subagents
- Introduction to Agent Skills

**Data Science:**
- Python for Data Science (Infosys / OnWingspan)
- Data Science, ML, DL, NLP Bootcamp (Udemy)

---

## 📱 Mobile View

Fully responsive design across all viewports — the portfolio adapts seamlessly to mobile screens while maintaining its premium aesthetic.

<p align="center">
  <img src="./assets/images/readme/mobile-about.png" width="220" alt="Mobile — About Me" />
  <img src="./assets/images/readme/mobile-projects.png" width="220" alt="Mobile — Projects" />
  <img src="./assets/images/readme/mobile-resume.png" width="220" alt="Mobile — Resume" />
  <img src="./assets/images/readme/mobile-certifications.png" width="220" alt="Mobile — Certifications" />
</p>

---

## 📬 Contact

![Contact — Map integration and form with FormSubmit AJAX](./assets/images/readme/portfolio-contact.png)

---

## 📁 Project Structure

```
Portfolio/
├── index.html                          # Main SPA entry point
├── 404.html                            # Custom error page
├── GEMINI.md                           # AI assistant context file
├── PRD.md                              # Product Requirements Document
├── README.md                           # This file
├── indeed-application-queue.md         # Job application tracker
├── assets/
│   ├── css/
│   │   └── style.css                   # Central stylesheet (~3400 lines)
│   ├── js/
│   │   └── script.js                   # Central logic file (~755 lines)
│   ├── images/
│   │   ├── my-avatar.png               # Profile avatar
│   │   ├── certificates/               # SVG previews for certificates
│   │   ├── readme/                     # README screenshots (real captures)
│   │   │   ├── portfolio-hero.png
│   │   │   ├── portfolio-projects.png
│   │   │   ├── portfolio-projects-2.png
│   │   │   ├── portfolio-resume.png
│   │   │   ├── portfolio-certifications.png
│   │   │   ├── portfolio-contact.png
│   │   │   ├── project-fitbox-live.png
│   │   │   ├── mobile-about.png
│   │   │   ├── mobile-projects.png
│   │   │   ├── mobile-resume.png
│   │   │   └── mobile-certifications.png
│   │   └── projects/                   # Project preview images (card banners)
│   │       ├── email-automation-tool.png
│   │       ├── fitbox.png
│   │       ├── heart-diseases-predictions.png
│   │       ├── rackandroll-cafe.png
│   │       └── thebadgercompany.png
│   └── certificates/                   # Source PDF/JPG certificates
└── resume file/                        # Downloadable resume documents
```

---

## 🔄 Recent Updates

- **Project Preview Cards:** Replaced all generic folder icons with **real project preview images** captured from live deployments. Each card now showcases the actual application with clickable banners linking to Vercel deployments or GitHub source. Hover effects include a glassmorphism "View Live" overlay and smooth image zoom.
- **README Screenshots:** Replaced all placeholder `github.com/user-attachments` images with **real screenshots** captured directly from the live production site — every section (Hero, Projects, Resume, Certifications, Contact, Mobile) now shows the actual current state.
- **UX/Recruiter Enhancements:** Light/Dark mode toggle, scroll fade-in animations, "Download Resume" button, and improved Contact Form feedback.
- **Custom Pages:** Stylized 404 error page matching the portfolio aesthetic.
- **Certifications:** Added AWS ML/AI, Generative AI, Prompt Engineering, and Anthropic certificates.
- **Projects Section:** Interactive 3D tilt effects, language filtering, and premium card design.
- **UI/UX:** Floating background orbs, animated skill bars, sidebar hover glow, and avatar gradient ring.

---

## 📝 Future Goals

- Contribute to **open-source projects**
- Build advanced **Full-Stack and AI-powered applications**
- Strengthen knowledge of **cloud platforms, distributed systems, and AI agents**
- Participate in more **hackathons** and collaborative projects

---

Thank you for visiting my portfolio!

Feel free to connect for **collaboration, internships, or job opportunities**.

---

## 📫 Let's Connect

- **Email:** aaradhya.malaviya2005@gmail.com
- **GitHub:** [AradhyaMalaviya](https://github.com/AradhyaMalaviya)
- **LinkedIn:** [aaradhya-malaviya](https://linkedin.com/in/aaradhya-malaviya)
