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
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response.status === 401) {
    //   localStorage.removeItem('TOKEN');
    //   window.location.href = '/login';
    // }

    console.error(error);

    return Promise.reject(error);
  }
);

const defaultHeaders = () => {
  return {
    'MKL-Api-Token': localStorage.getItem('MKL-TOKEN') as string,
    'MKL-Company-Key': localStorage.getItem('MKL-COMPANY') as string,
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
