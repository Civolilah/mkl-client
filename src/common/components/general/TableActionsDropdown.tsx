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
  Bin,
  Brand,
  Category,
  Label,
  LabelCategory,
  Product,
  Status,
  Subsidiary,
  Supplier,
  User,
  Warehouse,
} from '@interfaces/index';

import {
  Dropdown,
  Box,
  ActionElement,
  ActionLabelElement,
  DeleteAction,
  Divider,
} from '@components/index';

import { RefetchEntity } from '@hooks/global/useRefetch';
import { useTranslation } from '@hooks/index';

export type Resource =
  | Subsidiary
  | User
  | Status
  | LabelCategory
  | Label
  | Category
  | Supplier
  | Brand
  | Product
  | Warehouse
  | Bin;

export type ResourceType =
  | 'subsidiary'
  | 'employee'
  | 'status'
  | 'label'
  | 'label_category'
  | 'category'
  | 'supplier'
  | 'brand'
  | 'product'
  | 'warehouse'
  | 'tax_rate'
  | 'bin';

type CustomActions = (resource: Resource) => MenuProps['items'];

interface Props {
  resourceQueryIdentifier: RefetchEntity;
  resourceName: string;
  editPageLink?: string;
  resource: Resource;
  deleteEndpoint?: string;
  resourceType?: ResourceType;
  refresh?: () => void;
  customActions?: CustomActions;
}

const TableActionsDropdown = ({
  resource,
  editPageLink,
  deleteEndpoint,
  resourceType,
  refresh,
  customActions,
  resourceName,
  resourceQueryIdentifier,
}: Props) => {
  const t = useTranslation();

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
      },
    },
    ...(customActions
      ? [
          {
            label: (
              <Divider
                nonDashed
                dividerSize="0.5px"
                style={{ marginTop: '0.25rem', marginBottom: '0.25rem' }}
              />
            ),
            key: `divider-first-${resource.id}`,
          },
        ]
      : []),
    ...(customActions?.(resource) ?? []),
    ...(customActions
      ? [
          {
            label: (
              <Divider
                nonDashed
                dividerSize="0.5px"
                style={{ marginTop: '0.25rem', marginBottom: '0.25rem' }}
              />
            ),
            key: `divider-last-${resource.id}`,
          },
        ]
      : []),
    {
      label: Boolean(deleteEndpoint && resourceType) && (
        <DeleteAction
          resourceQueryIdentifier={resourceQueryIdentifier}
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
      },
    },
  ];

  return (
    <Box
      className="flex justify-center"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Dropdown menu={{ items: actions }}>
        <ActionLabelElement />
      </Dropdown>
    </Box>
  );
};

export default TableActionsDropdown;
