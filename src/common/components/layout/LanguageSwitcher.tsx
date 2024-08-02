/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { usePathname, useRouter } from 'src/navigation';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const switchLanguage = (language: string) => {
    router.replace({ pathname }, { locale: language as 'en' | 'tr' });

    router.refresh();
  };
  return <div>LanguageSwitcher</div>;
};

export default LanguageSwitcher;
