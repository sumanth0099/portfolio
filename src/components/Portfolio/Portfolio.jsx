import React, { useEffect, useState, useMemo, useRef } from "react";
import "./Portfolio.css";

import {
  Github, Linkedin, Mail, Phone, ExternalLink, Sparkles, Award, Zap, Rocket, Trophy, Star, Download,
} from "lucide-react";

import {
  SECTIONS, PROFILE, STATS, SUMMARY, EDUCATION, SKILLS, PROJECTS, CODING_PROFILES, CERTIFICATIONS, EXPERIENCE
} from "./data.js";

// ────────────────────────────────────────────────
// Reusable small components (memoized where it makes sense)
// ────────────────────────────────────────────────

const StatItem = ({ stat }) => (
  <div className="pf__stat">
    <div className="pf__statValue">{stat.value}</div>
    <div className="pf__statLabel">{stat.label}</div>
  </div>
);

const NavItem = React.memo(({ section, isActive, onClick }) => {
  const Icon = section.icon || Sparkles;
  return (
    <button
      className={`pf__navItem ${isActive ? "is-active" : ""}`}
      onClick={() => onClick(section.id)}
      type="button"
    >
      <Icon size={18} />
      <span>{section.label}</span>
    </button>
  );
});

const ProjectTile = React.memo(({ project }) => (
  <article className="pf__tile pf__tile--hover">
    <h3 className="pf__tileTitle">{project.title}</h3>
    <p className="pf__text">{project.description}</p>
    <div className="pf__pillRow">
      {project.tags.map((t) => (
        <span className="pf__pill" key={t}>{t}</span>
      ))}
    </div>
    <div className="pf__actions">
      {project.live && (
        <a className="pf__link" href={project.live} target="_blank" rel="noreferrer">
          Live <ExternalLink size={16} />
        </a>
      )}
      {project.github && (
        <a className="pf__link" href={project.github} target="_blank" rel="noreferrer">
          GitHub <Github size={16} />
        </a>
      )}
    </div>
  </article>
));

const CertificationTile = React.memo(({ cert }) => (
  <article className="pf__tile pf__tile--hover">
    <h3 className="pf__tileTitle">{cert.name}</h3>
    <p className="pf__muted">{cert.issuer}</p>
    <div className="pf__actions">
      <a className="pf__link" href={cert.link} target="_blank" rel="noreferrer">
        View <ExternalLink size={16} />
      </a>
      <a className="pf__link" href={cert.downloadLink}>
        Download <Download size={16} />
      </a>
    </div>
  </article>
));

// ────────────────────────────────────────────────
// Section Content Components (only active one renders)
// ────────────────────────────────────────────────

const SummarySection = () => (
  <div className="pf__block">
    <p className="pf__text">{SUMMARY}</p>
    
    <div className="pf__experience-section">
      <h3 className="pf__experience-title">💼 Professional Experience</h3>
      <div className="pf__grid pf__experience-grid">
        {EXPERIENCE.map((exp, index) => (
          <article key={index} className="pf__tile pf__tile--hover pf__experience-tile">
            <div className="pf__experience-header">
              <span className="pf__experience-icon">{exp.icon}</span>
              <div>
                <h4 className="pf__experience-job-title">{exp.title}</h4>
                <p className="pf__experience-company">{exp.company}</p>
              </div>
            </div>
            <p className="pf__text">{exp.description}</p>
            <span className="pf__experience-duration">{exp.duration}</span>
          </article>
        ))}
      </div>
    </div>
  </div>
);

const EducationSection = () => (
  <div className="pf__grid">
    {EDUCATION.map((e) => (
      <article className="pf__tile" key={e.title}>
        <h3 className="pf__tileTitle">{e.title}</h3>
        <p className="pf__muted">{e.institution}</p>
        <p className="pf__highlight">{e.gpa} CGPA</p>
        <p className="pf__muted">{e.duration}</p>
      </article>
    ))}
  </div>
);

const SkillsSection = () => (
  <div className="pf__grid">
    {SKILLS.map((g) => (
      <article className="pf__tile" key={g.category}>
        <h3 className="pf__tileTitle">{g.category}</h3>
        <div className="pf__pillRow">
          {g.skills.map((sk) => (
            <span className="pf__pill" key={sk}>{sk}</span>
          ))}
        </div>
      </article>
    ))}
  </div>
);

