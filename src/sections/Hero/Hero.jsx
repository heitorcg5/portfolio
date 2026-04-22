import React from 'react';
import { useTranslation } from 'react-i18next';
import { generateCV } from '../../utils/generateCV.jsx';
import { FaEnvelope, FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';

const Hero = ({ personal, profile }) => {
  const { t } = useTranslation();

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
            <p className="hero-role">{t('hero.profileRole')}</p>
            <p className="hero-location">{t('hero.location')}</p>
            <div className="hero-social">
              {personal.links?.github && (
                <a href={personal.links.github} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label={t('hero.social.github')}>
                  <FaGithub aria-hidden="true" />
                </a>
              )}
              {personal.links?.linkedin && (
                <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label={t('hero.social.linkedin')}>
                  <FaLinkedin aria-hidden="true" />
                </a>
              )}
              {personal.links?.email && (
                <a href={`mailto:${personal.links.email}`} className="hero-social-link" aria-label={t('hero.social.email')}>
                  <FaEnvelope aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="hero-right">
            <h2>{t('hero.title')}</h2>
            <p className="hero-right-text">{t('hero.description')}</p>
            <div className="hero-links">
              <a href="#projects" className="hero-link">
                {t('hero.viewProjects')}
              </a>
              <button onClick={handleDownloadCV} className="hero-link hero-link-download">
                <FaFileDownload aria-hidden="true" />
                <span>{t('cv.download')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

