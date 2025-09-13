/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React from 'react';

import { MenuProps } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import { TaxRate } from '@interfaces/index';

import { DeleteAction, FooterActionItem } from '@components/index';

interface Props {
  refresh?: () => void;
}

const useActions = ({ refresh }: Props = {}) => {
  const { id } = useParams();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  return (currentResource: TaxRate) => {
    const actions: MenuProps['items'] = [
      ...(refresh && !isLargeScreen
        ? [
            {
              label: (
                <FooterActionItem
                  iconName="refresh"
                  onClick={refresh}
                  label="reload"
                />
              ),
              key: `refresh-${id}`,
            },
          ]
        : []),
      {
        label: (
          <DeleteAction
            resourceType="tax_rate"
            deleteEndpoint="/api/tax_rates/:id"
            resourceId={id as string}
            editPageAction
            mainPageURL="/tax_rates"
            resourceName={currentResource.name}
            resourceQueryIdentifier="tax_rates"
            element={
              !isLargeScreen && (
                <FooterActionItem
                  iconName="delete"
                  iconColor="#ef4444"
                  label="delete"
                />
              )
            }
          />
        ),
        key: `delete-${id}`,
      },
    ];
    return actions;
  };
};

export default useActions;
