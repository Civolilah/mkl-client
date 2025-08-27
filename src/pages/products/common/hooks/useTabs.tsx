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

import AdditionalDetailsCard from '../components/AdditionalDetailsCard';
import { ProductProps } from '../components/Details';
import DetailsCard from '../components/DetailsCard';
import ImagesCard from '../components/ImagesCard';
import InventoryCard from '../components/InventoryCard';
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
  setCurrentImages,
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
        <DetailsCard
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
      key: 'inventory',
      label: (
        <Box className="flex item-center space-x-2 px-5 py-0.5">
          <Box>
            <Icon name="inventory" size="1.2rem" />
          </Box>

          <Text className="text-sm">{t('inventory')}</Text>
        </Box>
      ),
      children: (
        <InventoryCard
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
      key: 'images',
      label: (
        <Box className="flex item-center space-x-2 px-5 py-0.5">
          <Box>
            <Icon name="image" size="1.1rem" />
          </Box>

          <Text className="text-sm">{t('images')}</Text>
        </Box>
      ),
      children: (
        <ImagesCard
          product={product}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          errors={errors}
          handleChange={handleChange}
          setCurrentImages={setCurrentImages}
        />
      ),
    },
    {
      key: 'status_details',
      label: (
        <Box className="flex item-center space-x-2 px-5 py-0.5">
          <Box>
            <Icon name="status_marked" size="1.1rem" />
          </Box>

          <Text className="text-sm">{t('status_details')}</Text>
        </Box>
      ),
      children: (
        <AdditionalDetailsCard
          product={product}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          errors={errors}
          handleChange={handleChange}
          quantityByVariants={quantityByVariants}
        />
      ),
    },
    {
      key: 'display_settings',
      label: (
        <Box className="flex item-center space-x-2 px-5 py-0.5">
          <Box>
            <Icon name="preview" size="1.3rem" />
          </Box>

          <Text className="text-sm">{t('display_settings')}</Text>
        </Box>
      ),
      children: (
        <AdditionalDetailsCard
          product={product}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          errors={errors}
          handleChange={handleChange}
          quantityByVariants={quantityByVariants}
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
