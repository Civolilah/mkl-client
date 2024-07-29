/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, { isValidElement, cloneElement, createElement } from 'react';
import { IconType } from 'react-icons';

import { useAccentColor } from '@hooks/index';

interface Props {
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  element: IconType;
  size?: number;
  color?: string;
}

const Icon = (props: Props) => {
  const accentColor = useAccentColor();

  const iconElement = createElement(props.element);

  if (isValidElement(iconElement)) {
    return cloneElement(iconElement, {
      fontSize: props.size || 18,
      color: props.color || accentColor,
      className: props.className,
      onClick: props.onClick,
      style: props.style,
    });
  }

  return <></>;
};

export default Icon;
