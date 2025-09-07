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

import { NotificationsType } from '../../Notifications';

interface Params {
  setNotifications: Dispatch<SetStateAction<NotificationsType | undefined>>;
}

const useHandleChange = ({ setNotifications }: Params) => {
  return (
    property: keyof NotificationsType,
    value: string | number | boolean
  ) => {
    setNotifications((currentNotifications) => {
      if (!currentNotifications) return currentNotifications;

      const updatedNotifications = cloneDeep(currentNotifications);
      set(updatedNotifications, property, value);

      return updatedNotifications;
    });
  };
};

export default useHandleChange;
