import React from 'react';
import { generateCV } from '../../utils/generateCV.jsx';
import { FaEnvelope, FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ personal, profile }) => {
  const handleDownloadCV = () => {
    if (profile) {
      generateCV(profile);
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-name">{personal.name}</h1>
            <span className="hero-name-underline" />
            <p className="hero-role">{personal.role}</p>
            <p className="hero-location">{personal.location}</p>
            <div className="hero-social">
              {personal.links?.github && (
                <a href={personal.links.github} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
                  <FaGithub aria-hidden="true" />
                </a>
              )}
              {personal.links?.linkedin && (
                <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
                  <FaLinkedin aria-hidden="true" />
                </a>
              )}
              {personal.links?.email && (
                <a href={`mailto:${personal.links.email}`} className="hero-social-link" aria-label="Email">
                  <FaEnvelope aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="hero-right">
            <h2>Desarrollador de software en formación</h2>
            <p className="hero-right-text">
              Desarrollo aplicaciones completas con foco en backend, frontend y bases de datos, cuidando arquitectura, calidad y experiencia de usuario.
            </p>
            <div className="hero-links">
              <a href="#projects" className="hero-link">
                Ver mis proyectos
              </a>
              <button onClick={handleDownloadCV} className="hero-link hero-link-download">
                <FaFileDownload aria-hidden="true" />
                <span>Descargar CV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

