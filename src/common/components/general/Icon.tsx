/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

'use client';

import React, { isValidElement, cloneElement, createElement } from 'react';
import { IconType } from 'react-icons';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { IoInformationCircle } from 'react-icons/io5';

import { useAccentColor } from '@hooks/index';

interface Props {
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  name: 'facebook' | 'instagram' | 'information';
  size?: number;
  color?: string;
}

const Icon = (props: Props) => {
  const accentColor = useAccentColor();

  const { name } = props;

  const generateIconElement = (currentElement: IconType) => {
    const iconElement = createElement(currentElement);

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

  switch (name) {
    case 'facebook':
      return generateIconElement(FaFacebook);

    case 'instagram':
      return generateIconElement(FaInstagram);

    case 'information':
      return generateIconElement(IoInformationCircle);

    default:
      return <></>;
  }
};

export default Icon;
