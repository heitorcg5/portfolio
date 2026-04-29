import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../../common/Section';
import Card from '../../common/Card';

const Languages = ({ languages }) => {
  const { t } = useTranslation();

  return (
    <Section id="languages" title={t('languages.title')}>
      <div className="languages-list">
        {languages.map((lang, index) => (
          <Card key={index} className="language-card">
            <div className="language-content">
              <h3 className="language-name">
                {t(`languages.items.${index}.language`, { defaultValue: lang.language })}
              </h3>
              <span className="language-level">
                {t(`languages.items.${index}.level`, { defaultValue: lang.level })}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Languages;


