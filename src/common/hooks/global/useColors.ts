/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

const COLORS = {
  $1: '#e0e0e0', // Border color
  $2: '#ffffff', // White background color (classic)
  $3: '#fafafa', // App background color
  $4: '#f1f1f1', // Footer background color
  $5: '#a0a0a0', // Text grayed out color
  $6: '#ffffff', // Navigation bar background color
  $7: '#d9ecff', // Navigation bar item hover background color
  $8: '#000000', // Navigation bar item hover color (#1E90FF)
  $9: '#19b69c', // Navigation bar icon hover color
  $10: '#505050', // Navigation bar icon color
};

const useColors = () => {
  return COLORS;
};

export default useColors;
