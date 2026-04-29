import React from 'react';
import { pdf, Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import i18n from '../i18n';

/**
 * Helvetica / Helvetica-Bold son fuentes PDF estándar (sin archivos externos).
 * Evitan fallos de glifos que dan las fuentes web embebidas (p. ej. «a» con woff2 + fontkit).
 */

const bulletSep = ' • ';

/** Excluye entradas concretas solo en el CV (la web conserva profile.json tal cual). */
const CV_LANGUAGES_EXCLUDE = new Set(['Dart']);

/** Grupos compactos para el PDF (sin Testing/Auth/Conceptos como apartados; van en frameworks). */
const CV_SKILL_GROUPS = [
  { labelKey: 'cv.skills.languages', keys: ['languages_core', 'languages_secondary'] },
  { labelKey: 'cv.skills.frameworks', keys: ['frameworks', 'testing', 'authentication'] },
  { labelKey: 'cv.skills.databases', keys: ['databases'] },
  { labelKey: 'cv.skills.tools', keys: ['tools'] },
];

const MAX_PROJECT_BULLETS = 5;
const MAX_TECH_ITEMS = 12;

/** Excluye viñetas rutinarias del CV de una página. */
const isRoutineResponsibility = (line) => {
  const t = line.toLowerCase();
  if (/correcci[oó]n\s+de\s+bugs?|bugs?\s+y\s+mejoras|\bbugs?\b.*\bcorrecci/i.test(t)) return true;
  if (/carga\s+de\s+datos|datos\s+de\s+prueba|preparaci[oó]n\s+y\s+carga/i.test(t)) return true;
  if (/\bmantenimiento\b/i.test(t)) return true;
  return false;
};

const styles = StyleSheet.create({
  page: {
    padding: 12,
    fontSize: 9,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  layoutRow: {
    flexDirection: 'row',
    width: '100%',
    minHeight: '100%',
  },
  leftCol: {
    width: '30%',
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightCol: {
    width: '70%',
    backgroundColor: '#ffffff',
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderTop: '1 solid #e5e7eb',
    borderRight: '1 solid #e5e7eb',
    borderBottom: '1 solid #e5e7eb',
  },
  name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    color: '#2563eb',
    marginBottom: 2,
    lineHeight: 1.05,
  },
  role: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#374151',
    marginBottom: 1,
    lineHeight: 1.3,
  },
  location: {
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    color: '#4b5563',
    marginBottom: 8,
  },
  sectionBlock: {
    marginBottom: 9,
  },
  sectionHeader: {
    marginBottom: 4,
    paddingBottom: 2,
    borderBottom: '1 solid #2563eb',
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: '#111827',
  },
  summaryText: {
    fontFamily: 'Helvetica',
    fontSize: 8.6,
    lineHeight: 1.33,
    color: '#1f2937',
    textAlign: 'justify',
  },
  contactLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 7.5,
    color: '#374151',
    marginBottom: 1,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  contactLink: {
    fontFamily: 'Helvetica',
    fontSize: 8.2,
    color: '#2563eb',
    textDecoration: 'none',
    marginBottom: 2,
  },
  projectCard: {
    marginBottom: 7,
    padding: 7,
    border: '1 solid #e5e7eb',
    borderRadius: 6,
    backgroundColor: '#f9fafb',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  projectName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#111827',
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: '76%',
    lineHeight: 1.25,
  },
  projectStatus: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 7.5,
    color: '#2563eb',
    marginLeft: 5,
    flexShrink: 0,
  },
  projectDescription: {
    fontFamily: 'Helvetica',
    fontSize: 8.2,
    color: '#374151',
    marginBottom: 3,
    lineHeight: 1.28,
  },
  bullet: {
    fontFamily: 'Helvetica',
    fontSize: 8.1,
    color: '#374151',
    marginBottom: 1,
    marginLeft: 7,
    lineHeight: 1.25,
  },
  techLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 7.3,
    color: '#374151',
    marginTop: 3,
    marginBottom: 2,
  },
  repoLink: {
    fontFamily: 'Helvetica',
    fontSize: 7.6,
    color: '#2563eb',
    textDecoration: 'none',
    marginTop: 3,
  },
  techTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  techTag: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 7,
    color: '#2563eb',
    border: '1 solid #2563eb',
    borderRadius: 8,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 4,
    paddingRight: 4,
    marginBottom: 2,
    marginRight: 3,
  },
  skillCategoryLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 7.4,
    color: '#374151',
    marginBottom: 1,
    marginTop: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillCategoryFirst: {
    marginTop: 1,
  },
  lineText: {
    fontFamily: 'Helvetica',
    fontSize: 7.9,
    color: '#1f2937',
    lineHeight: 1.25,
    marginBottom: 3,
  },
  educationItem: {
    marginBottom: 5,
  },
  educationDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.2,
    color: '#111827',
    lineHeight: 1.22,
    marginBottom: 1,
  },
  educationInstitution: {
    fontFamily: 'Helvetica',
    fontSize: 7.8,
    color: '#374151',
    lineHeight: 1.2,
    marginBottom: 1,
  },
  educationStatus: {
    fontFamily: 'Helvetica',
    fontSize: 7.5,
    color: '#4b5563',
    lineHeight: 1.25,
    marginTop: 2,
  },
  languageItem: {
    marginBottom: 2,
  },
  languageText: {
    fontFamily: 'Helvetica',
    fontSize: 7.9,
    color: '#1f2937',
    lineHeight: 1.25,
  },
});

