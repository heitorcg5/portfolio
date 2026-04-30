'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = ({ personal, profile }) => {
  const { t } = useTranslation();

  const handleDownloadCV = async () => {
    try {
      // First try client-side PDF generation to avoid server runtime issues.
      if (profile) {
        const { generateCV } = await import('@/lib/generateCV.jsx');
        await generateCV(profile);
        return;
      }

      const response = await fetch('/api/cv');
      if (!response.ok) throw new Error(`CV download failed: ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `CV_${personal.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert(error instanceof Error ? error.message : t('cv.errors.generateRetry'));
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
              <button type="button" onClick={handleDownloadCV} className="hero-link hero-link-download">
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

