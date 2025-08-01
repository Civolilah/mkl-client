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
import QRCode from '../components/QRCode';

const useTabs = ({
  product,
  editPage,
  isLoading,
  onRefresh,
  errors,
  handleChange,
  quantityByVariants,
  setQuantityByVariants,
}: ProductProps) => {
  const t = useTranslation();

  const tabs = [
    {
      key: 'details',
      label: (
        <Box className="flex item-center space-x-2 px-5 py-0.5">
          <Box>
            <Icon name="product" size="1.3rem" />
          </Box>

          <Text className="text-sm">{t('details')}</Text>
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
          quantityByVariants={quantityByVariants}
          setQuantityByVariants={setQuantityByVariants}
        />
      ),
    },
    {
      key: 'qr_code',
      label: (
        <Box className="flex item-center space-x-2 px-5 py-0.5">
          <Box>
            <Icon name="qrCode" size="1.2rem" />
          </Box>

          <Text className="text-sm">{t('qr_code')}</Text>
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
          quantityByVariants={quantityByVariants}
          setQuantityByVariants={setQuantityByVariants}
        />
      ),
    },
    // {
    //   key: 'e_store',
    //   label: (
    //     <Box className="flex item-center space-x-3">
    //       <Box className="mt-0.5">
    //         <Icon name="shopCart" size="1.2rem" />
    //       </Box>

    //       <Text className="text-sm">{t('e_store')}</Text>
    //     </Box>
    //   ),
    //   children: (
    //     <EStoreDetails
    //       product={product}
    //       editPage={editPage}
    //       isLoading={isLoading}
    //       onRefresh={onRefresh}
    //       errors={errors}
    //       handleChange={handleChange}
    //     />
    //   ),
    // },
  ];

  return tabs;
};

export default useTabs;
