/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Card, RefreshDataElement } from '@components/index';

import { useTranslation } from '@hooks/index';

import { ProductProps } from './Details';

const EStoreDetails = (props: ProductProps) => {
  const t = useTranslation();

  const { product, errors, editPage, isLoading, onRefresh, handleChange } =
    props;

  return (
    <Card
      title={t('e_store')}
      className="w-full"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
    >
      EStore
    </Card>
  );
};

export default EStoreDetails;
