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

import { Customer } from '@interfaces/index';

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

const Customers = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const { refresh } = useFetchEntity<Customer>({
    queryIdentifiers: ['/api/customers'],
    endpoint: '/api/customers',
    setEntities: setCustomers,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_customer') ||
      hasPermission('view_customer') ||
      hasPermission('edit_customer'),
  });

  const columns = useColumns({
    refresh,
  });

  usePageLayoutAndActions(
    {
      title: t('customers'),
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
        onClick: () => navigate(route('/customers/new')),
        visible: hasPermission('create_customer'),
        disabled: isLoading,
      },
    ],
    [isLoading, isLargeScreen]
  );

  return (
    <Table<Customer>
      columns={columns}
      data={customers}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={['name']}
      creationRoute="/customers/new"
      creationButtonLabel={t('new_customer')}
      filterFieldPlaceHolder={t('search_customer_by')}
      turnOnMobilePreview
      mobileCardRender={(entity) => (
        <MobileCard entity={entity} refresh={refresh} />
      )}
      onMobileCardClick={(entity) => {
        navigate(route('/customers/:id/edit', { id: entity.id || '' }));
      }}
    />
  );
};

export default Customers;
