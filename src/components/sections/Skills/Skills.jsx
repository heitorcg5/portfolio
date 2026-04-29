import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../../common/Section';
import Badge from '../../common/Badge';

const Skills = ({ skills }) => {
  const { t } = useTranslation();

  const skillCategories = [
    { key: 'languages_core', label: t('skills.categories.languages_core'), variant: 'primary' },
    { key: 'languages_secondary', label: t('skills.categories.languages_secondary'), variant: 'secondary' },
    { key: 'frameworks', label: t('skills.categories.frameworks'), variant: 'success' },
    { key: 'testing', label: t('skills.categories.testing'), variant: 'info' },
    { key: 'authentication', label: t('skills.categories.authentication'), variant: 'warning' },
    { key: 'databases', label: t('skills.categories.databases'), variant: 'info' },
    { key: 'tools', label: t('skills.categories.tools'), variant: 'default' },
    { key: 'concepts', label: t('skills.categories.concepts'), variant: 'default' }
  ];

  return (
    <Section id="skills" title={t('skills.title')}>
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

