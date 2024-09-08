/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import classNames from 'classnames';
import {
  isValidElement,
  cloneElement,
  createElement,
  CSSProperties,
} from 'react';
import { IconType } from 'react-icons';
import { BiWorld } from 'react-icons/bi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoInformationCircle } from 'react-icons/io5';
import { MdOutlineShoppingCart, MdPerson } from 'react-icons/md';
import {
  MdDashboard,
  MdShoppingBasket,
  MdInventory,
  MdGroup,
  MdPeople,
  MdGroups,
  MdAssignment,
  MdBarChart,
  MdAttachMoney,
} from 'react-icons/md';

export type IconName =
  | 'facebook'
  | 'instagram'
  | 'information'
  | 'person'
  | 'shoppingCart'
  | 'world'
  | 'arrowDown'
  | 'dashboard'
  | 'shoppingBasket'
  | 'inventory'
  | 'group'
  | 'people'
  | 'groups'
  | 'assignment'
  | 'barChart'
  | 'attachMoney';

type Props = {
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
  name: IconName;
  size?: number;
  enableHoverColor?: boolean;
};

const Icon = (props: Props) => {
  const { name, enableHoverColor } = props;

  const generateIconElement = (currentElement: IconType) => {
    const iconElement = createElement(currentElement);

    if (isValidElement(iconElement)) {
      return cloneElement(iconElement, {
        fontSize: props.size || 18,
        className: classNames(
          'text-accent',
          {
            'hover:text-primary-blue transition-colors duration-200':
              enableHoverColor,
          },
          props.className
        ),
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
    case 'person':
      return generateIconElement(MdPerson);
    case 'shoppingCart':
      return generateIconElement(MdOutlineShoppingCart);
    case 'world':
      return generateIconElement(BiWorld);
    case 'arrowDown':
      return generateIconElement(IoMdArrowDropdown);
    case 'dashboard':
      return generateIconElement(MdDashboard);
    case 'shoppingBasket':
      return generateIconElement(MdShoppingBasket);
    case 'inventory':
      return generateIconElement(MdInventory);
    case 'group':
      return generateIconElement(MdGroup);
    case 'people':
      return generateIconElement(MdPeople);
    case 'groups':
      return generateIconElement(MdGroups);
    case 'assignment':
      return generateIconElement(MdAssignment);
    case 'barChart':
      return generateIconElement(MdBarChart);
    case 'attachMoney':
      return generateIconElement(MdAttachMoney);
    default:
      return <></>;
  }
};

export default Icon;
