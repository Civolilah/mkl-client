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

import axios, { AxiosRequestConfig, Method } from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:8000',
  timeout: 10000,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response.status === 401) {
    //   localStorage.removeItem('TOKEN');
    //   window.location.href = '/login';
    // }

    // if (
    //   error.response?.status === MAXIMUM_REQUESTS_ERROR_STATUS_CODE &&
    //   typeof error.response?.data === 'string'
    // ) {
    //   window.dispatchEvent(
    //     new CustomEvent('display_error_toaster', {
    //       detail: {
    //         message: error.response.data,
    //       },
    //     })
    //   );
    // }

    return Promise.reject(error);
  }
);

const defaultHeaders = () => {
  return {
    'MKL-STORE-TOKEN':
      (localStorage.getItem('MKL-STORE-TOKEN') as string) || '',
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
