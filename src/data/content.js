/* =========================================================================
   PORTFOLIO CONTENT
   -------------------------------------------------------------------------
   This is the ONLY file you need to edit to update your portfolio.
   No React knowledge required — just change the text between the quotes.
   ========================================================================= */

export const GITHUB_USER = "Syammm23";

/* -------------------------------------------------------------------------
   BRAND MARK — the small badge next to your name in the nav bar and footer.
   Change `type` to switch what it shows:
     "photo"    -> your profile photo, in a circle  (uses profile.avatar)
     "initials" -> the letters below, on a solid colour
     "logo"     -> a custom image; put the file in `public/` and set `logo`
     "none"     -> hide the badge, show only your name
   ------------------------------------------------------------------------- */
export const brand = {
  type: "photo",
  initials: "SK",
  logo: null, // e.g. "/logo.png"
  color: "#1c1c26", // background used when type is "initials"
};

export const profile = {
  name: "Syam Kumar Prasad",
  first: "Syam",
  last: "Kumar Prasad",
  roles: ["Web Developer", "Freelancer", "BCA Student"],
  headline: "I build clean, fast websites that businesses actually use.",
  intro:
    "BCA student and freelance web developer from Daman. I have designed, built and sold a production website to a paying client, and I am currently building Klygo while moving deeper into the modern JavaScript stack.",

  /* Small badges that float around the hero photo. */
  heroChips: [
    { label: "React", icon: "fab fa-react", color: "#61dbfb" },
    { label: "Building Klygo", icon: "fas fa-rocket", color: "#a78bfa" },
    { label: "Client shipped", icon: "fas fa-circle-check", color: "#34d399" },
  ],

  semester: "5th",
  cgpa: "7+",
  location: "Daman, India",

  // TO CHANGE YOUR PHOTO: put the file in the `public/` folder and write its
  // name here, e.g. "/Syam-profile.jpg". Square-ish images work best.
  avatar: "/Syam-profile.webp",

  available: true,
  availableText: "Available for freelance work",

  // TO ENABLE THE RESUME BUTTON: put your PDF in `public/` and write its name
  // here, e.g. "/Syam-Resume.pdf". Left null so no broken link is shown.
  resume: null,

  email: "shyamkumarprasad3322@gmail.com",
  phone: "+917990853947",
  phoneLabel: "+91 79908 53947",

  summary: [
    "Hi! I am a **BCA student (5th Sem)** who builds for the web. I taught myself HTML, CSS, JavaScript and React, and I now take on **real client projects** — including a full company website that I designed, built and **sold to Vaibhav Enterprise**, now running live at vaibhavbags.com.",
    "Right now I work front desk as a **Receptionist at Hotel Royal Garden**, handling guest check-ins, bookings and daily operations. Before that I spent close to a year in AI data evaluation — as a **Search Quality Rater at Telus Digital** and an **Ads Quality Rater at Welocalize** — and earlier handled billing operations at **Reliance Smart Bazaar**.",
    "I am currently building **Klygo**, and I am actively levelling up my stack — **Next.js** for production-grade React, **Flutter** for cross-platform mobile, and **PostgreSQL with Prisma** for type-safe database work. I am disciplined, self-taught, and I learn by shipping rather than by collecting tutorials.",
  ],
};

export const socials = [
  { id: "github",   label: "GitHub",    handle: `@${GITHUB_USER}`,   href: `https://github.com/${GITHUB_USER}`,        icon: "fab fa-github",      color: "#e6edf3" },
  { id: "linkedin", label: "LinkedIn",  handle: "syammprasad",       href: "https://www.linkedin.com/in/syammprasad",   icon: "fab fa-linkedin-in", color: "#0a66c2" },
  { id: "email",    label: "Email",     handle: "Say hello",         href: "mailto:shyamkumarprasad3322@gmail.com",    icon: "fas fa-envelope",    color: "#f87171" },
  { id: "phone",    label: "Phone",     handle: "+91 79908 53947",   href: "tel:+917990853947",                        icon: "fas fa-phone-volume",color: "#34d399" },
  { id: "instagram",label: "Instagram", handle: "@mr.syamm",         href: "https://instagram.com/mr.syamm",           icon: "fab fa-instagram",   color: "#e1306c" },
  { id: "facebook", label: "Facebook",  handle: "Mr.syamm",          href: "https://facebook.com/Mr.syamm",            icon: "fab fa-facebook-f",  color: "#1877f2" },
];

