import React from 'react';
import Section from '../../common/Section';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import './Education.css';

const Education = ({ education }) => {
  return (
    <Section id="education" title="Educación">
      <div className="education-list">
        {education.map((edu, index) => (
          <Card key={index} className="education-card">
            <div className="education-header">
              <h3 className="education-degree">{edu.degree}</h3>
              <Badge variant="info">{edu.status}</Badge>
            </div>
            <p className="education-institution">{edu.institution}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Education;

