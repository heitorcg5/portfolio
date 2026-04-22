import React from 'react';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import i18n from '../i18n';

/**
 * Helvetica / Helvetica-Bold son fuentes PDF estándar (sin archivos externos).
 * Evitan fallos de glifos que dan las fuentes web embebidas (p. ej. «a» con woff2 + fontkit).
 */

const bulletSep = ' • ';

/** Grupos compactos para el PDF (sin Testing/Auth/Conceptos como apartados; van en frameworks). */
const CV_SKILL_GROUPS = [
  { labelKey: 'cv.skills.languages', keys: ['languages_core', 'languages_secondary'] },
  { labelKey: 'cv.skills.frameworks', keys: ['frameworks', 'testing', 'authentication'] },
  { labelKey: 'cv.skills.databases', keys: ['databases'] },
  { labelKey: 'cv.skills.tools', keys: ['tools'] },
];

const MAX_PROJECT_BULLETS = 4;
const MAX_TECH_ITEMS = 9;

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
    padding: 14,
    paddingBottom: 12,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    lineHeight: 1.32,
    color: '#24324a',
  },
  header: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottom: '1 solid #cfd8ea',
  },
  name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 17,
    color: '#121c2f',
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  role: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#3d4f6e',
    marginBottom: 3,
  },
  headerInfo: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#4a5f80',
    marginBottom: 1,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  colLeft: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '70%',
    paddingRight: 10,
    maxWidth: '70%',
    minWidth: 0,
  },
  colRight: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '30%',
    maxWidth: '30%',
    paddingLeft: 10,
    borderLeft: '1 solid #dfe6f4',
    minHeight: '100%',
  },
  sectionBlock: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#162238',
    marginBottom: 5,
    letterSpacing: 0.15,
    textTransform: 'uppercase',
  },
  summaryText: {
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: '#2c3e5c',
    lineHeight: 1.32,
    width: '100%',
  },
  projectCard: {
    marginBottom: 7,
    padding: 7,
    border: '1 solid #d8e2f4',
    borderRadius: 4,
    backgroundColor: '#f8faff',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  projectName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#162238',
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: '76%',
    lineHeight: 1.28,
  },
  projectStatus: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: '#1f6b45',
    marginTop: 1,
    marginLeft: 6,
    flexShrink: 0,
  },
  projectDescription: {
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: '#334764',
    marginBottom: 4,
    lineHeight: 1.3,
    width: '100%',
  },
  bullet: {
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: '#3e5372',
    marginBottom: 1,
    marginLeft: 8,
    lineHeight: 1.28,
    paddingLeft: 3,
  },
  techLine: {
    fontFamily: 'Helvetica',
    fontSize: 8.8,
    color: '#31486b',
    marginTop: 4,
    lineHeight: 1.28,
  },
  miniSection: {
    marginBottom: 8,
  },
  lineTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#243a5c',
    marginBottom: 4,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.15,
  },
  skillCategoryLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    color: '#243a5c',
    marginBottom: 2,
    marginTop: 5,
    letterSpacing: 0.02,
  },
  skillCategoryFirst: {
    marginTop: 1,
  },
  lineText: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#3a4f72',
    lineHeight: 1.28,
    marginBottom: 4,
  },
  educationItem: {
    marginBottom: 6,
  },
  educationDegree: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#162238',
    marginBottom: 2,
    lineHeight: 1.25,
  },
  educationInstitution: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#42556f',
    marginBottom: 1,
    lineHeight: 1.25,
  },
  educationStatus: {
    fontFamily: 'Helvetica',
    fontSize: 8.5,
    color: '#4a5f80',
    marginBottom: 1,
    lineHeight: 1.25,
  },
  languageItem: {
    marginBottom: 2,
  },
  languageText: {
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    color: '#3a4f72',
    lineHeight: 1.28,
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

const PROJECT_DESC_MAX = 215;
const BULLET_MAX = 100;

const getCvT = (lang) => i18n.getFixedT(lang || 'es');

/** Etiqueta mostrada en el CV (ATS): localiza estado terminado/en desarrollo. */
const cvProjectStatusLabel = (status, t) => {
  if (!status) return '';
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

  const projects = (profile.projects || []).slice(0, 2).map((project, projectIndex) => {
    const responsibilities = unique(project.responsibilities || []).filter(Boolean);
    const filtered = responsibilities.filter((line) => !isRoutineResponsibility(line));
    const responsibilityBullets = filtered.slice(0, MAX_PROJECT_BULLETS);
    const techItems = unique(project.technologies || []).filter(Boolean).slice(0, MAX_TECH_ITEMS);

    const translatedResponsibilities = responsibilityBullets.map((line, responsibilityIndex) =>
      t(`projects.items.${projectIndex}.responsibilities.${responsibilityIndex}`, {
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
    };
  });

  const portfolioLink = profile.links?.portfolio || profile.links?.github || '';

  const skillCategoryBlocks = CV_SKILL_GROUPS.map(({ labelKey, keys }) => {
    const list = unique(keys.flatMap((k) => skills[k] || [])).filter(Boolean);
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
        <View style={styles.header}>
          <Text style={styles.name}>{profile.personal.name}</Text>
          <Text style={styles.role}>{localizedRole}</Text>
          <Text style={styles.headerInfo}>{localizedLocation}</Text>
          {profile.links?.email && (
            <Text style={styles.headerInfo}>{t('cv.header.email')}: {profile.links.email}</Text>
          )}
          {profile.links?.github && (
            <Text style={styles.headerInfo}>{t('cv.header.github')}: {profile.links.github}</Text>
          )}
          {profile.links?.linkedin && (
            <Text style={styles.headerInfo}>{t('cv.header.linkedin')}: {profile.links.linkedin}</Text>
          )}
          {portfolioLink && <Text style={styles.headerInfo}>{t('cv.header.website')}: {portfolioLink}</Text>}
        </View>

        <View style={styles.mainRow}>
          <View style={styles.colLeft}>
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>{t('cv.sections.about')}</Text>
              <Text style={styles.summaryText}>{cvAboutText}</Text>
            </View>

            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>{t('cv.sections.projects')}</Text>
              {projects.map((project, index) => {
                const statusLabel = cvProjectStatusLabel(project.status, t);

                return (
                  <View key={index} style={styles.projectCard}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectName}>{project.translatedName}</Text>
                      {statusLabel ? <Text style={styles.projectStatus}>{statusLabel}</Text> : null}
                    </View>
                    <Text style={styles.projectDescription}>{project.shortDescription}</Text>
                    {project.responsibilityBullets.map((bullet, bulletIndex) => (
                      <Text key={bulletIndex} style={styles.bullet}>• {compactText(bullet, BULLET_MAX)}</Text>
                    ))}
                    {project.techLine.length > 0 ? (
                      <Text style={styles.techLine}>{t('cv.project.technologies')}: {project.techLine}</Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.colRight}>
            <View style={styles.miniSection}>
              <Text style={styles.sectionTitle}>{t('cv.sections.skills')}</Text>
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

            <View style={styles.miniSection}>
              <Text style={styles.sectionTitle}>{t('cv.sections.education')}</Text>
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
                  </Text>
                </View>
              ))}
            </View>

            {profile.languages && profile.languages.length > 0 ? (
              <View style={styles.miniSection}>
                <Text style={styles.sectionTitle}>{t('cv.sections.languages')}</Text>
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
