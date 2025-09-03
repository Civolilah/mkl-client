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

import DetailsCard from '../components/DetailsCard';
import DisplaySettingsCard from '../components/DisplaySettingsCard';
import ImagesCard from '../components/ImagesCard';
import InventoryCard from '../components/InventoryCard';
import { ProductProps } from '../components/ProductForm';
import QRCode from '../components/QRCode';
import StatusDetailsCard from '../components/StatusDetailsCard';

const useTabs = ({
  product,
  editPage,
  isLoading,
  onRefresh,
  errors,
  setCurrentImages,
  setProduct,
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
          setProduct={setProduct}
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
          setProduct={setProduct}
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
          setCurrentImages={setCurrentImages}
          setProduct={setProduct}
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
        <StatusDetailsCard
          product={product}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          errors={errors}
          setProduct={setProduct}
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
        <DisplaySettingsCard
          product={product}
          isLoading={isLoading}
          errors={errors}
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
          setProduct={setProduct}
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
