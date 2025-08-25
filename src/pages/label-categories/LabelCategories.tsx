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

import { LabelCategory } from '@interfaces/index';

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

const LabelCategories = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [labelCategories, setLabelCategories] = useState<LabelCategory[]>([]);

  const { refresh } = useFetchEntity<LabelCategory>({
    queryIdentifiers: ['/api/label_categories'],
    endpoint: '/api/label_categories',
    setEntities: setLabelCategories,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_label_category') ||
      hasPermission('view_label_category') ||
      hasPermission('edit_label_category'),
  });

  const columns = useColumns({
    refresh,
  });

  usePageLayoutAndActions(
    {
      title: t('label_categories'),
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
            text="new_label_category"
            onClick={() => {
              navigate(route('/label_categories/new'));
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
    <Table<LabelCategory>
      columns={columns}
      data={labelCategories}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={['name']}
      creationRoute="/label_categories/new"
      creationButtonLabel={t('new_label_category')}
      filterFieldPlaceHolder={t('search_by_name')}
      turnOnMobilePreview
      mobileCardRender={(entity) => (
        <MobileCard entity={entity} refresh={refresh} />
      )}
      onMobileCardClick={(entity) => {
        navigate(route('/label_categories/:id/edit', { id: entity.id || '' }));
      }}
    />
  );
};

export default LabelCategories;
