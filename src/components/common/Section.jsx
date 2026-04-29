import React from 'react';

const Section = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-container">
        {title && <h2 className="section-title">{title}</h2>}
        <div className="section-content">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;

