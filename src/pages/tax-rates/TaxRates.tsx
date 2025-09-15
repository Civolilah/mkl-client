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

import { TaxRate } from '@interfaces/index';

import {
  AISearchAction,
  Box,
  FooterAction,
  RefreshDataElement,
  Table,
} from '@components/index';

import {
  useFetchEntity,
  useHasPermission,
  useMobileActions,
  usePageLayoutAndActions,
  useTranslation,
} from '@hooks/index';

import MobileCard from './common/components/MobileCard';
import useColumns from './common/hooks/useColumns';

const TaxRates = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taxRates, setTaxRates] = useState<TaxRate[]>([]);

  const { refresh } = useFetchEntity<TaxRate>({
    queryIdentifiers: ['/api/tax_rates'],
    endpoint: '/api/tax_rates',
    setEntities: setTaxRates,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_tax_rate') ||
      hasPermission('view_tax_rate') ||
      hasPermission('edit_tax_rate'),
  });

  const columns = useColumns({
    refresh,
  });

  usePageLayoutAndActions(
    {
      title: t('tax_rates'),
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
          <FooterAction
            text="dashboard"
            onClick={() => navigate(route('/dashboard'))}
            iconName="dashboard"
            disabled={isLoading}
            visible={hasPermission('view_dashboard')}
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

  useMobileActions(
    [
      {
        iconName: 'add',
        iconSize: '1.6rem',
        onClick: () => navigate(route('/tax_rates/new')),
        visible: hasPermission('create_tax_rate'),
        disabled: isLoading,
      },
    ],
    [isLoading, isLargeScreen]
  );

  return (
    <Table<TaxRate>
      columns={columns}
      data={taxRates}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={['name', 'rate']}
      propsWithAdjustedFilteringValues={[
        {
          key: 'rate',
          adjustingFunction: (value) => value?.toString() || '',
        },
      ]}
      creationRoute="/tax_rates/new"
      creationButtonLabel={t('new_tax_rate')}
      filterFieldPlaceHolder={t('search_by_name')}
      turnOnMobilePreview
      mobileCardRender={(entity) => (
        <MobileCard entity={entity} refresh={refresh} />
      )}
      onMobileCardClick={(entity) => {
        navigate(route('/tax_rates/:id/edit', { id: entity.id || '' }));
      }}
    />
  );
};

export default TaxRates;
