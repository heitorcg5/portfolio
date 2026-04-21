import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import Section from '../../common/Section';
import './Contact.css';

const Contact = ({ links }) => {
  const contactItems = [
    {
      id: 'email',
      label: 'Email',
      value: links.email,
      href: links.email ? `mailto:${links.email}` : null,
      cta: 'Enviar mensaje',
      Icon: FaEnvelope,
    },
    {
      id: 'github',
      label: 'GitHub',
      value: links.github,
      href: links.github,
      cta: 'Ver repositorios',
      Icon: FaGithub,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: links.linkedin,
      href: links.linkedin,
      cta: 'Conectar',
      Icon: FaLinkedin,
    },
  ].filter((item) => item.value && item.href);

  const getDisplayValue = (item) => {
    if (item.id === 'email') return item.value;

    try {
      const url = new URL(item.value);
      return url.pathname.replace(/^\/+/, '') || url.hostname;
    } catch {
      return item.value;
    }
  };

  return (
    <Section id="contact" title="Contacto">
      <div className="contact-content">
        <p className="contact-text">
          Estoy abierto a oportunidades junior, colaboraciones y proyectos donde pueda aportar valor desde el primer dia.
        </p>
        <div className="contact-links">
          {contactItems.map((item) => {
            const isExternal = item.id !== 'email';
            const Icon = item.Icon;

            return (
              <a
                key={item.id}
                href={item.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="contact-link"
              >
                <span className="contact-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="contact-main">
                  <span className="contact-label">{item.label}</span>
                  <span className="contact-value">{getDisplayValue(item)}</span>
                </span>
                <span className="contact-cta">{item.cta}</span>
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Contact;

