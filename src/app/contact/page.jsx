import ContactPageClient from '../../components/pages/ContactPageClient';

export const metadata = {
  title: 'Contact',
  description: 'Contact information and professional links for collaboration opportunities.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