export const skills = [
  { name: "HTML5",         icon: "fab fa-html5",      color: "#e34c26", note: "Semantic, accessible markup" },
  { name: "CSS3",          icon: "fab fa-css3-alt",   color: "#38bdf8", note: "Flexbox, Grid, animations" },
  { name: "JavaScript",    icon: "fab fa-js",         color: "#f0db4f", note: "ES6+, DOM, fetch" },
  { name: "React",         icon: "fab fa-react",      color: "#61dbfb", note: "Hooks, components, Vite" },
  { name: "Python",        icon: "fab fa-python",     color: "#4b8bbe", note: "Automation & scripting" },
  { name: "DBMS / SQL",    icon: "fas fa-database",   color: "#fbbf24", note: "Queries, schema design" },
  { name: "Git & GitHub",  icon: "fab fa-git-alt",    color: "#f05033", note: "Version control, deploys" },
  { name: "Data Analysis", icon: "fas fa-chart-line", color: "#34d399", note: "Quality rating & evaluation" },
];

/* -------------------------------------------------------------------------
   CURRENTLY LEARNING
   Kept separate from `skills` on purpose — claiming these as production
   skills would overstate them. This reads as honest and shows direction.
   ------------------------------------------------------------------------- */
export const learning = [
  { name: "Next.js",    icon: "fas fa-n",                     color: "#e6edf3", note: "App Router, server components and production React patterns." },
  { name: "Flutter",    icon: "fas fa-mobile-screen-button",  color: "#54c5f8", note: "Cross-platform mobile UI with Dart, targeting Android and iOS." },
  { name: "PostgreSQL", icon: "fas fa-database",              color: "#4b8bbe", note: "Relational schema design, joins, indexes and query performance." },
  { name: "Prisma",     icon: "fas fa-diagram-project",       color: "#a78bfa", note: "Type-safe ORM, schema migrations and Postgres integration." },
];

/* -------------------------------------------------------------------------
   EXPERIENCE
   `start` drives the automatic month counter. Format: "YYYY-MM-DD".
   Set `end` to null for a current role, or "YYYY-MM-DD" for a past one.
   ------------------------------------------------------------------------- */
