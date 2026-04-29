import App from '../App';
import I18nProvider from '../components/I18nProvider';

export default function HomePage() {
  return (
    <I18nProvider>
      <App />
    </I18nProvider>
  );
}
