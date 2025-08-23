/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import countries from 'i18n-iso-countries';
import { useAtomValue } from 'jotai';

import { userCompanyAtom } from '@components/general/PrivateRoute';

const useResolveCountry = () => {
  const userCompany = useAtomValue(userCompanyAtom);

  return (countryCode: string) => {
    if (!countryCode) {
      return '';
    }

    const country = countries.getName(
      countryCode,
      userCompany?.preference.language || 'en'
    );

    if (!country) {
      return countryCode;
    }

    const countryAlpha3Code = countries.getAlpha3Code(
      country,
      userCompany?.preference.language || 'en'
    );

    return `${country} (${countryAlpha3Code})`;
  };
};

export default useResolveCountry;
