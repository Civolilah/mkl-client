/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

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
