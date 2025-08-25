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

import { Status } from '@interfaces/index';

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
import MobilePreviewModalContent from './common/components/MobilePreviewModalContent';
import useColumns from './common/hooks/useColumns';

const Statuses = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statuses, setStatuses] = useState<Status[]>([]);

  const { refresh } = useFetchEntity<Status>({
    queryIdentifiers: ['/api/statuses'],
    endpoint: '/api/statuses',
    setEntities: setStatuses,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_status') ||
      hasPermission('view_status') ||
      hasPermission('edit_status'),
  });

  const columns = useColumns({
    refresh,
  });

  usePageLayoutAndActions(
    {
      title: t('statuses'),
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
            text="new_status"
            onClick={() => {
              navigate(route('/statuses/new'));
            }}
            iconName="add"
            disabled={isLoading}
            iconSize="1.3rem"
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
    <Table<Status>
      columns={columns}
      data={statuses}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={['name']}
      creationRoute="/statuses/new"
      creationButtonLabel={t('new_status')}
      filterFieldPlaceHolder={t('search_by_name')}
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

export default Statuses;
