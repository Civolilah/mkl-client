/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Card, RefreshDataElement, Text } from '@components/index';

import { useTranslation } from '@hooks/index';

import { ProductProps } from './Details';

const QRCode = (props: ProductProps) => {
  const t = useTranslation();

  const { product, errors, editPage, isLoading, onRefresh, handleChange } =
    props;

  return (
    <Card
      title={t('qr_code')}
      className="w-full"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
      paddingBottom={editPage ? undefined : '0.25rem'}
    >
      {editPage ? (
        <></>
      ) : (
        <Text className="text-sm font-medium">
          {t('save_to_generate_qr_code')}
        </Text>
      )}
    </Card>
  );
};

export default QRCode;
