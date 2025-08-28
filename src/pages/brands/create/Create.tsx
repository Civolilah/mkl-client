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

import { INITIAL_BRAND, VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { Brand, ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  usePageLayoutAndActions,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import BrandForm from '../common/components/BrandForm';
import { validateBrand } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('brands'),
      href: '/brands',
    },
    {
      title: t('new_brand'),
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [brand, setBrand] = useState<Brand | undefined>(INITIAL_BRAND);

  const handleSave = async () => {
    if (!brand) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateBrand(brand);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/brands', brand)
        .then((response) => {
          toast.success('created_brand');

          refetch(['brands']);

          navigate(route('/brands/:id/edit', { id: response.data.id }));
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
      title: t('new_brand'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isFormBusy,
        isDisabled: isFormBusy,
        onClick: handleSave,
        disabledWithLoadingIcon: isFormBusy,
      },
      footer: isLargeScreen ? undefined : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="brands"
            onClick={() => {
              navigate(route('/brands'));
            }}
            iconName="brand"
            disabled={isFormBusy}
            iconSize="1.05rem"
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isFormBusy}
            iconSize="1.3rem"
          />

          <AISearchAction disabled={isFormBusy} />
        </Box>
      ),
    },
    [brand, isFormBusy, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [brand]);

  useEffect(() => {
    return () => {
      setErrors({});
      setBrand(INITIAL_BRAND);
    };
  }, []);

  return <BrandForm brand={brand} setBrand={setBrand} errors={errors} />;
};

export default Create;
