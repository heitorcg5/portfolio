import React from 'react';
import Section from '../../common/Section';
import Card from '../../common/Card';
import './Interests.css';

const Interests = ({ interests }) => {
  return (
    <Section id="interests" title="Intereses">
      <div className="interests-grid">
        {interests.map((interest, index) => (
          <Card key={index} className="interest-card">
            <h3 className="interest-area">{interest.area}</h3>
            <p className="interest-description">{interest.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Interests;

