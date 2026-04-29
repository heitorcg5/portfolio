import CvPageClient from '../../components/pages/CvPageClient';

export const metadata = {
  title: 'CV',
  description: 'Download and review my updated software engineering curriculum vitae.',
  alternates: { canonical: '/cv' },
};

export default function CvPage() {
  return <CvPageClient />;
}
