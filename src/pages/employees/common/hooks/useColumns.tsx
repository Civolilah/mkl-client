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

import { User } from '@interfaces/index';

import {
  Box,
  CopyToClipboardOnlyIcon,
  Link,
  TableActionsDropdown,
  Text,
} from '@components/index';

import { useFormatUnixTime, useTranslation } from '@hooks/index';

type Props = {
  refresh: () => void;
};

const useColumns = (props: Props) => {
  const t = useTranslation();

  const { refresh } = props;

  const navigate = useNavigate();
  const formatUnixTime = useFormatUnixTime();

  const columns: TableColumnsType<User> = [
    {
      title: t('first_name'),
      dataIndex: 'first_name',
      render: (value, resource) => (
        <Box className="w-full truncate">
          <Link
            to={route('/employees/:id/edit', { id: resource.id as string })}
          >
            {value}
          </Link>
        </Box>
      ),
      onCell: (record) => ({
        onClick: () =>
          navigate(route('/employees/:id/edit', { id: record.id as string })),
      }),
    },
    {
      title: t('last_name'),
      dataIndex: 'last_name',
      render: (value, resource) => (
        <Box className="w-full truncate">
          <Link
            to={route('/employees/:id/edit', { id: resource.id as string })}
          >
            {value}
          </Link>
        </Box>
      ),
      onCell: (record) => ({
        onClick: () =>
          navigate(route('/employees/:id/edit', { id: record.id as string })),
      }),
    },
    {
      title: t('email'),
      dataIndex: 'email',
      render: (value) => (
        <Box className="flex items-center space-x-4 w-full truncate">
          <Text>{value}</Text>

          <CopyToClipboardOnlyIcon text={value} />
        </Box>
      ),
    },
    {
      title: t('subsidiaries'),
      dataIndex: 'subsidiaries',
      render: (subsidiaries: { id: string; name: string }[]) => (
        <Box className="flex items-center w-full truncate">
          {subsidiaries.map((subsidiary, index, array) => (
            <Box key={subsidiary.id} className="flex items-center">
              <Link to={route('/subsidiaries/:id/edit', { id: subsidiary.id })}>
                {subsidiary.name}
              </Link>

              {index < array.length - 1 && <Text className="mx-2">|</Text>}
            </Box>
          ))}
        </Box>
      ),
    },
    {
      title: t('created_at'),
      dataIndex: 'created_at',
      render: (value) => (
        <Box className="w-full truncate">
          <Text>{formatUnixTime(value)}</Text>
        </Box>
      ),
    },
    {
      title: t('created_by'),
      dataIndex: 'created_by',
      render: (user: User | null) => {
        if (!user) {
          return <></>;
        }

        return (
          <Box className="w-full truncate">
            <Text>
              {user.first_name || user.last_name
                ? `${user.first_name} ${user.last_name}`
                : user.email}
            </Text>
          </Box>
        );
      },
    },
    {
      title: t('updated_at'),
      dataIndex: 'updated_at',
      render: (value) => {
        if (!value) {
          return <></>;
        }

        return (
          <Box className="w-full truncate">
            <Text>{formatUnixTime(value)}</Text>
          </Box>
        );
      },
    },
    {
      title: t('updated_by'),
      dataIndex: 'updated_by',
      render: (user: User | null) => {
        if (!user) {
          return <></>;
        }

        return (
          <Box className="w-full truncate">
            <Text>
              {user.first_name || user.last_name
                ? `${user.first_name} ${user.last_name}`
                : user.email}
            </Text>
          </Box>
        );
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, resource) => (
        <TableActionsDropdown
          resource={resource}
          editPageLink="/employees/:id/edit"
          resourceType="employee"
          deleteEndpoint="/api/users/:id/delete_employee"
          resourceName={
            resource.first_name || resource.last_name || resource.email
          }
          refresh={refresh}
        />
      ),
      width: '6rem',
      fixed: 'right',
    },
  ];

  return columns;
};

export default useColumns;
