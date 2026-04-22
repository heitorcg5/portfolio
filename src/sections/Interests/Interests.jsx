import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../../common/Section';
import Card from '../../common/Card';
import './Interests.css';

const Interests = ({ interests }) => {
  const { t } = useTranslation();

  return (
    <Section id="interests" title={t('interests.title')}>
      <div className="interests-grid">
        {interests.map((interest, index) => (
          <Card key={index} className="interest-card">
            <h3 className="interest-area">
              {t(`interests.items.${index}.area`, { defaultValue: interest.area })}
            </h3>
            <p className="interest-description">
              {t(`interests.items.${index}.description`, { defaultValue: interest.description })}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Interests;

