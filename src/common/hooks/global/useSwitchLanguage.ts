/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useTranslation } from 'react-i18next';

export default function useSwitchLanguage() {
  const { i18n } = useTranslation();

  return (language: string) => {
    localStorage.setItem('MKL-LOCALE', language);

    i18n.changeLanguage(language);
  };
}
