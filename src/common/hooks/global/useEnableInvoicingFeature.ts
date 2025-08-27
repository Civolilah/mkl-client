/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useAtomValue } from 'jotai';

import { userCompanyAtom } from '@components/general/PrivateRoute';

const ENABLED_COUNTRIES_IDS = ['840'];

const useEnableInvoicingFeature = () => {
  const userCompanyDetails = useAtomValue(userCompanyAtom);

  return {
    isEnabledInvoicing: ENABLED_COUNTRIES_IDS.includes(
      userCompanyDetails?.company.country_id || ''
    ),
  };
};

export default useEnableInvoicingFeature;
