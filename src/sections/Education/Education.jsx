import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../../common/Section';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import './Education.css';

const Education = ({ education }) => {
  const { t } = useTranslation();

  return (
    <Section id="education" title={t('education.title')}>
      <div className="education-list">
        {education.map((edu, index) => (
          <Card key={index} className="education-card">
            <div className="education-header">
              <h3 className="education-degree">
                {t(`education.items.${index}.degree`, { defaultValue: edu.degree })}
              </h3>
              <div className="education-status-row">
                <Badge variant="info">
                  {t(`education.items.${index}.status`, { defaultValue: edu.status })}
                </Badge>
                <span className="education-availability">{t('education.availability')}</span>
              </div>
            </div>
            <p className="education-institution">
              {t(`education.items.${index}.institution`, { defaultValue: edu.institution })}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Education;

