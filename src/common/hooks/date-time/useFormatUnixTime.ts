/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useAtomValue } from 'jotai';

import { userCompanyAtom } from '@components/general/PrivateRoute';

dayjs.extend(utc);

const useFormatUnixTime = () => {
  const userCompany = useAtomValue(userCompanyAtom);

  return (value: number, format?: string) => {
    const currentFormat =
      format || `${userCompany?.preference.date_format} HH:mm`;

    if (userCompany?.preference.is_military_time) {
      return dayjs.unix(value).format(`${currentFormat.replace('HH', 'hh')} A`);
    }

    return dayjs.unix(value).format(currentFormat);
  };
};

export default useFormatUnixTime;