const ProjectsSection = () => (
  <div className="pf__grid">
    {PROJECTS.map((p) => (
      <ProjectTile key={p.title} project={p} />
    ))}
  </div>
);

const CodingSection = () => (
  <div className="pf__grid">
    {CODING_PROFILES.map((c) => (
      <article className="pf__tile pf__tile--hover" key={c.name}>
        <h3 className="pf__tileTitle">{c.name}</h3>
        <p className="pf__text">{c.achievement}</p>
        <a className="pf__link" href={c.url} target="_blank" rel="noreferrer">
          View Profile <ExternalLink size={16} />
        </a>
      </article>
    ))}
  </div>
);

const CertificationsSection = () => (
  <div className="pf__grid">
    {CERTIFICATIONS.map((c) => (
      <CertificationTile key={c.name} cert={c} />
    ))}
  </div>
);

const SECTION_COMPONENTS = {
  summary: SummarySection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  coding: CodingSection,
  certifications: CertificationsSection,
};

// ────────────────────────────────────────────────
// Main Portfolio Component
// ────────────────────────────────────────────────

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState("summary");
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const rafRef = useRef(null);
  
    useEffect(() => {
      const onMove = (e) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setMouse({ x: e.clientX, y: e.clientY });
        });
      };
  
      window.addEventListener("mousemove", onMove);
      return () => {
        window.removeEventListener("mousemove", onMove);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);
  
    const memoizedSections = useMemo(
      () => SECTIONS.map(s => ({
        ...s,
        icon: {
          summary: Sparkles,
          education: Award,
          skills: Zap,
          projects: Rocket,
          coding: Trophy,
          certifications: Star,
        }[s.id] || Sparkles
      })),
      []
    );
  
    const ActiveIcon = memoizedSections.find(s => s.id === activeSection)?.icon || Sparkles;
    const ActiveContent = SECTION_COMPONENTS[activeSection] || (() => null);
  
    return (
      <div className="pf">
        <div
          className="pf__cursorGlow"
          style={{ left: `${mouse.x}px`, top: `${mouse.y}px` }}
          aria-hidden="true"
        />
  
        <header className="pf__hero">
          <div className="pf__heroInner">
            {/* ← Profile picture added here */}
            <ProfileAvatar />
  
            <h1 className="pf__name">{PROFILE.name}</h1>
            <p className="pf__role">
              <Sparkles size={18} /> {PROFILE.role} <Sparkles size={18} />
            </p>
  
            <div className="pf__ctaRow">
              <a className="pf__btn pf__btn--email" href={`mailto:${PROFILE.email}`}>
                <Mail size={18} /> Email
              </a>
              <a className="pf__btn pf__btn--phone" href={`tel:${PROFILE.phone}`}>
                <Phone size={18} /> Phone
              </a>
              <a className="pf__btn pf__btn--linkedin" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a className="pf__btn pf__btn--github" href={PROFILE.github} target="_blank" rel="noreferrer">
                <Github size={18} /> GitHub
              </a>
            </div>
  
            <div className="pf__stats">
              {STATS.map((s) => <StatItem key={s.label} stat={s} />)}
            </div>
          </div>
        </header>
  
        {/* rest of the layout unchanged */}
        <div className="pf__layout">
          <aside className="pf__nav">
            {memoizedSections.map((s) => (
              <NavItem
                key={s.id}
                section={s}
                isActive={activeSection === s.id}
                onClick={setActiveSection}
              />
            ))}
          </aside>
  
          <main className="pf__content">
            <section className="pf__card">
              <h2 className="pf__title">
                <ActiveIcon size={22} /> {SECTIONS.find((s) => s.id === activeSection)?.label}
              </h2>
  
              <ActiveContent />
            </section>
          </main>
        </div>
      </div>
    );
  }
const ProfileAvatar = () => (
    <div className="pf__avatar-container">
<img
  src="/ProfileAvatar.png"
  alt={`${PROFILE.name} - Profile Picture`}
  className="pf__avatar"
  width={180}
  height={180}
  loading="lazy"
  decoding="async"
/>

    </div>
  );
