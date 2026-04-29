'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/projects', label: 'Projects' },
  { href: '/cv', label: 'CV' },
  { href: '/contact', label: 'Contact' },
];

const RouteTopbar = () => {
  const pathname = usePathname();

  return (
    <header className="app-topbar">
      <div className="app-topbar-inner">
        <span className="app-mark">HC</span>
        <nav className="app-nav" aria-label="Site navigation">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default RouteTopbar;
