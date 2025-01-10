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
import { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Subsidiary, User } from '@interfaces/index';

import {
  Dropdown,
  Box,
  ActionElement,
  ActionLabelElement,
  DeleteAction,
} from '@components/index';

import { useTranslation } from '@hooks/index';

export type Resource = Subsidiary | User;

export type ResourceType = 'subsidiary' | 'employee';

type Props = {
  editPageLink?: string;
  resource: Resource;
  deleteEndpoint?: string;
  resourceName?: string;
  resourceType?: ResourceType;
  refresh?: () => void;
};

const TableActionsDropdown = (props: Props) => {
  const t = useTranslation();

  const {
    resource,
    editPageLink,
    deleteEndpoint,
    resourceName,
    resourceType,
    refresh,
  } = props;

  const navigate = useNavigate();

  const actions: MenuProps['items'] = [
    {
      label: Boolean(editPageLink) && (
        <ActionElement
          label={t('edit')}
          iconName="edit"
          onClick={() =>
            navigate(
              route(editPageLink as string, { id: resource.id as string })
            )
          }
        />
      ),
      key: `edit-${resource.id}`,
      style: { paddingLeft: 0 },
    },
    {
      label: Boolean(deleteEndpoint && resourceName && resourceType) && (
        <DeleteAction
          resourceType={resourceType as ResourceType}
          deleteEndpoint={deleteEndpoint as string}
          resourceName={resourceName as string}
          refresh={refresh}
          resourceId={resource.id as string}
        />
      ),
      key: `delete-${resource.id}`,
      style: { paddingLeft: 0 },
    },
  ];

  return (
    <Box className="flex justify-center">
      <Dropdown menu={{ items: actions }}>
        <ActionLabelElement />
      </Dropdown>
    </Box>
  );
};

export default TableActionsDropdown;
