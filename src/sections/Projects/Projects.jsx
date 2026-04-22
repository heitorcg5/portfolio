import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../../common/Section';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = ({ projects }) => {
  const { t } = useTranslation();

  return (
    <Section id="projects" title={t('projects.title')}>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;

