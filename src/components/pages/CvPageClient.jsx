'use client';

import I18nProvider from '../I18nProvider';
import RouteTopbar from '../common/RouteTopbar';
import Hero from '../sections/Hero/Hero';
import profile from '../../data/profile.json';

export default function CvPageClient() {
  return (
    <I18nProvider>
      <div className="App">
        <RouteTopbar />
        <Hero personal={{ ...profile.personal, links: profile.links }} profile={profile} />
      </div>
    </I18nProvider>
  );
}
