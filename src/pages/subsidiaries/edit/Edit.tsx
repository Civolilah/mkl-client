/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useState } from 'react';

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { endpoint, request, route, useToast } from '@helpers/index';
import { cloneDeep, isEqual } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';

import { Subsidiary, ValidationErrors } from '@interfaces/index';

import {
  AISearchAction,
  Box,
  FooterAction,
  RefreshDataElement,
} from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useFetchEntity,
  useHasPermission,
  usePageLayoutAndActions,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import SubsidiaryForm from '../common/components/SubsidiaryForm';
import { validateSubsidiary } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('subsidiaries'),
      href: '/subsidiaries',
    },
    {
      title: t('edit_subsidiary'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const actions = useActions();
  const refetch = useRefetch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();
  const canEditEntity = useCanEditEntity();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subsidiary, setSubsidiary] = useState<Subsidiary | undefined>();
  const [initialResponse, setInitialResponse] = useState<
    Subsidiary | undefined
  >();

  const { refresh } = useFetchEntity<Subsidiary>({
    queryIdentifiers: ['/api/subsidiaries'],
    endpoint: '/api/subsidiaries',
    setEntity: setSubsidiary,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_subsidiary') ||
      hasPermission('view_subsidiary') ||
      hasPermission('edit_subsidiary'),
  });

  const handleSave = async () => {
    if (!isLoading && id && subsidiary) {
      if (isEqual(initialResponse, subsidiary)) {
        toast.info('no_subsidiary_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateSubsidiary(subsidiary);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/subsidiaries/:id', { id }), subsidiary)
        .then(() => {
          toast.success('updated_subsidiary');

          refetch(['subsidiaries']);

          setInitialResponse(cloneDeep(subsidiary));
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  usePageLayoutAndActions(
    {
      title: t('edit_subsidiary'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isLoading,
        isDisabled:
          isLoading ||
          !canEditEntity('edit_subsidiary', 'create_subsidiary', subsidiary),
        onClick: handleSave,
        disabledWithLoadingIcon: Boolean(isLoading && subsidiary),
        displayPermissionTooltip: !canEditEntity(
          'edit_subsidiary',
          'create_subsidiary',
          subsidiary
        ),
        tooltipPermissionMessage: t('no_permission_to_edit_subsidiary'),
      },
      actions: {
        list: subsidiary ? actions(subsidiary) : [],
      },
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
            text="subsidiaries"
            onClick={() => {
              navigate(route('/subsidiaries'));
            }}
            iconName="subsidiary"
            disabled={isLoading}
            iconSize="1.3rem"
          />

          <FooterAction
            text="reload"
            onClick={refresh}
            iconName="refresh"
            disabled={isLoading}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading}
            iconSize="1.3rem"
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [subsidiary, isLoading, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [subsidiary]);

  useEffect(() => {
    return () => {
      setErrors({});
      setSubsidiary(undefined);
    };
  }, []);

  return (
    <SubsidiaryForm
      subsidiary={subsidiary}
      setSubsidiary={setSubsidiary}
      errors={errors}
      editPage
      isLoading={isLoading && !subsidiary}
      onRefresh={refresh}
    />
  );
};

export default Edit;
