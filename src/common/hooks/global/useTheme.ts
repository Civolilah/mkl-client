/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import useAccentColor from './useAccentColor';

const useTheme = () => {
  const accentColor = useAccentColor();

  return {
    token: {
      colorPrimary: accentColor,
      colorPrimaryHover: '#2E6CBD',
    },
    components: {
      Button: {
        colorBgContainerDisabled: accentColor,
      },
      Input: { hoverBorderColor: accentColor },
    },
  };
};

export default useTheme;
