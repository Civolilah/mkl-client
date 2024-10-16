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

import { Subsidiary } from '@interfaces/index';

import {
  Dropdown,
  Box,
  ActionElement,
  ActionLabelElement,
} from '@components/index';

import { useTranslation } from '@hooks/index';

type Resource = Subsidiary;

type Props = {
  editPageLink?: string;
  resource: Resource;
};

const TableActionsDropdown = (props: Props) => {
  const t = useTranslation();

  const { resource, editPageLink } = props;

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
      label: <ActionElement label={t('delete')} iconName="delete" />,
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
