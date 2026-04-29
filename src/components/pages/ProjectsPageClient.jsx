'use client';

import I18nProvider from '../I18nProvider';
import RouteTopbar from '../common/RouteTopbar';
import Projects from '../sections/Projects/Projects';
import profile from '../../data/profile.json';

export default function ProjectsPageClient() {
  return (
    <I18nProvider>
      <div className="App">
        <RouteTopbar />
        <Projects projects={profile.projects} />
      </div>
    </I18nProvider>
  );
}
