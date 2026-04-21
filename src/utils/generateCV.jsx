import React from 'react';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

/**
 * Helvetica / Helvetica-Bold son fuentes PDF estándar (sin archivos externos).
 * Evitan fallos de glifos que dan las fuentes web embebidas (p. ej. «a» con woff2 + fontkit).
 */

const bulletSep = ' • ';

/** Texto fijo «Sobre mí» solo en el PDF (sin truncar: el recorte venía de `compactText`). */
const CV_SOBRE_MI_TEXT =
  'Estudiante de Ingeniería del Software con experiencia práctica desarrollando aplicaciones full-stack utilizando Java, JavaScript, C#, Spring Boot, React y .NET. Construyo sistemas completos desde el backend hasta el frontend, enfocándome en arquitectura limpia, fiabilidad y funcionalidad en entornos reales. Actualmente desarrollo proyectos personales para mejorar el diseño de software y la productividad utilizando herramientas modernas.';

/** Grupos compactos para el PDF (sin Testing/Auth/Conceptos como apartados; van en Frameworks). */
const CV_SKILL_GROUPS = [
  { label: 'Lenguajes', keys: ['languages_core', 'languages_secondary'] },
  { label: 'Frameworks', keys: ['frameworks', 'testing', 'authentication'] },
  { label: 'Bases de datos', keys: ['databases'] },
  { label: 'Herramientas', keys: ['tools'] },
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

/** Etiqueta mostrada en el CV (ATS): los completados aparecen como proyecto académico. */
const cvProjectStatusLabel = (status) => {
  if (!status) return '';
  if (status === 'Terminado') return 'Proyecto académico';
  return status;
};

/** Textos del encabezado y rol en español (el perfil puede seguir en inglés para la web). */
const localizeRoleForCv = (role) => {
  if (!role) return '';
  const known = {
    'Software Engineering Student | Backend / Full Stack':
      'Estudiante de Ingeniería del Software | Backend / Full Stack',
  };
  return known[role] || role;
};

const localizeLocationForCv = (location) =>
  (location || '').replace(/\bSpain\b/gi, 'España').trim();

const CVDocument = ({ profile }) => {
  const skills = profile.skills || {};

  const projects = (profile.projects || []).slice(0, 2).map((project) => {
    const responsibilities = unique(project.responsibilities || []).filter(Boolean);
    const filtered = responsibilities.filter((line) => !isRoutineResponsibility(line));
    const responsibilityBullets = filtered.slice(0, MAX_PROJECT_BULLETS);
    const techItems = unique(project.technologies || []).filter(Boolean).slice(0, MAX_TECH_ITEMS);

    return {
      ...project,
      shortDescription: compactText(normalizeWhitespace(project.description), PROJECT_DESC_MAX),
      responsibilityBullets,
      techLine: joinBullet(techItems),
    };
  });

  const portfolioLink = profile.links?.portfolio || profile.links?.github || '';

  const skillCategoryBlocks = CV_SKILL_GROUPS.map(({ label, keys }) => {
    const list = unique(keys.flatMap((k) => skills[k] || [])).filter(Boolean);
    return { key: label, label, list };
  }).filter((b) => b.list.length > 0);

  return (
    <Document>
      <Page size="A4" wrap style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{profile.personal.name}</Text>
          <Text style={styles.role}>{localizeRoleForCv(profile.personal.role)}</Text>
          <Text style={styles.headerInfo}>{localizeLocationForCv(profile.personal.location)}</Text>
          {profile.links?.email && (
            <Text style={styles.headerInfo}>Correo: {profile.links.email}</Text>
          )}
          {profile.links?.github && (
            <Text style={styles.headerInfo}>GitHub: {profile.links.github}</Text>
          )}
          {profile.links?.linkedin && (
            <Text style={styles.headerInfo}>LinkedIn: {profile.links.linkedin}</Text>
          )}
          {portfolioLink && <Text style={styles.headerInfo}>Sitio web: {portfolioLink}</Text>}
        </View>

        <View style={styles.mainRow}>
          <View style={styles.colLeft}>
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Sobre mí</Text>
              <Text style={styles.summaryText}>{CV_SOBRE_MI_TEXT}</Text>
            </View>

            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Proyectos</Text>
              {projects.map((project, index) => {
                const statusLabel = cvProjectStatusLabel(project.status);

                return (
                  <View key={index} style={styles.projectCard}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectName}>{project.name}</Text>
                      {statusLabel ? <Text style={styles.projectStatus}>{statusLabel}</Text> : null}
                    </View>
                    <Text style={styles.projectDescription}>{project.shortDescription}</Text>
                    {project.responsibilityBullets.map((bullet, bulletIndex) => (
                      <Text key={bulletIndex} style={styles.bullet}>• {compactText(bullet, BULLET_MAX)}</Text>
                    ))}
                    {project.techLine.length > 0 ? (
                      <Text style={styles.techLine}>Tecnologías: {project.techLine}</Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.colRight}>
            <View style={styles.miniSection}>
              <Text style={styles.sectionTitle}>Habilidades</Text>
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
              <Text style={styles.sectionTitle}>Educación</Text>
              {(profile.education || []).map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  <Text style={styles.educationInstitution}>{edu.institution}</Text>
                  <Text style={styles.educationStatus}>{edu.status}</Text>
                </View>
              ))}
            </View>

            {profile.languages && profile.languages.length > 0 ? (
              <View style={styles.miniSection}>
                <Text style={styles.sectionTitle}>Idiomas</Text>
                {profile.languages.map((lang, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.languageText}>{lang.language}: {lang.level}</Text>
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
  try {
    const blob = await pdf(<CVDocument profile={profile} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_${profile.personal.name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al generar el CV:', error);
    alert('Error al generar el CV. Por favor, intenta de nuevo.');
  }
};
