import React from 'react';
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const projectStatus = project.status || 'Terminado';
  const isInProgress = projectStatus.toLowerCase().includes('desarrollo');

  return (
    <Card className="project-card">
      <div className={`project-status ${isInProgress ? 'project-status-progress' : 'project-status-done'}`}>
        {isInProgress ? <FaClock aria-hidden="true" /> : <FaCheckCircle aria-hidden="true" />}
        <span>{projectStatus}</span>
      </div>
      <div className="project-header">
        <h3 className="project-name">{project.name}</h3>
        <Badge variant="info" className="project-type">{project.type}</Badge>
      </div>
      <p className="project-description">{project.description}</p>
      
      {project.responsibilities && project.responsibilities.length > 0 && (
        <div className="project-section">
          <h4 className="project-section-title">Responsabilidades:</h4>
          <ul className="project-list">
            {project.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>
      )}
      
      {project.technologies && project.technologies.length > 0 && (
        <div className="project-section">
          <h4 className="project-section-title">Tecnologías:</h4>
          <div className="project-technologies">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="success">{tech}</Badge>
            ))}
          </div>
        </div>
      )}
      
      {project.highlights && project.highlights.length > 0 && (
        <div className="project-section">
          <h4 className="project-section-title">Destacados:</h4>
          <ul className="project-list project-highlights">
            {project.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default ProjectCard;

