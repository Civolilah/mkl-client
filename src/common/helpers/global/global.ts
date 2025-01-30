/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { toast, ToastOptions } from 'react-toastify';

import { useTranslation } from '@hooks/index';

const toastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
};

let globalLoadingToastId: string | number | undefined;

export const useToast = () => {
  const t = useTranslation();

  return {
    success: (message: string) => {
      if (globalLoadingToastId) {
        toast.update(globalLoadingToastId, {
          render: t(message),
          type: 'success',
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        globalLoadingToastId = undefined;
      } else {
        toast.success(t(message), toastOptions);
      }
    },
    error: (message: string) => {
      if (globalLoadingToastId) {
        toast.update(globalLoadingToastId, {
          render: t(message),
          type: 'error',
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        globalLoadingToastId = undefined;
      } else {
        toast.error(t(message), toastOptions);
      }
    },
    loading: (message?: string) => {
      globalLoadingToastId = toast.loading(t(message ?? 'processing'), {
        ...toastOptions,
        autoClose: false,
        pauseOnHover: false,
        closeOnClick: false,
      });
    },
    info: (message: string) => {
      toast.info(t(message), toastOptions);
    },
    dismiss: () => {
      if (globalLoadingToastId) {
        toast.dismiss(globalLoadingToastId);
        globalLoadingToastId = undefined;
      }
    },
  };
};

type RouteParams = {
  [key: string]: string;
};

export const route = (url: string, params: RouteParams): string => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    const pattern = new RegExp(`:${key}`, 'g');
    return acc.replace(pattern, value.toString());
  }, url);
};

export const endpoint = (url: string, params: RouteParams): string => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    const pattern = new RegExp(`:${key}`, 'g');
    return acc.replace(pattern, value?.toString() ?? '');
  }, url);
};
