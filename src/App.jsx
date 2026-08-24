import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  profile,
  brand,
  socials,
  skills,
  learning,
  experience,
  education,
  projects,
  sections,
} from "./data/content.js";
import {
  useExperienceTotals,
  useScrollSpy,
  useRevealOnScroll,
  useRotatingText,
  useCardFx,
  useCursorGlow,
  useCountUp,
  useScrollFill,
  useScrollProgress,
  formatDuration,
} from "./hooks.js";

const SECTION_IDS = sections.map((s) => s.id);

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/* The site is served from a subpath (/portfolio/ on GitHub Pages). Vite
   rewrites asset URLs it can see in HTML, CSS and imports, but paths written
   as plain strings in content.js are runtime values it never touches — so
   "/photo.webp" would resolve against the domain root and 404 in production.
   Resolving against BASE_URL here keeps content.js free of build details. */
const asset = (path) => {
  if (!path || /^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, "")}`;
};

/* Renders **bold** markers from the content file as <strong>. */
function RichText({ children }) {
  const parts = String(children).split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

/* The badge beside the name in the nav and footer. Driven by `brand.type`
   in the content file so it can be swapped without touching this component. */
function BrandMark() {
  if (brand.type === "none") return null;

  if (brand.type === "photo") {
    return <img className="brand-mark brand-photo" src={asset(profile.avatar)} alt="" aria-hidden="true" />;
  }

  if (brand.type === "logo" && brand.logo) {
    return <img className="brand-mark brand-photo" src={asset(brand.logo)} alt="" aria-hidden="true" />;
  }

  return (
    <span className="brand-mark brand-initials" style={{ background: brand.color }}>
      {brand.initials}
    </span>
  );
}

/* Bento number that counts up the first time it scrolls into view. */
function CountValue({ value }) {
  const [display, ref] = useCountUp(value);
  return (
    <span className="bento-value" ref={ref}>
      {display}
    </span>
  );
}

/* Infinite tech strip. The list is rendered twice and the track slides by
   exactly one copy, so the loop is seamless. */
function Marquee() {
  const items = [...skills, ...learning];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-run" key={copy}>
            {items.map((item) => (
              <span className="marquee-item" key={item.name} style={{ "--accent": item.color }}>
                <i className={item.icon} />
                {item.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ index, eyebrow, title, accent }) {
  return (
    <header className="section-head" data-reveal>
      <span className="eyebrow">
        <span className="eyebrow-num">{index}</span>
        {eyebrow}
      </span>
      <h2 className="section-title">
        {title} <span className="gradient-text">{accent}</span>
      </h2>
    </header>
  );
}

/* --------------------------------- NAV --------------------------------- */

function Nav({ active, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (event, id) => {
    event.preventDefault();
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav${scrolled ? " is-scrolled" : ""}`} aria-label="Main">
        <a href="#home" className="brand" onClick={(e) => go(e, "home")}>
          <BrandMark />
          <span className="brand-text">{profile.first}</span>
        </a>

        <div className="nav-links">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => go(e, s.id)}
              className={`nav-link${active === s.id ? " is-active" : ""}`}
              aria-current={active === s.id ? "true" : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a className="btn btn-sm btn-primary" href={`mailto:${profile.email}`}>
            <i className="fas fa-paper-plane" /> Hire Me
          </a>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <i className={menuOpen ? "fas fa-xmark" : "fas fa-bars"} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`} id="mobile-menu">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} onClick={(e) => go(e, s.id)}>
            <i className={s.icon} />
            {s.label}
          </a>
        ))}
        <a className="btn btn-primary mobile-cta" href={`mailto:${profile.email}`}>
          <i className="fas fa-paper-plane" /> Hire Me
        </a>
      </div>

      {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

/* -------------------------------- HERO -------------------------------- */

function Hero({ totalLabel }) {
  const rotating = useRotatingText(profile.roles);
  const shipped = projects.filter((p) => p.live || p.code).length;

  return (
    <section id="home" className="hero">
      <div className="hero-copy">
        {profile.available && (
          <span className="badge" data-reveal>
            <span className="badge-dot" />
            {profile.availableText}
          </span>
        )}

        <h1 className="hero-title" data-reveal style={{ "--delay": "70ms" }}>
          <span className="hero-hi">Hi, I&apos;m</span>
          <span className="hero-name gradient-text">{profile.first}</span>
          <span className="hero-role">
            <span className="hero-role-text">{rotating}</span>
            <span className="caret" aria-hidden="true" />
          </span>
        </h1>

        <p className="hero-lead" data-reveal style={{ "--delay": "140ms" }}>
          {profile.headline}
        </p>
        <p className="hero-sub" data-reveal style={{ "--delay": "200ms" }}>
          {profile.intro}
        </p>

        <div className="hero-actions" data-reveal style={{ "--delay": "260ms" }}>
          <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
            <i className="fas fa-folder-open" /> View My Work
          </button>
          {profile.resume && (
            <a className="btn btn-ghost" href={asset(profile.resume)} download>
              <i className="fas fa-download" /> Resume
            </a>
          )}
          <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
            <i className="fas fa-envelope" /> Contact
          </a>
        </div>

        <div className="hero-meta" data-reveal style={{ "--delay": "320ms" }}>
          <span>
            <i className="fas fa-location-dot" /> {profile.location}
          </span>
          <span className="dot-sep" />
          <span>
            <i className="fas fa-briefcase" /> {totalLabel} experience
          </span>
          <span className="dot-sep" />
          <span>
            <i className="fas fa-rocket" /> {shipped} projects shipped
          </span>
        </div>
      </div>

      <div className="hero-visual" data-reveal style={{ "--delay": "160ms" }}>
        <div className="avatar-wrap">
          <span className="avatar-glow" aria-hidden="true" />
          <span className="avatar-ring" aria-hidden="true" />
          <img src={asset(profile.avatar)} alt={profile.name} className="avatar-img" />
        </div>

        {profile.heroChips.map((chip, i) => (
          <div className={`float-chip chip-${i + 1}`} key={chip.label} style={{ color: chip.color }}>
            <i className={chip.icon} /> {chip.label}
          </div>
        ))}
      </div>

      <button className="scroll-cue" onClick={() => scrollTo("about")} aria-label="Scroll to About">
        <span className="mouse">
          <span className="wheel" />
        </span>
        Scroll
      </button>
    </section>
  );
}

/* ------------------------------- ABOUT -------------------------------- */

function About({ totalLabel }) {
  const fx = useCardFx();
  const shipped = projects.filter((p) => p.live || p.code).length;

  const bento = [
    { value: profile.semester, label: "Semester BCA", icon: "fas fa-graduation-cap", color: "#a78bfa" },
    { value: profile.cgpa, label: "Current CGPA", icon: "fas fa-award", color: "#fbbf24" },
    { value: totalLabel, label: "Work Experience", icon: "fas fa-briefcase", color: "#38bdf8" },
    { value: `${shipped}`, label: "Projects Shipped", icon: "fas fa-rocket", color: "#34d399" },
  ];

  return (
    <section id="about">
      <SectionTitle index="01" eyebrow="Introduction" title="About" accent="Me" />

      <div className="about-layout">
        <div className="card about-card" data-reveal {...fx}>
          {profile.summary.map((para, i) => (
            <p key={i}>
              <RichText>{para}</RichText>
            </p>
          ))}
        </div>

        <div className="bento">
          {bento.map((b, i) => (
            <div
              className="card bento-card"
              key={b.label}
              data-reveal
              {...fx}
              style={{ "--delay": `${i * 70}ms`, "--accent": b.color }}
            >
              <i className={`${b.icon} bento-icon`} />
              <CountValue value={b.value} />
              <span className="bento-label">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- SKILLS ------------------------------- */

function Skills() {
  const fx = useCardFx();
  return (
    <section id="skills">
      <SectionTitle index="02" eyebrow="What I work with" title="Tech" accent="Stack" />

      <div className="skills-grid">
        {skills.map((skill, i) => (
          <div
            className="card skill-card"
            key={skill.name}
            data-reveal
            {...fx}
            style={{ "--delay": `${i * 55}ms`, "--accent": skill.color }}
          >
            <span className="skill-icon">
              <i className={skill.icon} />
            </span>
            <span className="skill-name">{skill.name}</span>
            <span className="skill-note">{skill.note}</span>
          </div>
        ))}
      </div>

      <div className="learning-block">
        <div className="learning-head" data-reveal>
          <h3>
            <i className="fas fa-seedling" /> Currently Learning
          </h3>
          <p>Actively working through these — not claiming them as production skills yet.</p>
        </div>

        <div className="learning-grid">
          {learning.map((item, i) => (
            <div
              className="learning-card"
              key={item.name}
              data-reveal
              style={{ "--delay": `${i * 60}ms`, "--accent": item.color }}
            >
              <span className="learning-icon">
                <i className={item.icon} />
              </span>
              <div className="learning-body">
                <span className="learning-name">{item.name}</span>
                <span className="learning-note">{item.note}</span>
              </div>
              <span className="learning-tag">Learning</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- EXPERIENCE ----------------------------- */

function Experience({ durations }) {
  const fx = useCardFx();
  const rail = useRef(null);
  useScrollFill(rail);
  return (
    <section id="experience">
      <SectionTitle index="03" eyebrow="Career so far" title="Work" accent="Experience" />
      <div className="timeline" ref={rail}>
        {experience.map((job, i) => (
          <article
            className="timeline-item"
            key={`${job.company}-${job.role}`}
            data-reveal
            style={{ "--delay": `${i * 80}ms`, "--accent": job.color }}
          >
            <span className="timeline-marker">
              <i className={job.icon} />
            </span>
            <div className="card timeline-card" {...fx}>
              <div className="timeline-top">
                <div>
                  <h3>{job.role}</h3>
                  <span className="subtitle">
                    {job.company} <span className="kind">· {job.kind}</span>
                  </span>
                </div>
                <span className={`chip${job.end ? "" : " chip-live"}`}>
                  {formatDuration(durations[i])}
                  {job.end ? "" : " · Present"}
                </span>
              </div>
              <ul className="bullet-list">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ PROJECTS ------------------------------ */

function Projects() {
  const fx = useCardFx();
  return (
    <section id="projects">
      <SectionTitle index="04" eyebrow="Selected work" title="Featured" accent="Projects" />
      <div className="projects-grid">
        {projects.map((project, i) => (
          <article
            className={`card project-card${project.featured ? " is-featured" : ""}`}
            key={project.title}
            data-reveal
            {...fx}
            style={{ "--delay": `${i * 80}ms`, "--accent": project.color }}
          >
            {project.image && (
              <div className="project-shot">
                <img src={asset(project.image)} alt={`${project.title} screenshot`} loading="lazy" />
              </div>
            )}

            <div className="project-head">
              <span className="card-icon">
                <i className={project.icon} />
              </span>
              {project.highlight && (
                <span className="chip chip-live">
                  <i className="fas fa-circle-check" /> {project.highlight}
                </span>
              )}
            </div>

            <span className="project-sub">{project.subtitle}</span>
            <h3>{project.title}</h3>
            <p className="project-blurb">{project.blurb}</p>

            <div className="tag-row">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="project-links">
              {project.live && (
                <a className="btn btn-primary" href={project.live} target="_blank" rel="noreferrer">
                  <i className="fas fa-arrow-up-right-from-square" /> Visit Live Site
                </a>
              )}
              {project.code && (
                <a className="btn btn-ghost" href={project.code} target="_blank" rel="noreferrer">
                  <i className="fab fa-github" /> Source Code
                </a>
              )}
              {!project.live && !project.code && (
                <span className="btn btn-disabled">
                  {project.wip ? (
                    <>
                      <i className="fas fa-hammer" /> In development
                    </>
                  ) : (
                    <>
                      <i className="fas fa-briefcase" /> Professional work
                    </>
                  )}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ EDUCATION ----------------------------- */

function Education() {
  const fx = useCardFx();
  return (
    <section id="education">
      <SectionTitle index="05" eyebrow="Academics" title="My" accent="Education" />
      <div className="grid-container">
        {education.map((item, i) => (
          <article
            className="card edu-card"
            key={item.degree}
            data-reveal
            {...fx}
            style={{ "--delay": `${i * 80}ms`, "--accent": item.color }}
          >
            <div className="project-head">
              <span className="card-icon">
                <i className={item.icon} />
              </span>
              <span className="chip">{item.score}</span>
            </div>
            <h3>{item.degree}</h3>
            <span className="subtitle">{item.school}</span>
            <p>{item.detail}</p>
            <span className="edu-period">
              <i className="fas fa-calendar" /> {item.period}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- CONTACT ------------------------------ */

function Contact() {
  const fx = useCardFx();
  return (
    <section id="contact">
      <SectionTitle index="06" eyebrow="Get in touch" title="Let's Work" accent="Together" />

      <div className="card contact-cta" data-reveal {...fx}>
        <h3>Have a project in mind?</h3>
        <p>
          I am open to freelance website work and junior developer roles. Tell me what you need and
          I will reply within a day.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            <i className="fas fa-envelope" /> {profile.email}
          </a>
          <a className="btn btn-ghost" href={`tel:${profile.phone}`}>
            <i className="fas fa-phone-volume" /> {profile.phoneLabel}
          </a>
        </div>
      </div>

      <div className="social-grid">
        {socials.map((s, i) => (
          <a
            key={s.id}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noreferrer" : undefined}
            className="card social-card"
            data-reveal
            {...fx}
            style={{ "--delay": `${i * 55}ms`, "--accent": s.color }}
          >
            <span className="social-icon">
              <i className={s.icon} />
            </span>
            <span className="social-body">
              <span className="social-label">{s.label}</span>
              <span className="social-handle">{s.handle}</span>
            </span>
            <i className="fas fa-arrow-right social-arrow" />
          </a>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- APP -------------------------------- */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { durations, totalLabel } = useExperienceTotals(experience);
  const active = useScrollSpy(SECTION_IDS);
  const progress = useScrollProgress();
  useCursorGlow();
  useRevealOnScroll();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="cursor-glow" aria-hidden="true" />

      <div className="progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />

      <div className="ambient" aria-hidden="true">
        <span className="glow glow-a" />
        <span className="glow glow-b" />
        <span className="glow glow-c" />
        <span className="grid-overlay" />
        <span className="noise" />
      </div>

      <Nav active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="shell">
        <Hero totalLabel={totalLabel} />
        <Marquee />
        <About totalLabel={totalLabel} />
        <Skills />
        <Experience durations={durations} />
        <Projects />
        <Education />
        <Contact />

        <footer>
          <div className="footer-inner">
            <span className="brand">
              <BrandMark />
              <span className="brand-text">{profile.name}</span>
            </span>
            <p>
              &copy; {new Date().getFullYear()} {profile.name}. Built with React &amp; Vite.
            </p>
            <button className="to-top" onClick={() => scrollTo("home")} aria-label="Back to top">
              <i className="fas fa-arrow-up" />
            </button>
          </div>
        </footer>
      </main>
    </>
  );
}
