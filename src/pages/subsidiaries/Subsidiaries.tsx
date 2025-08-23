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

import useColumns from './common/hooks/useColumns';

const Subsidiaries = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();
  const hasPermission = useHasPermission();

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
          <MobileSearchAction
            disabled={isLoading}
            iconSize="1.3rem"
            searchPlaceholder="search_subsidiary_by"
          />

          <FooterAction
            text="new_subsidiary"
            onClick={() => {
              navigate(route('/subsidiaries/new'));
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
    <Table<Subsidiary>
      columns={columns}
      data={subsidiaries}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={['name']}
      creationRoute="/subsidiaries/new"
      creationButtonLabel={t('new_subsidiary')}
      filterFieldPlaceHolder={t('search_subsidiary_by')}
    />
  );
};

export default Subsidiaries;
