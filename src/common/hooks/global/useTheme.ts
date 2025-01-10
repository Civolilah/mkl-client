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
import useColors from './useColors';

const useTheme = () => {
  const colors = useColors();
  const accentColor = useAccentColor();

  return {
    token: {
      colorPrimary: accentColor,
      colorPrimaryHover: '#2E6CBD',
      borderRadius: 0,
      colorBgContainer: colors.$26,
    },
    components: {
      Button: {
        colorBgContainerDisabled: accentColor,
      },
      Input: { hoverBorderColor: accentColor },
      Select: {
        optionSelectedBg: colors.$27,
        optionSelectedColor: colors.$28,
        optionPadding: '0.5rem',
        selectorBg: colors.$29,
      },

      Tabs: {
        itemColor: colors.$24,
        itemHoverColor: colors.$24,
        itemSelectedColor: colors.$24,
        cardBg: colors.$25,
        cardGutter: 5,
      },
    },
  };
};

export default useTheme;
