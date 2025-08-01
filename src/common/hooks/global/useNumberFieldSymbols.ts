/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

const useNumberFieldSymbols = () => {
  const falsyValuePlaceholder = '--';
  const disablingNumberFieldSymbol = '--';

  return { disablingNumberFieldSymbol, falsyValuePlaceholder };
};

export default useNumberFieldSymbols;
