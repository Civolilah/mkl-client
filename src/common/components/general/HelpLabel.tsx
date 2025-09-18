/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode } from 'react';

import { Text } from '@components/index';

import { useColors } from '@hooks/index';

interface Props {
  text: string | ReactNode;
}

const HelpLabel = (props: Props) => {
  const { text } = props;

  const colors = useColors();

  return (
    <Text
      className="text-xs"
      style={{
        color: colors.$16,
      }}
    >
      {text}
    </Text>
  );
};

export default HelpLabel;
