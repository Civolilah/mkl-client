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
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const useFormatUnixTime = () => {
  const isMilitaryTime = false;
  const timeZone = 'Europe/Sarajevo';

  return (value: number, format = 'DD.MM.YYYY HH:mm') => {
    if (isMilitaryTime) {
      return dayjs
        .unix(value)
        .tz(timeZone)
        .format(`${format.replace('HH', 'hh')} A`);
    }

    return dayjs.unix(value).tz(timeZone).format(format);
  };
};

export default useFormatUnixTime;