export const experience = [
  {
    role: "Receptionist — Front Desk",
    company: "Hotel Royal Garden",
    kind: "Full-time",
    start: "2026-05-12",
    end: null,
    icon: "fas fa-bell-concierge",
    color: "#fbbf24",
    points: [
      "Manage front-desk operations — guest check-in and check-out, room allocation and booking records.",
      "Handle reservations, billing and payment processing on the hotel management system.",
      "Act as first point of contact for guests, resolving queries and coordinating with housekeeping and service staff.",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "Self-employed",
    kind: "Freelance",
    start: "2025-06-01",
    end: null,
    icon: "fas fa-code",
    color: "#a78bfa",
    points: [
      "Designed, built and delivered the full Vaibhav Enterprise company website, later sold to the client.",
      "Handle the complete pipeline end to end — layout, responsive build, image optimisation and deployment.",
      "Work directly with business owners to turn rough requirements into a shipped site.",
    ],
  },
  {
    role: "Search Quality Rater",
    company: "Telus Digital",
    kind: "Part-time · Remote",
    start: "2025-10-01",
    end: "2026-06-01",
    icon: "fas fa-magnifying-glass-chart",
    color: "#38bdf8",
    points: [
      "Evaluated search engine results and improved data quality for AI training systems.",
      "Analysed user intent and reviewed datasets for accuracy, relevance and consistency.",
      "Applied strict rating guidelines to maintain high inter-rater reliability.",
    ],
  },
  {
    role: "Ads Quality Rater",
    company: "Welocalize",
    kind: "Part-time · Remote",
    start: "2025-10-01",
    end: "2026-06-01",
    icon: "fas fa-bullhorn",
    color: "#f472b6",
    points: [
      "Evaluated online advertisements for relevance and quality across multiple markets.",
      "Performed data-driven analysis supporting search optimisation and user experience.",
    ],
  },
  {
    role: "Retail Associate — Billing",
    company: "Reliance Smart Bazaar",
    kind: "Full-time",
    start: "2024-09-01",
    end: "2025-07-01",
    icon: "fas fa-cash-register",
    color: "#34d399",
    points: [
      "Handled billing operations on POS systems for high daily customer volume.",
      "Managed cash, card and digital transactions with accurate end-of-day reconciliation.",
      "Delivered efficient front-desk customer service during peak retail hours.",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Applications",
    school: "Rajju Shroff ROFEL Institute",
    period: "5th Semester · Ongoing",
    score: "CGPA 7+",
    icon: "fas fa-graduation-cap",
    color: "#a78bfa",
    detail: "Specialising in Programming, Database Management (DBMS) and Web Technologies.",
  },
  {
    degree: "Higher Secondary (12th) — Science",
    school: "Shree Machhi Mahajan School, Daman",
    period: "Completed",
    score: "72%",
    icon: "fas fa-school",
    color: "#34d399",
    detail: "Completed higher secondary education in the Science stream.",
  },
];

/* -------------------------------------------------------------------------
   PROJECTS
   To add a project, copy one block and change the values.
     image    -> optional screenshot shown at the top of the card. Put the
                 file in `public/` and write its name, e.g. "/vaibhav.png".
                 Leave null and the card renders without an image.
     live     -> deployed site URL  (null hides the Live Demo button)
     code     -> GitHub repo URL    (null hides the Source Code button)
     featured -> true makes the card span the full width on desktop
   ------------------------------------------------------------------------- */
export const projects = [
  /* ---------------------------------------------------------------------
     TODO (Syam): tell Claude what Klygo actually does, or edit `blurb`
     and `tags` below yourself. The description here is deliberately
     generic because the details have not been confirmed yet.
     --------------------------------------------------------------------- */
  {
    title: "Klygo",
    subtitle: "In development",
    blurb:
      "The app I am building right now. Currently in active development — I am using it to put Next.js, Flutter and a PostgreSQL/Prisma backend into practice on a real product rather than tutorial projects.",
    icon: "fas fa-rocket",
    color: "#a78bfa",
    tags: ["Next.js", "Flutter", "PostgreSQL", "Prisma"],
    image: null,
    live: null,
    code: null,
    featured: false,
    highlight: "Work in progress",
    wip: true,
  },
  {
    title: "Vaibhav Enterprise",
    subtitle: "Client project · Sold",
    blurb:
      "A complete company website for a non-woven bag manufacturer — built, delivered and sold to the client. Covers a five-product catalogue (D-Cut, W-Cut, Loop Handle, Stitched and Box bags) with GSM specs, a client gallery, enquiry actions and direct WhatsApp contact. Live in production and serving the business today.",
    icon: "fas fa-bag-shopping",
    color: "#34d399",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive", "SEO", "Client Work"],
    image: null,
    live: "https://vaibhavbags.com/",
    code: `https://github.com/${GITHUB_USER}/Vaibhav-Enterprise-`,
    featured: true,
    highlight: "Sold to client",
  },
  {
    title: "Annie AI Assistant",
    subtitle: "Personal project",
    blurb:
      "A Python desktop voice assistant that automates everyday PC tasks — launching applications, running web searches and reading out information through speech synthesis.",
    icon: "fas fa-robot",
    color: "#38bdf8",
    tags: ["Python", "SpeechRecognition", "pyttsx3", "Automation"],
    image: null,
    live: null,
    code: `https://github.com/${GITHUB_USER}/Annie`,
    featured: false,
  },
  {
    title: "Developer Portfolio",
    subtitle: "This website",
    blurb:
      "A responsive single-page portfolio built with React 19 and Vite — scroll-spy navigation, reveal-on-scroll animations, cursor-tracking card spotlights and a hand-written design system with no UI framework.",
    icon: "fas fa-layer-group",
    color: "#61dbfb",
    tags: ["React 19", "Vite", "CSS3", "Netlify"],
    image: null,
    live: null,
    code: `https://github.com/${GITHUB_USER}/portfolio`,
    featured: false,
  },
  {
    title: "Search & Ads Data Quality",
    subtitle: "Professional work",
    blurb:
      "Evaluation workflows across large search and advertising datasets — identifying labelling patterns, flagging inconsistencies and improving the data integrity behind AI models.",
    icon: "fas fa-chart-simple",
    color: "#fbbf24",
    tags: ["Data Analysis", "Quality Rating", "AI Training Data"],
    image: null,
    live: null,
    code: null,
    featured: false,
  },
];

export const sections = [
  { id: "home",       label: "Home",       icon: "fas fa-house" },
  { id: "about",      label: "About",      icon: "fas fa-user" },
  { id: "skills",     label: "Skills",     icon: "fas fa-layer-group" },
  { id: "experience", label: "Experience", icon: "fas fa-briefcase" },
  { id: "projects",   label: "Work",       icon: "fas fa-folder-open" },
  { id: "contact",    label: "Contact",    icon: "fas fa-paper-plane" },
];
