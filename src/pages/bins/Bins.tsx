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

import { Bin } from '@interfaces/index';

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

const Bins = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [bins, setBins] = useState<Bin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { refresh } = useFetchEntity<Bin>({
    queryIdentifiers: ['/api/bins'],
    endpoint: '/api/bins',
    setEntities: setBins,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_bin') ||
      hasPermission('view_bin') ||
      hasPermission('edit_bin'),
  });

  const columns = useColumns({
    refresh,
  });

  usePageLayoutAndActions(
    {
      title: t('bins'),
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
            text="new_bin"
            onClick={() => {
              navigate(route('/bins/new'));
            }}
            iconName="add"
            disabled={isLoading}
            visible={hasPermission('create_bin')}
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
        onClick: () => navigate(route('/bins/new')),
        visible: hasPermission('create_bin'),
        disabled: isLoading,
      },
    ],
    [isLoading, isLargeScreen]
  );

  return (
    <Table<Bin>
      columns={columns}
      data={bins}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={['name']}
      creationRoute="/bins/new"
      creationButtonLabel={t('new_bin')}
      filterFieldPlaceHolder={t('search_by_name')}
      turnOnMobilePreview
      mobileCardRender={(entity) => (
        <MobileCard entity={entity} refresh={refresh} />
      )}
      onMobileCardClick={(entity) => {
        navigate(route('/bins/:id/edit', { id: entity.id || '' }));
      }}
    />
  );
};

export default Bins;
