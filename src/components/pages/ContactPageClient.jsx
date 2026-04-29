'use client';

import I18nProvider from '../I18nProvider';
import RouteTopbar from '../common/RouteTopbar';
import Contact from '../sections/Contact/Contact';
import profile from '../../data/profile.json';

export default function ContactPageClient() {
  return (
    <I18nProvider>
      <div className="App">
        <RouteTopbar />
        <Contact links={profile.links} />
      </div>
    </I18nProvider>
  );
}
