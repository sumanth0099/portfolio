import React, { useEffect, useMemo, useState } from "react";
import "./Portfolio.css";

import {
  Github, Linkedin, Mail, Phone, ExternalLink, Sparkles, Award, Zap, Rocket, Trophy, Star, Download,
} from "lucide-react";

import {
  SECTIONS, PROFILE, STATS, SUMMARY, EDUCATION, SKILLS, PROJECTS, CODING_PROFILES, CERTIFICATIONS, EXPERIENCE
} from "./data.js";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("summary");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const sectionIcon = useMemo(() => ({
    summary: Sparkles,
    education: Award,
    skills: Zap,
    projects: Rocket,
    coding: Trophy,
    certifications: Star,
  }), []);

  const ActiveIcon = sectionIcon[activeSection] || Sparkles;

  return (
    <div className="pf">
      <div
        className="pf__cursorGlow"
        style={{ left: mouse.x, top: mouse.y }}
        aria-hidden="true"
      />

      <header className="pf__hero">
        <div className="pf__heroInner">
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
            {STATS.map((s) => (
              <div className="pf__stat" key={s.label}>
                <div className="pf__statValue">{s.value}</div>
                <div className="pf__statLabel">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="pf__layout">
        <aside className="pf__nav">
          {SECTIONS.map((s) => {
            const Icon = sectionIcon[s.id] || Sparkles;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                className={`pf__navItem ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveSection(s.id)}
                type="button"
              >
                <Icon size={18} />
                <span>{s.label}</span>
              </button>
            );
          })}
        </aside>

        <main className="pf__content">
          <section className="pf__card">
            <h2 className="pf__title">
              <ActiveIcon size={22} /> {SECTIONS.find((s) => s.id === activeSection)?.label}
            </h2>

            {/* 👇 SUMMARY WITH EXPERIENCE SECTION */}
            {activeSection === "summary" && (
              <div className="pf__block">
                <p className="pf__text">{SUMMARY}</p>
                
                {/* NEW EXPERIENCE SECTION */}
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
            )}

            {activeSection === "education" && (
              <div className="pf__grid">
                {EDUCATION.map((e, i) => (
                  <article className="pf__tile" key={e.title}>
                    <h3 className="pf__tileTitle">{e.title}</h3>
                    <p className="pf__muted">{e.institution}</p>
                    <p className="pf__highlight">{e.gpa} CGPA</p>
                    <p className="pf__muted">{e.duration}</p>
                  </article>
                ))}
              </div>
            )}

            {activeSection === "skills" && (
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
            )}

            {activeSection === "projects" && (
              <div className="pf__grid">
                {PROJECTS.map((p) => (
                  <article className="pf__tile pf__tile--hover" key={p.title}>
                    <h3 className="pf__tileTitle">{p.title}</h3>
                    <p className="pf__text">{p.description}</p>
                    <div className="pf__pillRow">
                      {p.tags.map((t) => (
                        <span className="pf__pill" key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="pf__actions">
                      {p.live && (
                        <a className="pf__link" href={p.live} target="_blank" rel="noreferrer">
                          Live <ExternalLink size={16} />
                        </a>
                      )}
                      {p.github && (
                        <a className="pf__link" href={p.github} target="_blank" rel="noreferrer">
                          GitHub <Github size={16} />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activeSection === "coding" && (
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
            )}

            {activeSection === "certifications" && (
              <div className="pf__grid">
                {CERTIFICATIONS.map((c) => (
                  <article className="pf__tile pf__tile--hover" key={c.name}>
                    <h3 className="pf__tileTitle">{c.name}</h3>
                    <p className="pf__muted">{c.issuer}</p>
                    <div className="pf__actions">
                      <a className="pf__link" href={c.link} target="_blank" rel="noreferrer">
                        View <ExternalLink size={16} />
                      </a>
                      <a className="pf__link" href={c.downloadLink}>
                        Download <Download size={16} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
