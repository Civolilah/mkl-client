/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, ReactNode, SetStateAction } from 'react';

import { Tabs } from 'antd';
import { useMediaQuery } from 'react-responsive';

type Props = {
  tabs: {
    key: string;
    label: ReactNode;
    children: ReactNode;
    icon?: ReactNode;
  }[];
  type?: 'card' | 'line';
  defaultActiveKey?: string;
  activeTab?: string;
  setActiveTab?: Dispatch<SetStateAction<string>>;
  onTabChange?: (activeTab: string) => void;
};

const StaticTabs = ({
  tabs,
  defaultActiveKey,
  activeTab,
  setActiveTab,
  onTabChange,
}: Props) => {
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <Tabs
      items={tabs}
      type={isMediumScreen ? 'line' : 'card'}
      defaultActiveKey={defaultActiveKey}
      style={{ width: '100%' }}
      activeKey={activeTab}
      onChange={(activeKey) => {
        setActiveTab?.(activeKey);
        onTabChange?.(activeKey);
      }}
      size="small"
      className="mobile-sticky-tabs"
    />
  );
};

export default StaticTabs;
