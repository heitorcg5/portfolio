import ProjectsPageClient from '../../components/pages/ProjectsPageClient';

export const metadata = {
  title: 'Projects',
  description: 'Software engineering projects with responsibilities, stack, and outcomes.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
