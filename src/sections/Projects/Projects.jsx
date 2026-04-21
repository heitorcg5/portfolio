import React from 'react';
import Section from '../../common/Section';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = ({ projects }) => {
  return (
    <Section id="projects" title="Proyectos">
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;

