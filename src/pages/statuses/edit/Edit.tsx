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

import { Status, ValidationErrors } from '@interfaces/index';

import {
  AISearchAction,
  Box,
  FooterAction,
  Icon,
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

import Form from '../common/components/Form';
import { validateStatus } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('statuses'),
      href: '/statuses',
    },
    {
      title: t('edit_status'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const refetch = useRefetch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();
  const canEditEntity = useCanEditEntity();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status | undefined>();
  const [initialResponse, setInitialResponse] = useState<Status | undefined>();

  const { refresh } = useFetchEntity<Status>({
    queryIdentifiers: ['/api/statuses'],
    endpoint: '/api/statuses',
    setEntity: setStatus,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_status') ||
      hasPermission('view_status') ||
      hasPermission('edit_status'),
  });

  const actions = useActions({ refresh });

  const handleSave = async () => {
    if (!isLoading && id && status) {
      if (isEqual(initialResponse, status)) {
        toast.info('no_status_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateStatus(status);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/statuses/:id', { id }), status)
        .then(() => {
          toast.success('updated_status');

          refetch(['statuses']);

          setInitialResponse(cloneDeep(status));
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
      title: t('edit_status'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isLoading,
        isDisabled:
          isLoading || !canEditEntity('edit_status', 'create_status', status),
        onClick: handleSave,
        disabledWithLoadingIcon: Boolean(isLoading && status),
        displayPermissionTooltip: !canEditEntity(
          'edit_status',
          'create_status',
          status
        ),
        tooltipPermissionMessage: t('no_permission_to_edit_status'),
      },
      actions: {
        list: status ? actions(status) : [],
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
            text="statuses"
            onClick={() => {
              navigate(route('/statuses'));
            }}
            iconName="assignment"
            disabled={isLoading}
            iconSize="1.2rem"
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading}
            iconSize="1.25rem"
          />

          <FooterAction
            text="actions"
            iconForPopover={(isOpen) => (
              <Box className="flex relative">
                <Box className="pr-3">
                  <Icon name="menu" size="1.2rem" />
                </Box>

                <Box className="absolute -right-[0.6rem]">
                  <Icon
                    name={isOpen ? 'arrowDownFill' : 'arrowUpFill'}
                    size="1.4rem"
                  />
                </Box>
              </Box>
            )}
            disabled={isLoading}
            actions={status ? actions(status) : []}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [status, isLoading, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [status]);

  useEffect(() => {
    return () => {
      setErrors({});
      setStatus(undefined);
    };
  }, []);

  return (
    <Form
      status={status}
      setStatus={setStatus}
      errors={errors}
      editPage
      isLoading={isLoading && !status}
      onRefresh={refresh}
    />
  );
};

export default Edit;
