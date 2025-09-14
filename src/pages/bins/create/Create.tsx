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

import { INITIAL_BIN, VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { Bin, ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useDetectChanges,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import BinForm from '../common/components/BinForm';
import { validateBin } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('bins'),
      href: '/bins',
    },
    {
      title: t('new_bin'),
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [bin, setBin] = useState<Bin | undefined>(INITIAL_BIN);

  const handleSave = async () => {
    if (!bin) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateBin(bin);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/bins', bin)
        .then((response) => {
          toast.success('created_bin');

          refetch(['bins']);

          navigate(route('/bins/:id/edit', { id: response.data.id }));
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        })
        .finally(() => setIsFormBusy(false));
    }
  };

  usePageLayoutAndActions(
    {
      title: t('new_bin'),
      breadcrumbs: {
        breadcrumbs,
      },
      footer: isLargeScreen ? undefined : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="bins"
            onClick={() => {
              navigate(route('/bins'));
            }}
            iconName="boxAlignTopRightFilled"
            disabled={isFormBusy}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isFormBusy}
          />

          <AISearchAction disabled={isFormBusy} />
        </Box>
      ),
    },
    [bin, isFormBusy, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [bin]);

  useEffect(() => {
    return () => {
      setErrors({});
      setBin(INITIAL_BIN);
    };
  }, []);

  useDetectChanges({
    initialEntityValue: INITIAL_BIN,
    currentEntityValue: bin,
  });

  useSaveAndDiscardActions(
    {
      disabledSaveButton: Boolean(isFormBusy || Object.keys(errors).length),
      disabledDiscardButton: Boolean(isFormBusy || Object.keys(errors).length),
      onSaveClick: handleSave,
      onDiscardClick: () => setBin(INITIAL_BIN),
      changesLabel: 'unsaved_bin',
      visibleBox: true,
    },
    [bin, isFormBusy, handleSave]
  );

  return <BinForm bin={bin} setBin={setBin} errors={errors} />;
};

export default Create;