const unique = (items) => [...new Set((items || []).filter(Boolean))];

const normalizeWhitespace = (text) => (!text ? '' : text.replace(/\s+/g, ' ').trim());

const joinBullet = (items) => unique(items || []).join(bulletSep);

const compactText = (text, maxChars = 150) => {
  if (!text) return '';
  const oneLine = text.replace(/\s+/g, ' ').trim();
  if (oneLine.length <= maxChars) return oneLine;
  const ellipsis = '…';
  const budget = maxChars - ellipsis.length;
  let cut = oneLine.slice(0, Math.max(0, budget));
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 0) {
    cut = cut.slice(0, lastSpace);
  }
  return `${cut}${ellipsis}`;
};

const PROJECT_DESC_MAX = 500;
const BULLET_MAX = 220;

const getCvT = (lang) => i18n.getFixedT(lang || 'es');

const toShortLink = (url) => {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return `${parsed.hostname.replace(/^www\./, '')}${parsed.pathname}`.replace(/\/$/, '');
  } catch {
    return url;
  }
};

/** Etiqueta mostrada en el CV (ATS): localiza estado terminado/en desarrollo. */
const cvProjectStatusLabel = (status, t, projectIndex) => {
  if (!status) return '';
  // Synapse (primer proyecto): incluir fecha de inicio junto al estado
  if (projectIndex === 0) {
    const raw = status.toLowerCase();
    const inProgress =
      raw.includes('desarrollo') ||
      raw.includes('curso') ||
      raw.includes('progress');
    if (inProgress) {
      return t('cv.project.synapseInProgressDetail', {
        defaultValue: 'En desarrollo · desde febrero de 2026',
      });
    }
    return t('projects.status.done', { defaultValue: status });
  }
  if (projectIndex === 1) {
    return t('cv.project.firstStatus', {
      defaultValue: t('cv.project.academicStatus', {
        defaultValue: t('projects.status.done', { defaultValue: status }),
      }),
    });
  }
  if (projectIndex === 2) {
    return t('cv.project.secondStatus', {
      defaultValue: t('cv.project.academicStatus', {
        defaultValue: t('projects.status.done', { defaultValue: status }),
      }),
    });
  }
  const raw = status.toLowerCase();
  const inProgress =
    raw.includes('desarrollo') ||
    raw.includes('curso') ||
    raw.includes('progress');
  if (inProgress) return t('projects.status.inProgress', { defaultValue: status });
  return t('cv.project.academicStatus', {
    defaultValue: t('projects.status.done', { defaultValue: status }),
  });
};

