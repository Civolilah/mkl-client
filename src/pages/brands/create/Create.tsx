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
import { useNavigate } from 'react-router-dom';

import { Brand, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useTranslation } from '@hooks/index';

import BrandForm from '../common/components/BrandForm';
import { validateBrand } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

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

  return (
    <Default
      title={t('new_brand')}
      breadcrumbs={breadcrumbs}
      onSaveClick={handleSave}
      disabledSaveButton={isFormBusy}
      disabledSaveButtonWithLoadingIcon={isFormBusy}
    >
      <BrandForm brand={brand} setBrand={setBrand} errors={errors} />
    </Default>
  );
};

export default Create;
