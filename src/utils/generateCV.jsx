import React from 'react';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 26,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 10,
    borderBottom: '1 solid #2f4f8f',
    paddingBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1d2d4a',
    marginBottom: 2,
  },
  role: {
    fontSize: 11,
    color: '#384d6b',
    marginBottom: 2,
  },
  headerInfo: {
    fontSize: 9,
    color: '#4a5e7f',
    marginBottom: 1,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1d2d4a',
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 10,
    color: '#2f3f5f',
    lineHeight: 1.35,
  },
  projectCard: {
    marginBottom: 6,
    padding: 6,
    border: '1 solid #d7dfef',
    borderRadius: 4,
    backgroundColor: '#f9fbff',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  projectName: {
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#1d2d4a',
    flexGrow: 1,
  },
  projectStatus: {
    fontSize: 8.5,
    color: '#2f6d47',
  },
  projectDescription: {
    fontSize: 9,
    color: '#3d4d6b',
    marginBottom: 2,
    lineHeight: 1.3,
  },
  bullet: {
    fontSize: 8.8,
    color: '#42536f',
    marginBottom: 1,
    marginLeft: 8,
    lineHeight: 1.3,
  },
  techLine: {
    fontSize: 8.8,
    color: '#33496e',
    marginTop: 2,
  },
  twoColumn: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
    paddingRight: 8,
  },
  colLast: {
    flex: 1,
    paddingLeft: 6,
  },
  miniSection: {
    marginBottom: 6,
  },
  lineTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#243a5c',
    marginBottom: 1,
  },
  lineText: {
    fontSize: 9,
    color: '#3a4f72',
    lineHeight: 1.25,
  },
  educationItem: {
    marginBottom: 4,
  },
  educationDegree: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#1d2d4a',
    marginBottom: 1,
  },
  educationInstitution: {
    fontSize: 8.8,
    color: '#3a4f72',
  },
  languageItem: {
    marginBottom: 2,
  },
  languageText: {
    fontSize: 9,
    color: '#3a4f72',
  },
});

const unique = (items) => [...new Set((items || []).filter(Boolean))];

const compactText = (text, maxChars = 150) => {
  if (!text) return '';
  const oneLine = text.replace(/\s+/g, ' ').trim();
  return oneLine.length <= maxChars ? oneLine : `${oneLine.slice(0, maxChars - 1)}…`;
};

const clampList = (list, max = 6) => unique(list).slice(0, max);

const buildProfessionalSummary = (profile) => {
  const skills = profile.skills || {};
  const techPool = unique([
    ...(skills.languages_core || []),
    ...(skills.frameworks || []),
    ...(skills.databases || []),
  ]);

  const prioritized = ['Java', 'Spring Boot', 'React', 'JavaScript', 'C#', '.NET', 'PostgreSQL'];
  const mainTech = clampList(prioritized.filter((tech) => techPool.includes(tech)).concat(techPool), 7);

  return [
    'Experiencia desarrollando aplicaciones completas (backend, frontend y bases de datos).',
    `Tecnologías principales: ${mainTech.join(', ')}.`,
    'Enfoque en construir software robusto, mantenible y bien estructurado con buenas prácticas de arquitectura.',
  ].join(' ');
};

const CVDocument = ({ profile }) => {
  const skills = profile.skills || {};
  const groupedSkills = {
    Languages: clampList([...(skills.languages_core || []), ...(skills.languages_secondary || [])], 10),
    Frameworks: clampList([...(skills.frameworks || []), ...(skills.testing || []), ...(skills.authentication || [])], 10),
    Databases: clampList(skills.databases || [], 5),
    Tools: clampList(skills.tools || [], 8),
  };

  const projects = (profile.projects || []).slice(0, 2).map((project) => {
    const bullets = clampList([...(project.responsibilities || []), ...(project.highlights || [])], 4);
    return {
      ...project,
      shortDescription: compactText(project.description, 140),
      bullets,
      shortTechnologies: clampList(project.technologies || [], 6),
    };
  });

  const portfolioLink = profile.links?.portfolio || profile.links?.github || '';
  const summary = buildProfessionalSummary(profile);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{profile.personal.name}</Text>
          <Text style={styles.role}>{profile.personal.role}</Text>
          <Text style={styles.headerInfo}>{profile.personal.location}</Text>
          {profile.links?.email && <Text style={styles.headerInfo}>Email: {profile.links.email}</Text>}
          {profile.links?.linkedin && <Text style={styles.headerInfo}>LinkedIn: {profile.links.linkedin}</Text>}
          {portfolioLink && <Text style={styles.headerInfo}>Portfolio: {portfolioLink}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil Profesional</Text>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Proyectos Principales</Text>
          {projects.map((project, index) => (
            <View key={index} style={styles.projectCard} wrap={false}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                {project.status && <Text style={styles.projectStatus}>{project.status}</Text>}
              </View>
              <Text style={styles.projectDescription}>{project.shortDescription}</Text>
              {project.bullets.map((bullet, bulletIndex) => (
                <Text key={bulletIndex} style={styles.bullet}>• {compactText(bullet, 110)}</Text>
              ))}
              {project.shortTechnologies.length > 0 && (
                <Text style={styles.techLine}>Tecnologías: {project.shortTechnologies.join(', ')}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.twoColumn}>
          <View style={styles.col}>
            <View style={styles.miniSection}>
              <Text style={styles.sectionTitle}>Habilidades</Text>
              <Text style={styles.lineTitle}>Languages</Text>
              <Text style={styles.lineText}>{groupedSkills.Languages.join(', ')}</Text>
              <Text style={styles.lineTitle}>Frameworks</Text>
              <Text style={styles.lineText}>{groupedSkills.Frameworks.join(', ')}</Text>
              <Text style={styles.lineTitle}>Databases</Text>
              <Text style={styles.lineText}>{groupedSkills.Databases.join(', ')}</Text>
              <Text style={styles.lineTitle}>Tools</Text>
              <Text style={styles.lineText}>{groupedSkills.Tools.join(', ')}</Text>
            </View>
          </View>

          <View style={styles.colLast}>
            <View style={styles.miniSection}>
              <Text style={styles.sectionTitle}>Educación</Text>
              {(profile.education || []).map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  <Text style={styles.educationInstitution}>{edu.institution} - {edu.status}</Text>
                </View>
              ))}
            </View>

            {profile.languages && profile.languages.length > 0 && (
              <View style={styles.miniSection}>
                <Text style={styles.sectionTitle}>Idiomas</Text>
                {profile.languages.map((lang, index) => (
                  <View key={index} style={styles.languageItem}>
                    <Text style={styles.languageText}>{lang.language}: {lang.level}</Text>
                  </View>
                ))}
              </View>
            )}
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

