import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Crear estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #667eea',
    paddingBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  location: {
    fontSize: 11,
    color: '#888',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
    borderBottom: '1 solid #e0e0e0',
    paddingBottom: 5,
  },
  text: {
    fontSize: 11,
    color: '#333',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  skillCategory: {
    marginBottom: 12,
  },
  skillCategoryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  skillItem: {
    fontSize: 10,
    color: '#555',
    marginBottom: 3,
    marginLeft: 10,
  },
  projectCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  projectName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  projectType: {
    fontSize: 9,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 10,
    color: '#555',
    marginBottom: 8,
    lineHeight: 1.5,
  },
  projectSection: {
    marginTop: 5,
  },
  projectSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 3,
  },
  projectList: {
    fontSize: 9,
    color: '#666',
    marginLeft: 10,
    marginBottom: 3,
  },
  educationItem: {
    marginBottom: 10,
  },
  educationDegree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 3,
  },
  educationInstitution: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  interestCard: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#f8f9fa',
  },
  interestArea: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 3,
  },
  interestDescription: {
    fontSize: 10,
    color: '#555',
    lineHeight: 1.5,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    width: '50%',
    paddingRight: 10,
  },
});

// Componente del documento PDF
const CVDocument = ({ profile }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{profile.personal.name}</Text>
        <Text style={styles.role}>{profile.personal.role}</Text>
        <Text style={styles.location}>{profile.personal.location}</Text>
        <View style={styles.contactInfo}>
          {profile.links.email && <Text>Email: {profile.links.email}</Text>}
          {profile.links.github && <Text>GitHub: {profile.links.github}</Text>}
          {profile.links.linkedin && <Text>LinkedIn: {profile.links.linkedin}</Text>}
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre mí</Text>
        <Text style={styles.text}>{profile.personal.summary}</Text>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Educación</Text>
        {profile.education.map((edu, index) => (
          <View key={index} style={styles.educationItem}>
            <Text style={styles.educationDegree}>{edu.degree}</Text>
            <Text style={styles.educationInstitution}>{edu.institution} - {edu.status}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        {Object.entries(profile.skills).map(([key, skills]) => {
          if (!skills || skills.length === 0) return null;
          const categoryNames = {
            languages_core: 'Lenguajes principales',
            languages_secondary: 'Lenguajes secundarios',
            frameworks: 'Frameworks',
            databases: 'Bases de datos',
            tools: 'Herramientas',
            concepts: 'Conceptos',
            familiarity: 'Conocimiento básico'
          };
          return (
            <View key={key} style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>{categoryNames[key] || key}:</Text>
              <Text style={styles.skillItem}>{skills.join(' • ')}</Text>
            </View>
          );
        })}
      </View>

      {/* Projects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Proyectos</Text>
        {profile.projects.map((project, index) => (
          <View key={index} style={styles.projectCard}>
            <Text style={styles.projectName}>{project.name}</Text>
            <Text style={styles.projectType}>{project.type}</Text>
            <Text style={styles.projectDescription}>{project.description}</Text>
            
            {project.responsibilities && project.responsibilities.length > 0 && (
              <View style={styles.projectSection}>
                <Text style={styles.projectSectionTitle}>Responsabilidades:</Text>
                {project.responsibilities.map((resp, i) => (
                  <Text key={i} style={styles.projectList}>• {resp}</Text>
                ))}
              </View>
            )}
            
            {project.technologies && project.technologies.length > 0 && (
              <View style={styles.projectSection}>
                <Text style={styles.projectSectionTitle}>Tecnologías: {project.technologies.join(', ')}</Text>
              </View>
            )}

            {project.github && (
              <View style={styles.projectSection}>
                <Text style={styles.projectSectionTitle}>Repositorio: {project.github}</Text>
              </View>
            )}
            
            {project.highlights && project.highlights.length > 0 && (
              <View style={styles.projectSection}>
                <Text style={styles.projectSectionTitle}>Destacados:</Text>
                {project.highlights.map((highlight, i) => (
                  <Text key={i} style={styles.projectList}>• {highlight}</Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Interests */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Intereses</Text>
        {profile.interests.map((interest, index) => (
          <View key={index} style={styles.interestCard}>
            <Text style={styles.interestArea}>{interest.area}</Text>
            <Text style={styles.interestDescription}>{interest.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Función para generar y descargar el PDF
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

