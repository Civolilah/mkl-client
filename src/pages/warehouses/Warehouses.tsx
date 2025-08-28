/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState } from 'react';

import { route } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { Warehouse } from '@interfaces/index';

import {
  AISearchAction,
  Box,
  FooterAction,
  MobileSearchAction,
  RefreshDataElement,
  Table,
} from '@components/index';

import {
  useFetchEntity,
  useHasPermission,
  usePageLayoutAndActions,
  useTranslation,
} from '@hooks/index';

import MobileCard from './common/components/MobileCard';
import useColumns from './common/hooks/useColumns';

const Warehouses = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const { refresh } = useFetchEntity<Warehouse>({
    queryIdentifiers: ['/api/warehouses'],
    endpoint: '/api/warehouses',
    setEntities: setWarehouses,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_warehouse') ||
      hasPermission('view_warehouse') ||
      hasPermission('edit_warehouse'),
  });

  const columns = useColumns({
    refresh,
  });

  usePageLayoutAndActions(
    {
      title: t('warehouses'),
      footer: isLargeScreen ? (
        <Box className="flex w-full items-center justify-end">
          <RefreshDataElement
            isLoading={isLoading}
            refresh={refresh}
            tooltipPlacement="left"
          />
        </Box>
      ) : (
        <Box className="flex w-full items-center justify-end h-full">
          <MobileSearchAction
            disabled={isLoading}
            iconSize="1.3rem"
            searchPlaceholder="search_by_name"
          />

          <FooterAction
            text="new_warehouse"
            onClick={() => {
              navigate(route('/warehouses/new'));
            }}
            iconName="add"
            disabled={isLoading}
            iconSize="1.3rem"
            visible={hasPermission('create_warehouse')}
          />

          <FooterAction
            text="reload"
            onClick={refresh}
            iconName="refresh"
            disabled={isLoading}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [isLoading, isLargeScreen]
  );

  return (
    <Table<Warehouse>
      columns={columns}
      data={warehouses}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={['name']}
      creationRoute="/warehouses/new"
      creationButtonLabel={t('new_warehouse')}
      filterFieldPlaceHolder={t('search_by_name')}
      turnOnMobilePreview
      mobileCardRender={(entity) => (
        <MobileCard entity={entity} refresh={refresh} />
      )}
      onMobileCardClick={(entity) => {
        navigate(route('/warehouses/:id/edit', { id: entity.id || '' }));
      }}
    />
  );
};

export default Warehouses;