const CVDocument = ({ profile, lang }) => {
  const t = getCvT(lang);
  const skills = profile.skills || {};

  const projects = (profile.projects || []).slice(0, 3).map((project, projectIndex) => {
    const responsibilities = unique(project.responsibilities || []).filter(Boolean);
    const filteredResp = responsibilities.filter((line) => !isRoutineResponsibility(line));
    const highlights = unique(project.highlights || []).filter(Boolean);
    const useHighlightsForCv = filteredResp.length === 0 && highlights.length > 0;
    const sourceLines = useHighlightsForCv ? highlights : filteredResp;
    const responsibilityBullets = sourceLines.slice(0, MAX_PROJECT_BULLETS);
    const techItems = unique(project.technologies || []).filter(Boolean).slice(0, MAX_TECH_ITEMS);

    const translatedResponsibilities = responsibilityBullets.map((line, bulletIndex) =>
      useHighlightsForCv
        ? t(`projects.items.${projectIndex}.highlights.${bulletIndex}`, {
            defaultValue: line,
          })
        : t(`projects.items.${projectIndex}.responsibilities.${bulletIndex}`, {
            defaultValue: line,
          })
    );

    return {
      ...project,
      translatedName: t(`projects.items.${projectIndex}.name`, { defaultValue: project.name }),
      shortDescription: compactText(
        normalizeWhitespace(
          t(`projects.items.${projectIndex}.description`, { defaultValue: project.description })
        ),
        PROJECT_DESC_MAX
      ),
      responsibilityBullets: translatedResponsibilities,
      techLine: joinBullet(techItems),
      techItems,
    };
  });

  const portfolioLink = profile.links?.portfolio || profile.links?.github || '';

  const skillCategoryBlocks = CV_SKILL_GROUPS.map(({ labelKey, keys }) => {
    let list = unique(keys.flatMap((k) => skills[k] || [])).filter(Boolean);
    if (labelKey === 'cv.skills.languages') {
      list = list.filter((item) => !CV_LANGUAGES_EXCLUDE.has(item));
    }
    return { key: labelKey, label: t(labelKey), list };
  }).filter((b) => b.list.length > 0);

  const localizedRole = t('hero.profileRole', { defaultValue: profile.personal.role });
  const localizedLocation = t('hero.location', { defaultValue: profile.personal.location });
  const cvAboutText = t('cv.aboutText', {
    defaultValue: t('about.summary', { defaultValue: profile.personal.summary || '' }),
  });

  return (
    <Document>
      <Page size="A4" wrap style={styles.page}>
        <View style={styles.layoutRow}>
          <View style={styles.leftCol}>
            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t('cv.sections.contact', { defaultValue: t('contact.title') })}</Text>
              </View>
              <Text style={styles.contactLabel}>{t('cv.header.email')}</Text>
              {profile.links?.email ? (
                <Link src={`mailto:${profile.links.email}`} style={styles.contactLink}>
                  {profile.links.email}
                </Link>
              ) : null}

              <Text style={styles.contactLabel}>{t('cv.header.github')}</Text>
              {profile.links?.github ? (
                <Link src={profile.links.github} style={styles.contactLink}>
                  {toShortLink(profile.links.github)}
                </Link>
              ) : null}

              <Text style={styles.contactLabel}>{t('cv.header.linkedin')}</Text>
              {profile.links?.linkedin ? (
                <Link src={profile.links.linkedin} style={styles.contactLink}>
                  {toShortLink(profile.links.linkedin)}
                </Link>
              ) : null}

              <Text style={styles.contactLabel}>{t('cv.header.website')}</Text>
              {portfolioLink ? (
                <Link src={portfolioLink} style={styles.contactLink}>
                  {toShortLink(portfolioLink)}
                </Link>
              ) : null}
            </View>

            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t('cv.sections.skills')}</Text>
              </View>
              {skillCategoryBlocks.map((block, index) => (
                <View key={block.key} wrap={false}>
                  <Text
                    style={[
                      styles.skillCategoryLabel,
                      index === 0 ? styles.skillCategoryFirst : {},
                    ]}
                  >
                    {block.label}
                  </Text>
                  <Text style={styles.lineText}>{joinBullet(block.list)}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t('cv.sections.education')}</Text>
              </View>
              {(profile.education || []).map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>
                    {t(`education.items.${index}.degree`, { defaultValue: edu.degree })}
                  </Text>
                  <Text style={styles.educationInstitution}>
                    {t(`education.items.${index}.institution`, { defaultValue: edu.institution })}
                  </Text>
                  <Text style={styles.educationStatus}>
                    {t(`education.items.${index}.status`, { defaultValue: edu.status })}
                    {' · '}
                    {t('education.availability')}
                  </Text>
                </View>
              ))}
            </View>

            {profile.languages && profile.languages.length > 0 ? (
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{t('cv.sections.languages')}</Text>
                </View>
                {profile.languages.map((lang, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.languageText}>
                      {t(`languages.items.${index}.language`, { defaultValue: lang.language })}: {t(`languages.items.${index}.level`, { defaultValue: lang.level })}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          <View style={styles.rightCol}>
            <Text style={styles.name}>{profile.personal.name}</Text>
            <Text style={styles.role}>{localizedRole}</Text>
            <Text style={styles.location}>{localizedLocation}</Text>

            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t('cv.sections.about')}</Text>
              </View>
              <Text style={styles.summaryText}>{cvAboutText}</Text>
            </View>

            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t('cv.sections.projects')}</Text>
              </View>
              {projects.map((project, index) => {
                const statusLabel = cvProjectStatusLabel(project.status, t, index);

                return (
                  <View key={index} style={styles.projectCard} wrap={false}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectName}>{project.translatedName}</Text>
                      {statusLabel ? <Text style={styles.projectStatus}>{statusLabel}</Text> : null}
                    </View>
                    <Text style={styles.projectDescription}>{project.shortDescription}</Text>
                    {project.responsibilityBullets.map((bullet, bulletIndex) => (
                      <Text key={bulletIndex} style={styles.bullet}>• {compactText(bullet, BULLET_MAX)}</Text>
                    ))}
                    {project.techItems.length > 0 ? (
                      <>
                        <Text style={styles.techLabel}>{t('cv.project.technologies')}</Text>
                        <View style={styles.techTagsRow}>
                          {project.techItems.map((tech, techIndex) => (
                            <Text key={`${tech}-${techIndex}`} style={styles.techTag}>
                              {tech}
                            </Text>
                          ))}
                        </View>
                      </>
                    ) : null}
                    {project.github ? (
                      <Link src={project.github} style={styles.repoLink}>
                        {t('cv.project.repository', { defaultValue: 'Repository' })}: {toShortLink(project.github)}
                      </Link>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const generateCV = async (profile) => {
  const lang = i18n.resolvedLanguage || i18n.language || 'es';
  const t = getCvT(lang);

  try {
    const blob = await pdf(<CVDocument profile={profile} lang={lang} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${profile.personal.name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(t('cv.errors.generate'), error);
    alert(t('cv.errors.generateRetry'));
  }
};
