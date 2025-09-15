/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction } from 'react';

import { cloneDeep, set } from 'lodash';

import { CompanyDetailsType } from '../../CompanyDetails';

interface Params {
  setCompanyDetails: Dispatch<SetStateAction<CompanyDetailsType | undefined>>;
}

const useHandleChange = ({ setCompanyDetails }: Params) => {
  return (property: keyof CompanyDetailsType, value: string) => {
    setCompanyDetails((currentCompanyDetails) => {
      if (!currentCompanyDetails) return currentCompanyDetails;

      const updatedCompanyDetails = cloneDeep(currentCompanyDetails);
      set(updatedCompanyDetails, property, value);

      return updatedCompanyDetails;
    });
  };
};

export default useHandleChange;
