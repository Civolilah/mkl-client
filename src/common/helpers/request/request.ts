/* eslint-disable no-console */
/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import {
  GLOBAL_ERROR_STATUS_CODE,
  MAX_REQUESTS_LOGIN_REGISTER_ERROR_STATUS_CODE,
  PERMISSIONS_ERROR_STATUS_CODE,
  UNAUTHORIZED_ERROR_STATUS_CODE,
} from '@constants/index';
import axios, { AxiosRequestConfig, Method } from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:8000',
  timeout: 10000,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === UNAUTHORIZED_ERROR_STATUS_CODE) {
      window.dispatchEvent(new CustomEvent('logout_user'));
    }

    if (
      error.response?.status ===
        MAX_REQUESTS_LOGIN_REGISTER_ERROR_STATUS_CODE &&
      typeof error.response?.data === 'string'
    ) {
      window.dispatchEvent(
        new CustomEvent('display_error_toaster', {
          detail: {
            message: error.response.data,
          },
        })
      );
    }

    if (error.response?.status === PERMISSIONS_ERROR_STATUS_CODE) {
      window.dispatchEvent(new CustomEvent('navigate_unauthorized_page'));
    }

    if (error.response?.status === GLOBAL_ERROR_STATUS_CODE) {
      window.dispatchEvent(
        new CustomEvent('display_error_toaster', {
          detail: {
            message:
              error.response.data?.errors.message || 'something_went_wrong',
          },
        })
      );
    }

    return Promise.reject(error);
  }
);

const defaultHeaders = () => {
  return {
    'MKL-TOKEN': (localStorage.getItem('MKL-TOKEN') as string) || '',
    'X-Requested-With': 'XMLHttpRequest',
  };
};

const request = (
  method: Method,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
) => {
  return client({
    method,
    url,
    data,
    ...config,
    headers: { ...defaultHeaders(), ...config?.headers },
    signal: config?.signal,
  });
};

export default request;
