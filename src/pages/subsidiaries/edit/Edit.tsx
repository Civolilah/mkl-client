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
  ActionPopoverIcon,
  AISearchAction,
  Box,
  FooterAction,
  RefreshDataElement,
} from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useDetectChanges,
  useFetchEntity,
  useHasPermission,
  useMobileActions,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
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
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading}
          />

          <FooterAction
            text="actions"
            iconForPopover={(isOpen) => <ActionPopoverIcon isOpen={isOpen} />}
            disabled={isLoading}
            actions={subsidiary ? actions(subsidiary) : []}
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

  useDetectChanges({
    initialEntityValue: initialResponse,
    currentEntityValue: subsidiary,
  });

  useSaveAndDiscardActions(
    {
      disabledSaveButton: Boolean(isLoading || Object.keys(errors).length),
      disabledDiscardButton: Boolean(isLoading || Object.keys(errors).length),
      disabledWithLoadingIcon: Boolean(isLoading && subsidiary),
      onSaveClick: handleSave,
      onDiscardClick: () => setSubsidiary(initialResponse),
      changesLabel: 'unsaved_subsidiary',
      hideBox: !canEditEntity(
        'edit_subsidiary',
        'create_subsidiary',
        subsidiary
      ),
    },
    [subsidiary, isLoading, handleSave]
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
    <SubsidiaryForm
      subsidiary={subsidiary}
      setSubsidiary={setSubsidiary}
      errors={errors}
      isLoading={isLoading && !subsidiary}
    />
  );
};

export default Edit;
