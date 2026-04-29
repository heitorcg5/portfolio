import './globals.css';

const SITE_URL = 'https://heitorcambregarcia.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Heitor Cambre Garcia | Software Engineer Portfolio',
    template: '%s | Heitor Cambre Garcia',
  },
  description:
    'Software engineering portfolio focused on backend and full stack development, showcasing projects, technical skills, and CV download.',
  keywords: [
    'Heitor Cambre Garcia',
    'software engineer',
    'backend developer',
    'full stack developer',
    'react',
    'spring boot',
    'portfolio',
  ],
  authors: [{ name: 'Heitor Cambre Garcia', url: SITE_URL }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Heitor Cambre Garcia | Software Engineer Portfolio',
    description:
      'Portfolio with software projects, technical stack, education, and downloadable CV.',
    siteName: 'Heitor Cambre Portfolio',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heitor Cambre Garcia | Software Engineer Portfolio',
    description:
      'Explore my software engineering projects, skills, and downloadable CV.',
  },
  alternates: {
    canonical: '/',
    languages: {
      es: '/',
      en: '/?lang=en',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: "YkL3S2uHdrdncfBFBDqd-239ru2lSYdsN8FZ_xBTU0g"
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
