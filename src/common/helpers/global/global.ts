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
      toast.success(t(message));
    },
    error: (message: string) => {
      toast.error(t(message));
    },
    loading: (message?: string) => {
      toast.loading(t(message ?? 'processing'));
    },
    dismiss: () => {
      toast.dismiss();
    },
  };
};
