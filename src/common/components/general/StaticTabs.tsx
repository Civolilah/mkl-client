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
};

const StaticTabs = (props: Props) => {
  const {
    tabs,
    type = 'line',
    defaultActiveKey,
    activeTab,
    setActiveTab,
  } = props;

  return (
    <Tabs
      items={tabs}
      type={type}
      defaultActiveKey={defaultActiveKey}
      style={{ width: '100%' }}
      activeKey={activeTab}
      onChange={(activeKey) => setActiveTab?.(activeKey)}
    />
  );
};

export default StaticTabs;
