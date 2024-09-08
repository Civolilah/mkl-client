/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Languages } from 'src/config';
import { usePathname, useRouter } from 'src/navigation';

export default function useSwitchLanguage() {
  const router = useRouter();
  const pathname = usePathname();

  return (language: string) => {
    localStorage.setItem('MKL-LOCALE', language);

    router.replace({ pathname }, { locale: language as Languages });

    router.refresh();
  };
}
