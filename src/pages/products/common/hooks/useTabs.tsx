/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Icon, Text } from '@components/index';
import { Box } from '@components/index';

import { useTranslation } from '@hooks/index';

import Details, { ProductProps } from '../components/Details';
import EStoreDetails from '../components/EStoreDetails';
import QRCode from '../components/QRCode';

const useTabs = (params: ProductProps) => {
  const t = useTranslation();

  const { product, editPage, isLoading, onRefresh, errors, handleChange } =
    params;

  const tabs = [
    {
      key: 'details',
      label: (
        <Box className="flex item-center space-x-3">
          <Box className="mt-0.5">
            <Icon name="product" size="1rem" />
          </Box>

          <Text className="text-xs">{t('details')}</Text>
        </Box>
      ),
      children: (
        <Details
          product={product}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          errors={errors}
          handleChange={handleChange}
        />
      ),
    },
    {
      key: 'qr_code',
      label: (
        <Box className="flex item-center space-x-3">
          <Box className="mt-0.5">
            <Icon name="qrCode" size="1rem" />
          </Box>

          <Text className="text-xs">{t('qr_code')}</Text>
        </Box>
      ),
      children: (
        <QRCode
          product={product}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          errors={errors}
          handleChange={handleChange}
        />
      ),
    },
    {
      key: 'e_store',
      label: (
        <Box className="flex item-center space-x-3">
          <Box className="mt-0.5">
            <Icon name="shopCart" size="1rem" />
          </Box>

          <Text className="text-xs">{t('e_store')}</Text>
        </Box>
      ),
      children: (
        <EStoreDetails
          product={product}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          errors={errors}
          handleChange={handleChange}
        />
      ),
    },
  ];

  return tabs;
};

export default useTabs;
