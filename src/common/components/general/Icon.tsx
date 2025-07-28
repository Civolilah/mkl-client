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
import { AiOutlineCodeSandbox, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiImport, BiPackage, BiWorld } from 'react-icons/bi';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import {
  FaAward,
  FaCheckCircle,
  FaClipboardCheck,
  FaFacebook,
  FaFileImage,
  FaInstagram,
  FaRuler,
  FaStore,
  FaTag,
  FaTags,
  FaTruck,
  FaUsers,
  FaWeight,
} from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoInformationCircleOutline } from 'react-icons/io5';
import {
  MdAdd,
  MdBusiness,
  MdCategory,
  MdClose,
  MdContentCopy,
  MdDelete,
  MdEdit,
  MdErrorOutline,
  MdHome,
  MdKeyboardArrowDown,
  MdOutlineEmail,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineMenu,
  MdOutlineShoppingCart,
  MdQrCode,
  MdRefresh,
  MdSave,
  MdSecurity,
  MdSettings,
  MdWarehouse,
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
import { RiInboxLine, RiLockPasswordFill } from 'react-icons/ri';
import { RxPerson } from 'react-icons/rx';
import { RxDotsHorizontal } from 'react-icons/rx';
import { SiCashapp } from 'react-icons/si';
import { TbPackageExport } from 'react-icons/tb';

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
  | 'close'
  | 'copy'
  | 'deliveredProducts'
  | 'error'
  | 'import'
  | 'status_marked'
  | 'company'
  | 'checkCircle'
  | 'save'
  | 'logout'
  | 'store'
  | 'export'
  | 'closeRounded'
  | 'refresh'
  | 'edit'
  | 'delete'
  | 'emptyData'
  | 'ellipsis'
  | 'doubleArrowBack'
  | 'doubleArrowForward'
  | 'security'
  | 'password'
  | 'brand'
  | 'shopCart'
  | 'settings'
  | 'qrCode'
  | 'dotFill'
  | 'image'
  | 'ruler'
  | 'weight'
  | 'package';

type Props = {
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
  name: IconName;
  size?: number | string;
};

const DEFAULT_ICON_COLORS: Record<string, string> = {
  edit: '#007bff',
  delete: '#dc2626',
};

const Icon = (props: Props) => {
  const { name } = props;

  const generateIconElement = (currentElement: IconType) => {
    const iconElement = createElement(currentElement);

    if (isValidElement(iconElement)) {
      return cloneElement(iconElement, {
        fontSize: props.size || '1.125rem',
        onClick: props.onClick,
        style: { color: DEFAULT_ICON_COLORS[name], ...props.style },
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
      return generateIconElement(RxPerson);
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
      return generateIconElement(MdOutlineKeyboardArrowLeft);
    case 'arrowForward':
      return generateIconElement(MdOutlineKeyboardArrowRight);
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
    case 'copy':
      return generateIconElement(MdContentCopy);
    case 'deliveredProducts':
      return generateIconElement(FaClipboardCheck);
    case 'error':
      return generateIconElement(MdErrorOutline);
    case 'import':
      return generateIconElement(BiImport);
    case 'status_marked':
      return generateIconElement(BsBookmarkStarFill);
    case 'company':
      return generateIconElement(MdBusiness);
    case 'checkCircle':
      return generateIconElement(FaCheckCircle);
    case 'save':
      return generateIconElement(MdSave);
    case 'logout':
      return generateIconElement(CiLogout);
    case 'store':
      return generateIconElement(MdWarehouse);
    case 'export':
      return generateIconElement(TbPackageExport);
    case 'closeRounded':
      return generateIconElement(IoMdCloseCircleOutline);
    case 'refresh':
      return generateIconElement(MdRefresh);
    case 'edit':
      return generateIconElement(MdEdit);
    case 'delete':
      return generateIconElement(MdDelete);
    case 'emptyData':
      return generateIconElement(RiInboxLine);
    case 'ellipsis':
      return generateIconElement(RxDotsHorizontal);
    case 'doubleArrowBack':
      return generateIconElement(MdOutlineKeyboardDoubleArrowLeft);
    case 'doubleArrowForward':
      return generateIconElement(MdOutlineKeyboardDoubleArrowRight);
    case 'security':
      return generateIconElement(MdSecurity);
    case 'password':
      return generateIconElement(RiLockPasswordFill);
    case 'brand':
      return generateIconElement(FaAward);
    case 'shopCart':
      return generateIconElement(AiOutlineShoppingCart);
    case 'settings':
      return generateIconElement(MdSettings);
    case 'qrCode':
      return generateIconElement(MdQrCode);
    case 'dotFill':
      return generateIconElement(GoDotFill);
    case 'image':
      return generateIconElement(FaFileImage);
    case 'ruler':
      return generateIconElement(FaRuler);
    case 'weight':
      return generateIconElement(FaWeight);
    case 'package':
      return generateIconElement(BiPackage);
    default:
      return <></>;
  }
};

export default Icon;
