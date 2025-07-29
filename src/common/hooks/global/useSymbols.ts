/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

const useSymbols = () => {
  const currencySymbol = 'KM';
  const weightSymbol = 'kg';
  const dimensionSymbol = 'cm';
  const diameterSymbol = 'mm';

  return {
    currencySymbol,
    weightSymbol,
    dimensionSymbol,
    diameterSymbol,
  };
};

export default useSymbols;
