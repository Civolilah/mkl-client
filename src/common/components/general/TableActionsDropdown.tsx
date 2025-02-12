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

import {
  Category,
  Label,
  LabelCategory,
  Status,
  Subsidiary,
  User,
} from '@interfaces/index';

import {
  Dropdown,
  Box,
  ActionElement,
  ActionLabelElement,
  DeleteAction,
} from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

export type Resource =
  | Subsidiary
  | User
  | Status
  | LabelCategory
  | Label
  | Category;

export type ResourceType =
  | 'subsidiary'
  | 'employee'
  | 'status'
  | 'label'
  | 'label_category'
  | 'category';

type CustomActions = (resource: Resource) => MenuProps['items'];

type Props = {
  resourceName: string;
  editPageLink?: string;
  resource: Resource;
  deleteEndpoint?: string;
  resourceType?: ResourceType;
  refresh?: () => void;
  customActions?: CustomActions;
};

const TableActionsDropdown = (props: Props) => {
  const t = useTranslation();

  const colors = useColors();

  const {
    resource,
    editPageLink,
    deleteEndpoint,
    resourceType,
    refresh,
    customActions,
    resourceName,
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
      style: {
        paddingLeft: 0,
        ...(customActions && { borderBottom: `1px solid ${colors.$1}` }),
      },
    },
    ...(customActions?.(resource) ?? []),
    {
      label: Boolean(deleteEndpoint && resourceType) && (
        <DeleteAction
          resourceType={resourceType as ResourceType}
          deleteEndpoint={deleteEndpoint as string}
          refresh={refresh}
          resourceId={resource.id as string}
          resourceName={resourceName}
        />
      ),
      key: `delete-${resource.id}`,
      style: {
        paddingLeft: 0,
        ...(customActions && { borderTop: `1px solid ${colors.$1}` }),
      },
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
