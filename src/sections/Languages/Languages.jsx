import React from 'react';
import Section from '../../common/Section';
import Card from '../../common/Card';
import './Languages.css';

const Languages = ({ languages }) => {
  return (
    <Section id="languages" title="Idiomas">
      <div className="languages-list">
        {languages.map((lang, index) => (
          <Card key={index} className="language-card">
            <div className="language-content">
              <h3 className="language-name">{lang.language}</h3>
              <span className="language-level">{lang.level}</span>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Languages;


