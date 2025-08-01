/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { route } from '@helpers/index';
import { TableColumnsType } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Product, User } from '@interfaces/index';

import { Box, Link, TableActionsDropdown, Text } from '@components/index';

import { useFormatUnixTime, useTranslation } from '@hooks/index';

type Props = {
  refresh: () => void;
};

const useColumns = (props: Props) => {
  const t = useTranslation();

  const { refresh } = props;

  const navigate = useNavigate();
  const formatUnixTime = useFormatUnixTime();

  const columns: TableColumnsType<Product> = [
    {
      title: t('name'),
      dataIndex: 'name',
      render: (value, resource) => (
        <Box className="min-w-56">
          <Link to={route('/products/:id/edit', { id: resource.id as string })}>
            {value}
          </Link>
        </Box>
      ),
      onCell: (record) => ({
        onClick: () =>
          navigate(route('/products/:id/edit', { id: record.id as string })),
      }),
    },
    {
      title: t('created_at'),
      dataIndex: 'created_at',
      render: (value) => (
        <Box className="min-w-40 max-w-96 truncate">
          <Text>{formatUnixTime(value)}</Text>
        </Box>
      ),
    },
    {
      title: t('created_by'),
      dataIndex: 'user',
      render: (user: User) => (
        <Box className="min-w-56 max-w-96 truncate">
          <Text>
            {user.first_name || user.last_name
              ? `${user.first_name || ''} ${user.last_name || ''}`
              : user.email}
          </Text>
        </Box>
      ),
    },
    {
      title: t('updated_at'),
      dataIndex: 'updated_at',
      render: (value) => (
        <Box className="min-w-40 max-w-96 truncate">
          {value ? <Text>{formatUnixTime(value)}</Text> : <></>}
        </Box>
      ),
    },
    {
      title: t('updated_by'),
      dataIndex: 'updated_by',
      render: (user: User | null) => (
        <Box className="min-w-56 max-w-96 truncate">
          {user ? (
            <Text>
              {user.first_name || user.last_name
                ? `${user.first_name || ''} ${user.last_name || ''}`
                : user.email}
            </Text>
          ) : (
            <></>
          )}
        </Box>
      ),
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, resource) => (
        <TableActionsDropdown
          resource={resource}
          editPageLink="/products/:id/edit"
          resourceType="product"
          deleteEndpoint="/api/products/:id"
          refresh={refresh}
          resourceName={resource.name}
          resourceQueryIdentifier="products"
        />
      ),
      fixed: 'right',
    },
  ];

  return columns;
};

export default useColumns;
