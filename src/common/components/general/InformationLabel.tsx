/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode } from 'react';

import { Text, Box, Icon, Tooltip } from '@components/index';

import { useColors } from '@hooks/index';

interface Props {
  text: string | ReactNode;
  onlyTooltip?: boolean;
  tooltipOverlayInnerStyle?: CSSProperties;
  iconSize?: string;
}

const InformationLabel = ({
  text,
  onlyTooltip,
  tooltipOverlayInnerStyle,
  iconSize = '1.5rem',
}: Props) => {
  const colors = useColors();

  if (onlyTooltip) {
    return (
      <Tooltip text={text} overlayInnerStyle={tooltipOverlayInnerStyle}>
        <div className="cursor-pointer">
          <Icon name="information" size={iconSize} />
        </div>
      </Tooltip>
    );
  }

  return (
    <Box className="flex items-center space-x-2">
      <Box className="mt-0.5">
        <Icon name="information" size="1.4rem" />
      </Box>

      <Text
        className="text-xs font-light"
        style={{ color: colors.$16, lineHeight: '1rem' }}
      >
        {text}
      </Text>
    </Box>
  );
};

export default InformationLabel;
