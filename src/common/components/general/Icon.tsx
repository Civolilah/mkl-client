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
import {
  BiDotsHorizontalRounded,
  BiImport,
  BiPackage,
  BiWorld,
} from 'react-icons/bi';
import {
  BsBookmarkStarFill,
  BsCashStack,
  BsCreditCard2FrontFill,
} from 'react-icons/bs';
import { CiLogout } from 'react-icons/ci';
import {
  FaAward,
  FaCheckCircle,
  FaClipboardCheck,
  FaClipboardList,
  FaCogs,
  FaFacebook,
  FaFileImage,
  FaFileInvoiceDollar,
  FaHandshake,
  FaInstagram,
  FaPercentage,
  FaPhone,
  FaRuler,
  FaStore,
  FaTag,
  FaTags,
  FaTruck,
  FaUsers,
  FaWarehouse,
  FaWeight,
} from 'react-icons/fa';
import { FaEyeDropper, FaLocationDot } from 'react-icons/fa6';
import { GoDotFill } from 'react-icons/go';
import {
  HiArrowsRightLeft,
  HiChevronUpDown,
  HiShieldCheck,
} from 'react-icons/hi2';
import { IoIosNotifications, IoMdCloseCircleOutline } from 'react-icons/io';
import { IoInformationCircleOutline, IoKeySharp } from 'react-icons/io5';
import {
  MdAdd,
  MdBusiness,
  MdCategory,
  MdClose,
  MdColorLens,
  MdContentCopy,
  MdDelete,
  MdEdit,
  MdErrorOutline,
  MdFeedback,
  MdHome,
  MdImportExport,
  MdKeyboardArrowDown,
  MdKeyboardCommandKey,
  MdOutlineEmail,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineMenu,
  MdOutlineShoppingCart,
  MdOutlineStar,
  MdOutlineViewColumn,
  MdPayments,
  MdPreview,
  MdQrCode,
  MdRefresh,
  MdSave,
  MdSearch,
  MdSecurity,
  MdSettings,
  MdStarBorder,
  MdWarehouse,
  MdWarning,
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
import {
  RiAiGenerate,
  RiArrowDownSFill,
  RiArrowUpSFill,
  RiBarcodeLine,
  RiImageLine,
  RiInboxLine,
  RiLockPasswordFill,
  RiMicLine,
  RiRobot2Line,
} from 'react-icons/ri';
import { RxPerson } from 'react-icons/rx';
import { RxDotsHorizontal } from 'react-icons/rx';
import { SiCashapp } from 'react-icons/si';
import { SlOrganization } from 'react-icons/sl';
import { TbBoxAlignTopRightFilled, TbPackageExport } from 'react-icons/tb';

import { useAccentColor } from '@hooks/index';

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
  | 'package'
  | 'eyeDropper'
  | 'emptyStar'
  | 'star'
  | 'warehouse'
  | 'feedback'
  | 'warning'
  | 'customer'
  | 'importExport'
  | 'phone'
  | 'command'
  | 'search'
  | 'preview'
  | 'arrowUpDown'
  | 'ai'
  | 'robotLine'
  | 'arrowUpFill'
  | 'arrowDownFill'
  | 'barcode'
  | 'microphoneLine'
  | 'imageLine'
  | 'colorPalette'
  | 'clipboardList'
  | 'fileInvoiceDollar'
  | 'locationDot'
  | 'outlineViewColumn'
  | 'horizontalDotsRounded'
  | 'percentage'
  | 'payments'
  | 'notifications'
  | 'creditCard'
  | 'cogs'
  | 'key'
  | 'organization'
  | 'boxAlignTopRightFilled'
  | 'handshake'
  | 'cashStack'
  | 'shieldCheck'
  | 'arrowsRightLeft';

type Props = {
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
  name: IconName;
  size?: number | string;
  unsetColor?: boolean;
};

const DEFAULT_ICON_COLORS: Record<string, string> = {
  edit: '#007bff',
  delete: '#dc2626',
};

const Icon = ({ name, size, onClick, style, unsetColor }: Props) => {
  const accentColor = useAccentColor();

  const generateIconElement = (currentElement: IconType) => {
    const iconElement = createElement(currentElement);

    if (isValidElement(iconElement)) {
      return cloneElement(iconElement, {
        fontSize: size || '1.125rem',
        onClick,
        style: {
          color: unsetColor
            ? undefined
            : DEFAULT_ICON_COLORS[name] || accentColor,
          ...style,
        },
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
    case 'eyeDropper':
      return generateIconElement(FaEyeDropper);
    case 'star':
      return generateIconElement(MdOutlineStar);
    case 'emptyStar':
      return generateIconElement(MdStarBorder);
    case 'warehouse':
      return generateIconElement(FaWarehouse);
    case 'feedback':
      return generateIconElement(MdFeedback);
    case 'warning':
      return generateIconElement(MdWarning);
    case 'customer':
      return generateIconElement(MdPeople);
    case 'importExport':
      return generateIconElement(MdImportExport);
    case 'phone':
      return generateIconElement(FaPhone);
    case 'command':
      return generateIconElement(MdKeyboardCommandKey);
    case 'search':
      return generateIconElement(MdSearch);
    case 'preview':
      return generateIconElement(MdPreview);
    case 'arrowUpDown':
      return generateIconElement(HiChevronUpDown);
    case 'ai':
      return generateIconElement(RiAiGenerate);
    case 'robotLine':
      return generateIconElement(RiRobot2Line);
    case 'arrowUpFill':
      return generateIconElement(RiArrowUpSFill);
    case 'arrowDownFill':
      return generateIconElement(RiArrowDownSFill);
    case 'barcode':
      return generateIconElement(RiBarcodeLine);
    case 'microphoneLine':
      return generateIconElement(RiMicLine);
    case 'imageLine':
      return generateIconElement(RiImageLine);
    case 'colorPalette':
      return generateIconElement(MdColorLens);
    case 'clipboardList':
      return generateIconElement(FaClipboardList);
    case 'fileInvoiceDollar':
      return generateIconElement(FaFileInvoiceDollar);
    case 'locationDot':
      return generateIconElement(FaLocationDot);
    case 'outlineViewColumn':
      return generateIconElement(MdOutlineViewColumn);
    case 'horizontalDotsRounded':
      return generateIconElement(BiDotsHorizontalRounded);
    case 'percentage':
      return generateIconElement(FaPercentage);
    case 'payments':
      return generateIconElement(MdPayments);
    case 'notifications':
      return generateIconElement(IoIosNotifications);
    case 'creditCard':
      return generateIconElement(BsCreditCard2FrontFill);
    case 'cogs':
      return generateIconElement(FaCogs);
    case 'organization':
      return generateIconElement(SlOrganization);
    case 'boxAlignTopRightFilled':
      return generateIconElement(TbBoxAlignTopRightFilled);
    case 'handshake':
      return generateIconElement(FaHandshake);
    case 'cashStack':
      return generateIconElement(BsCashStack);
    case 'key':
      return generateIconElement(IoKeySharp);
    case 'shieldCheck':
      return generateIconElement(HiShieldCheck);
    case 'arrowsRightLeft':
      return generateIconElement(HiArrowsRightLeft);
    default:
      return <></>;
  }
};

export default Icon;
