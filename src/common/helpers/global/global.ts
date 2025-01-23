/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { toast } from 'react-hot-toast';

import { useTranslation } from '@hooks/index';

export const useToast = () => {
  const t = useTranslation();

  return {
    success: (message: string) => {
      toast.success(t(message), { id: '1212' });
    },
    error: (message: string) => {
      toast.error(t(message), { id: '1212' });
    },
    loading: (message?: string) => {
      toast.loading(t(message ?? 'processing'), {
        id: '1212',
      });
    },
    dismiss: () => {
      toast.dismiss('1212');
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
