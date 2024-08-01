/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { toast as baseToast, ToastOptions } from 'react-toastify';

type ToastFn = (message: string, options?: ToastOptions) => void;

interface CustomToast {
  success: ToastFn;
  error: ToastFn;
  info: ToastFn;
  warn: ToastFn;
  (message: string, options?: ToastOptions): void;
}

const DEFAULT_TOASTER_OPTIONS: ToastOptions = {
  position: 'top-center',
  autoClose: 1800,
};

const toast: CustomToast = (message: string, options?: ToastOptions) => {
  baseToast(message, { ...DEFAULT_TOASTER_OPTIONS, ...options });
};

toast.success = (message: string, options?: ToastOptions) => {
  baseToast.success(message, {
    ...DEFAULT_TOASTER_OPTIONS,
    ...options,
  });
};

toast.error = (message: string, options?: ToastOptions) => {
  baseToast.error(message, { ...DEFAULT_TOASTER_OPTIONS, ...options });
};

toast.info = (message: string, options?: ToastOptions) => {
  baseToast.info(message, { ...DEFAULT_TOASTER_OPTIONS, ...options });
};

toast.warn = (message: string, options?: ToastOptions) => {
  baseToast.warn(message, { ...DEFAULT_TOASTER_OPTIONS, ...options });
};

export { toast };

export const hexToRgb = (hex: string): string => {
  hex = hex.replace(/^#/, '');

  let bigint;

  if (hex.length === 3) {
    bigint = parseInt(
      hex
        .split('')
        .map((c) => c + c)
        .join(''),
      16
    );
  } else {
    bigint = parseInt(hex, 16);
  }

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};
