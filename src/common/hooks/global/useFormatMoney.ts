/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import getSymbolFromCurrency from 'currency-symbol-map';
import currency from 'currency.js';

type Options = {
  currencyCode?: string;
  decimalSeparator?: string;
  thousandsSeparator?: string;
  precision?: number;
};

const useFormatMoney = () => {
  const useCurrencySymbol = false;

  const determinePattern = (intlFormat: string): string | null => {
    try {
      const numberRegex = /\d/;
      const spaceRegex = /\s/;

      let firstNumberIndex = -1;
      let lastNumberIndex = -1;

      for (let i = 0; i < intlFormat.length; i++) {
        if (numberRegex.test(intlFormat[i])) {
          if (firstNumberIndex === -1) {
            firstNumberIndex = i;
          }
          lastNumberIndex = i;
        }
      }

      if (firstNumberIndex === -1) {
        return null;
      }

      const beforeNumbers = intlFormat.substring(0, firstNumberIndex);
      const afterNumbers = intlFormat.substring(lastNumberIndex + 1);

      const symbolPart =
        beforeNumbers.length > 0 ? beforeNumbers : afterNumbers;

      if (!symbolPart) {
        return null;
      }

      const hasSpace = spaceRegex.test(symbolPart);

      const symbolAtStart = beforeNumbers.length > afterNumbers.length;

      if (symbolAtStart) {
        return hasSpace ? '! #' : '!#';
      } else {
        return hasSpace ? '# !' : '#!';
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (amount: number, options?: Options) => {
    const {
      currencyCode = 'USD',
      decimalSeparator = ',',
      thousandsSeparator = '.',
      precision = 2,
    } = options || {};

    const intlFormat = new Intl.NumberFormat(navigator.language || 'en-US', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: useCurrencySymbol ? 'symbol' : 'code',
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    }).format(amount);

    const currentPattern = determinePattern(intlFormat);

    if (!currentPattern) {
      return intlFormat;
    }

    const currencyFormat = currency(amount, {
      symbol:
        currencyCode === 'BAM' || useCurrencySymbol
          ? getSymbolFromCurrency(currencyCode)
          : currencyCode,
      decimal: decimalSeparator,
      separator: thousandsSeparator,
      precision: precision,
      pattern: currencyCode === 'BAM' ? '# !' : currentPattern,
    }).format();

    return currencyFormat;
  };
};

export default useFormatMoney;
