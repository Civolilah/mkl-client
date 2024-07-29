import Link from 'next/link';

import { useTranslation } from 'next-i18next';

import Layout from '../common/components/layout/Layout';

const AboutPage = () => {
  const [t] = useTranslation();

  return (
    <Layout title="About | Next.js + TypeScript Example">
      <h1>About</h1>
      <p>This is the about page</p>
      <p>
        <Link href="/">{t('login')}</Link>
      </p>
    </Layout>
  );
};

export default AboutPage;
