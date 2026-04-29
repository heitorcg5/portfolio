import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../../common/Section';

const About = ({ personal }) => {
  const { t } = useTranslation();
  const translatedSummary = t('about.summary', { defaultValue: personal.summary });

  return (
    <Section id="about" title={t('about.title')}>
      <div className="about-content">
        <p className="about-text">{translatedSummary}</p>
      </div>
    </Section>
  );
};

export default About;

