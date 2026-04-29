import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import Section from '../../common/Section';

const Contact = ({ links }) => {
  const { t } = useTranslation();

  const contactItems = [
    {
      id: 'email',
      label: t('contact.items.email'),
      value: links.email,
      href: links.email ? `mailto:${links.email}` : null,
      cta: t('contact.cta.email'),
      Icon: FaEnvelope,
    },
    {
      id: 'github',
      label: t('contact.items.github'),
      value: links.github,
      href: links.github,
      cta: t('contact.cta.github'),
      Icon: FaGithub,
    },
    {
      id: 'linkedin',
      label: t('contact.items.linkedin'),
      value: links.linkedin,
      href: links.linkedin,
      cta: t('contact.cta.linkedin'),
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
    <Section id="contact" title={t('contact.title')}>
      <div className="contact-content">
        <p className="contact-text">{t('contact.intro')}</p>
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

