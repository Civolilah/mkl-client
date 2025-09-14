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

import { Subsidiary } from '@interfaces/index';

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
  useResolveCountry,
  useTranslation,
} from '@hooks/index';

import MobileCard from './common/components/MobileCard';
import MobilePreviewModalContent from './common/components/MobilePreviewModalContent';
import useColumns from './common/hooks/useColumns';

const Subsidiaries = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();
  const hasPermission = useHasPermission();
  const resolveCountry = useResolveCountry();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([]);

  const { refresh } = useFetchEntity<Subsidiary>({
    queryIdentifiers: ['/api/subsidiaries'],
    endpoint: '/api/subsidiaries',
    setEntities: setSubsidiaries,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_subsidiary') ||
      hasPermission('view_subsidiary') ||
      hasPermission('edit_subsidiary'),
  });

  const columns = useColumns({
    refresh,
  });

  usePageLayoutAndActions(
    {
      title: t('subsidiaries'),
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
        onClick: () => navigate(route('/subsidiaries/new')),
        visible: hasPermission('create_subsidiary'),
        disabled: isLoading,
      },
    ],
    [isLoading, isLargeScreen]
  );

  return (
    <Table<Subsidiary>
      columns={columns}
      data={subsidiaries}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={['name', 'address', 'city', 'zip_code', 'country_id']}
      propsWithAdjustedFilteringValues={[
        {
          key: 'country_id',
          adjustingFunction: (value) => resolveCountry(value || ''),
        },
      ]}
      creationRoute="/subsidiaries/new"
      creationButtonLabel={t('new_subsidiary')}
      filterFieldPlaceHolder={t('search_subsidiary_by')}
      turnOnMobilePreview
      mobileCardRender={(entity) => (
        <MobileCard entity={entity} refresh={refresh} />
      )}
      mobileModalRender={(entity) => (
        <MobilePreviewModalContent entity={entity} refresh={refresh} />
      )}
    />
  );
};

export default Subsidiaries;
