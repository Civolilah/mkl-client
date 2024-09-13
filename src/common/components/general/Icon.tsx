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
import { AiOutlineCodeSandbox } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import {
  FaFacebook,
  FaInstagram,
  FaStore,
  FaTag,
  FaTags,
  FaTruck,
  FaUsers,
} from 'react-icons/fa';
import { IoInformationCircleOutline, IoPersonCircle } from 'react-icons/io5';
import {
  MdAdd,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdCategory,
  MdClose,
  MdHome,
  MdKeyboardArrowDown,
  MdOutlineEmail,
  MdOutlineMenu,
  MdOutlineShoppingCart,
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
import { SiCashapp } from 'react-icons/si';

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
  | 'product'
  | 'truck'
  | 'category'
  | 'tag'
  | 'tags'
  | 'employees'
  | 'add'
  | 'arrowBack'
  | 'arrowForward'
  | 'email'
  | 'information'
  | 'menu'
  | 'soldProducts'
  | 'subsidiary'
  | 'home'
  | 'close';

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
      return generateIconElement(IoInformationCircleOutline);
    case 'person':
      return generateIconElement(IoPersonCircle);
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
    case 'product':
      return generateIconElement(AiOutlineCodeSandbox);
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
    case 'arrowBack':
      return generateIconElement(MdArrowBackIosNew);
    case 'arrowForward':
      return generateIconElement(MdArrowForwardIos);
    case 'email':
      return generateIconElement(MdOutlineEmail);
    case 'menu':
      return generateIconElement(MdOutlineMenu);
    case 'soldProducts':
      return generateIconElement(SiCashapp);
    case 'subsidiary':
      return generateIconElement(FaStore);
    case 'home':
      return generateIconElement(MdHome);
    case 'close':
      return generateIconElement(MdClose);

    default:
      return <></>;
  }
};

export default Icon;
