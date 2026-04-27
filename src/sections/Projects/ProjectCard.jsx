import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaCode } from 'react-icons/fa';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import './ProjectCard.css';

const ProjectCard = ({ project, index: projectIndex }) => {
  const { t } = useTranslation();
  const rawProjectStatus = project.status || '';
  const statusLower = rawProjectStatus.toLowerCase();
  const isInProgress =
    statusLower.includes('desarrollo') ||
    statusLower.includes('curso') ||
    statusLower.includes('progress');
  const projectStatus = isInProgress
    ? t('projects.status.inProgress', { defaultValue: rawProjectStatus || t('projects.status.done') })
    : t('projects.status.done', { defaultValue: rawProjectStatus || t('projects.status.done') });
  const projectType =
    project.type === 'Proyecto académico en grupo'
      ? t('projects.type.academicGroup')
      : project.type === 'Proyecto personal'
        ? t('projects.type.personal')
        : project.type;
  const projectName = t(`projects.items.${projectIndex}.name`, { defaultValue: project.name });
  const projectDescription = t(`projects.items.${projectIndex}.description`, { defaultValue: project.description });

  return (
    <Card className="project-card">
      <div className={`project-status ${isInProgress ? 'project-status-progress' : 'project-status-done'}`}>
        {isInProgress ? (
          <FaCode aria-hidden="true" className="project-status-icon project-status-icon-spinning" />
        ) : (
          <FaCheckCircle aria-hidden="true" className="project-status-icon" />
        )}
        <span>{projectStatus}</span>
      </div>
      <div className="project-header">
        <h3 className="project-name">{projectName}</h3>
        <Badge variant="info" className="project-type">{projectType}</Badge>
      </div>
      <p className="project-description">{projectDescription}</p>
      {project.started ? (
        <p className="project-started">
          {t(`projects.items.${projectIndex}.started`, { defaultValue: project.started })}
        </p>
      ) : null}

      {project.responsibilities && project.responsibilities.length > 0 && (
        <div className="project-section">
          <h4 className="project-section-title">{t('projects.sections.responsibilities')}</h4>
          <ul className="project-list">
            {project.responsibilities.map((responsibility, responsibilityIndex) => (
              <li key={responsibilityIndex}>
                {t(`projects.items.${projectIndex}.responsibilities.${responsibilityIndex}`, { defaultValue: responsibility })}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {project.technologies && project.technologies.length > 0 && (
        <div className="project-section">
          <h4 className="project-section-title">{t('projects.sections.technologies')}</h4>
          <div className="project-technologies">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="success">{tech}</Badge>
            ))}
          </div>
        </div>
      )}
      
      {project.highlights && project.highlights.length > 0 && (
        <div className="project-section">
          <h4 className="project-section-title">{t('projects.sections.highlights')}</h4>
          <ul className="project-list project-highlights">
            {project.highlights.map((highlight, highlightIndex) => (
              <li key={highlightIndex}>
                {t(`projects.items.${projectIndex}.highlights.${highlightIndex}`, { defaultValue: highlight })}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.github && (
        <div className="project-section project-repo-section">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-repo-link"
          >
            {t('projects.viewRepository')}
          </a>
        </div>
      )}
    </Card>
  );
};

export default ProjectCard;

