/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import {
  isValidElement,
  cloneElement,
  createElement,
  CSSProperties,
} from 'react';
import { IconType } from 'react-icons';
import { BiWorld } from 'react-icons/bi';
import {
  FaBox,
  FaFacebook,
  FaInstagram,
  FaTag,
  FaTags,
  FaTruck,
  FaUsers,
} from 'react-icons/fa';
import { IoInformationCircle } from 'react-icons/io5';
import {
  MdAdd,
  MdCategory,
  MdKeyboardArrowDown,
  MdOutlineShoppingCart,
  MdPerson,
} from 'react-icons/md';
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
  | 'attachMoney'
  | 'openBox'
  | 'truck'
  | 'category'
  | 'tag'
  | 'tags'
  | 'employees'
  | 'add';

type Props = {
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
  name: IconName;
  size?: number;
};

const Icon = (props: Props) => {
  const { name } = props;

  const generateIconElement = (currentElement: IconType) => {
    const iconElement = createElement(currentElement);

    if (isValidElement(iconElement)) {
      return cloneElement(iconElement, {
        fontSize: props.size || 18,
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
      return generateIconElement(MdKeyboardArrowDown);
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
    case 'openBox':
      return generateIconElement(FaBox);
    case 'truck':
      return generateIconElement(FaTruck);
    case 'category':
      return generateIconElement(MdCategory);
    case 'tag':
      return generateIconElement(FaTag);
    case 'tags':
      return generateIconElement(FaTags);
    case 'employees':
      return generateIconElement(FaUsers);
    case 'add':
      return generateIconElement(MdAdd);
    default:
      return <></>;
  }
};

export default Icon;
