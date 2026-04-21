import React from 'react';
import Section from '../../common/Section';
import Badge from '../../common/Badge';
import './Skills.css';

const Skills = ({ skills }) => {
  const skillCategories = [
    { key: 'languages_core', label: 'Lenguajes (principal)', variant: 'primary' },
    { key: 'languages_secondary', label: 'Lenguajes (exposición académica)', variant: 'secondary' },
    { key: 'frameworks', label: 'Frameworks y plataformas', variant: 'success' },
    { key: 'testing', label: 'Testing', variant: 'info' },
    { key: 'authentication', label: 'Autenticación', variant: 'warning' },
    { key: 'databases', label: 'Bases de datos', variant: 'info' },
    { key: 'tools', label: 'Herramientas de desarrollo', variant: 'default' },
    { key: 'concepts', label: 'Conceptos de ingeniería', variant: 'default' }
  ];

  return (
    <Section id="skills" title="Habilidades">
      <div className="skills-content">
        {skillCategories.map((category) => {
          const skillList = skills[category.key];
          if (!skillList || skillList.length === 0) return null;
          
          return (
            <div key={category.key} className="skill-category">
              <div className="skill-category-header">
                <h3 className="skill-category-title">{category.label}</h3>
                <span className="skill-category-count">{skillList.length}</span>
              </div>
              <div className="skill-badges">
                {skillList.map((skill, index) => (
                  <Badge key={index} variant={category.variant}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Skills;

