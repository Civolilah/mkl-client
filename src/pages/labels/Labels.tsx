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

import { Label } from '@interfaces/index';

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

const Labels = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [labels, setLabels] = useState<Label[]>([]);

  const { refresh } = useFetchEntity<Label>({
    queryIdentifiers: ['/api/labels'],
    endpoint: '/api/labels',
    setEntities: setLabels,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_label') ||
      hasPermission('view_label') ||
      hasPermission('edit_label'),
  });

  const columns = useColumns({
    refresh,
  });

  usePageLayoutAndActions(
    {
      title: t('labels'),
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
            text="new_label"
            onClick={() => {
              navigate(route('/labels/new'));
            }}
            iconName="add"
            disabled={isLoading}
            iconSize="1.3rem"
            visible={hasPermission('create_label')}
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
    <Table<Label>
      columns={columns}
      data={labels}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={['name']}
      creationRoute="/labels/new"
      creationButtonLabel={t('new_label')}
      filterFieldPlaceHolder={t('search_by_name')}
      turnOnMobilePreview
      mobileCardRender={(entity) => (
        <MobileCard entity={entity} refresh={refresh} />
      )}
      onMobileCardClick={(entity) => {
        navigate(route('/labels/:id/edit', { id: entity.id || '' }));
      }}
    />
  );
};

export default Labels;
