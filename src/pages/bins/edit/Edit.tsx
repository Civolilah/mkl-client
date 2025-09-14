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

import { Bin, ValidationErrors } from '@interfaces/index';

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
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import BinForm from '../common/components/BinForm';
import { validateBin } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('bins'),
      href: '/bins',
    },
    {
      title: t('edit_bin'),
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
  const [bin, setBin] = useState<Bin | undefined>();
  const [initialResponse, setInitialResponse] = useState<Bin | undefined>();

  const { refresh } = useFetchEntity<Bin>({
    queryIdentifiers: ['/api/bins'],
    endpoint: '/api/bins',
    setEntity: setBin,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_bin') ||
      hasPermission('view_bin') ||
      hasPermission('edit_bin'),
  });

  const actions = useActions({ refresh });

  const handleSave = async () => {
    if (!isLoading && id && bin) {
      if (isEqual(initialResponse, bin)) {
        toast.info('no_bin_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateBin(bin);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/label_categories/:id', { id }), bin)
        .then(() => {
          toast.success('updated_bin');

          refetch(['bins']);

          setInitialResponse(cloneDeep(bin));
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
      title: t('edit_bin'),
      breadcrumbs: {
        breadcrumbs,
      },
      actions: {
        list: bin ? actions(bin) : [],
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
            text="label_categories"
            onClick={() => {
              navigate(route('/bins'));
            }}
            iconName="tags"
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
            actions={bin ? actions(bin) : []}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [bin, isLoading, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [bin]);

  useEffect(() => {
    return () => {
      setErrors({});
      setBin(undefined);
    };
  }, []);

  useDetectChanges({
    initialEntityValue: initialResponse,
    currentEntityValue: bin,
  });

  useSaveAndDiscardActions(
    {
      disabledSaveButton: Boolean(isLoading || Object.keys(errors).length),
      disabledDiscardButton: Boolean(isLoading || Object.keys(errors).length),
      disabledWithLoadingIcon: Boolean(isLoading && bin),
      onSaveClick: handleSave,
      onDiscardClick: () => setBin(initialResponse),
      changesLabel: 'unsaved_bin',
      hideBox: !canEditEntity('edit_bin', 'create_bin', bin),
    },
    [bin, isLoading, handleSave]
  );

  return (
    <BinForm
      bin={bin}
      setBin={setBin}
      errors={errors}
      isLoading={isLoading && !bin}
      onRefresh={refresh}
    />
  );
};

export default Edit;
