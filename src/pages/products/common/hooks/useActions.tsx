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
import { useParams } from 'react-router-dom';

import { Product } from '@interfaces/index';

import { DeleteAction } from '@components/index';

const useActions = () => {
  const { id } = useParams();

  return (currentResource: Product) => {
    const actions: MenuProps['items'] = [
      {
        label: (
          <DeleteAction
            resourceType="product"
            deleteEndpoint="/api/products/:id"
            resourceId={id as string}
            editPageAction
            mainPageURL="/products"
            resourceName={currentResource.name}
            resourceQueryIdentifier="products"
          />
        ),
        key: `delete-${id}`,
      },
    ];
    return actions;
  };
};

export default useActions;
