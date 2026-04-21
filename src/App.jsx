import React, { useEffect, useRef, useState } from 'react';
import profileData from './data/profile.json';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Skills from './sections/Skills/Skills';
import Projects from './sections/Projects/Projects';
import Interests from './sections/Interests/Interests';
import Education from './sections/Education/Education';
import Languages from './sections/Languages/Languages';
import Contact from './sections/Contact/Contact';
import './App.css';

function App() {
  const [profile, setProfile] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef(null);
  const navLinkRefs = useRef({});
  const navItems = [
    { id: 'about', label: 'Sobre mi' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'interests', label: 'Intereses' },
    { id: 'education', label: 'Educacion' },
    { id: 'languages', label: 'Idiomas' },
    { id: 'contact', label: 'Contacto' },
  ];

  useEffect(() => {
    setProfile(profileData);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .sort((a, b) => a.offsetTop - b.offsetTop);

    if (sections.length === 0) return undefined;

    let ticking = false;

    const updateActiveSection = () => {
      const scrollMarker = window.scrollY + 140;
      let currentSection = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= scrollMarker) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      const atPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atPageBottom) {
        currentSection = sections[sections.length - 1].id;
      }

      setActiveSection((prev) => (prev === currentSection ? prev : currentSection));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [profile]);

  useEffect(() => {
    if (!activeSection) return;
    const navEl = navRef.current;
    const linkEl = navLinkRefs.current[activeSection];
    if (!linkEl || !navEl) return;

    const navRect = navEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    const padding = 10;

    if (linkRect.left < navRect.left + padding) {
      navEl.scrollBy({
        left: linkRect.left - navRect.left - padding,
        behavior: 'smooth',
      });
      return;
    }

    if (linkRect.right > navRect.right - padding) {
      navEl.scrollBy({
        left: linkRect.right - navRect.right + padding,
        behavior: 'smooth',
      });
    }
  }, [activeSection]);

  if (!profile) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="App">
      <header className="app-topbar">
        <div className="app-topbar-inner">
          <span className="app-mark">HC</span>
          <nav className="app-nav" aria-label="Navegacion principal" ref={navRef}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'active' : ''}
                ref={(el) => {
                  navLinkRefs.current[item.id] = el;
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <Hero personal={{ ...profile.personal, links: profile.links }} profile={profile} />
      <About personal={profile.personal} />
      <Projects projects={profile.projects} />
      <Skills skills={profile.skills} />
      <Interests interests={profile.interests} />
      <Education education={profile.education} />
      <Languages languages={profile.languages} />
      <Contact links={profile.links} />
    </div>
  );
}

export default App;

