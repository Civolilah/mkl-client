/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { TableColumnsType } from 'antd';

import { Subsidiary } from '@interfaces/index';

import { Box, TableActionsDropdown } from '@components/index';

import { useTranslation } from '@hooks/index';

const useColumns = () => {
  const t = useTranslation();

  const columns: TableColumnsType<Subsidiary> = [
    {
      title: t('name'),
      dataIndex: 'name',
      render: (value) => <Box className="w-full truncate">{value}</Box>,
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, resource) => (
        <TableActionsDropdown
          resource={resource}
          editPageLink="/subsidiaries/:id/edit"
        />
      ),
      width: '6rem',
    },
  ];

  return columns;
};

export default useColumns;
