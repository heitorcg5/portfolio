import React from 'react';
import Section from '../../common/Section';
import './About.css';

const About = ({ personal }) => {
  return (
    <Section id="about" title="Sobre mí">
      <div className="about-content">
        <p className="about-text">{personal.summary}</p>
      </div>
    </Section>
  );
};

export default About;

