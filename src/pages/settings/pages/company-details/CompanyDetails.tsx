/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useState } from 'react';

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { isEqual } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useDetectChanges,
  useFetchEntity,
  useHasPermission,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import AddressCard from './common/components/AddressCard';
import Details from './common/components/DetailsCard';
import LogoCard from './common/components/LogoCard';
import { validateCompanyDetails } from './common/helpers/validation';

export interface CompanyDetailsType {
  name: string;
  id_number: string;
  vat_number: string;
  website: string;
  email: string;
  phone: string;
  size: string;
  industry: string;
  classification: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip_code: string;
  country_id: string;
  logo_image_id: string;
}

export interface CompanyDetailsProps {
  companyDetails: CompanyDetailsType | undefined;
  setCompanyDetails: Dispatch<SetStateAction<CompanyDetailsType | undefined>>;
  errors: ValidationErrors;
  isLoading: boolean;
  isFormBusy: boolean;
}

const CompanyDetails = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('settings'),
      href: '/settings/profile',
    },
    {
      title: t('company_details'),
      href: '/settings/profile',
    },
  ];

  const toast = useToast();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const refetch = useRefetch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = useState<
    CompanyDetailsType | undefined
  >(undefined);
  const [initialCompanyDetails, setInitialCompanyDetails] = useState<
    CompanyDetailsType | undefined
  >(undefined);

  useFetchEntity<CompanyDetailsType>({
    queryIdentifiers: ['/api/users/profile'],
    endpoint: '/api/users/profile',
    setEntity: setCompanyDetails,
    setIsLoading,
    setInitialResponse: setInitialCompanyDetails,
    withoutQueryId: true,
  });

  useDetectChanges({
    initialEntityValue: initialCompanyDetails,
    currentEntityValue: companyDetails,
  });

  const handleSave = async () => {
    if (!companyDetails) {
      return;
    }

    if (!isFormBusy && !isLoading) {
      if (isEqual(initialCompanyDetails, companyDetails)) {
        toast.info('no_company_details_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateCompanyDetails(
        companyDetails as CompanyDetailsType
      );

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('PATCH', '/api/companies/details', companyDetails)
        .then(() => {
          toast.success('updated_company_details');

          refetch(['company_details']);
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
      title: t('company_details'),
      breadcrumbs: {
        breadcrumbs,
      },
      footer: !isLargeScreen && (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="dashboard"
            onClick={() => {
              navigate(route('/dashboard'));
            }}
            iconName="dashboard"
            disabled={isLoading || isFormBusy}
            visible={hasPermission('view_dashboard')}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading || isFormBusy}
          />

          <AISearchAction disabled={isLoading || isFormBusy} />
        </Box>
      ),
    },
    [companyDetails, isLoading, isFormBusy, handleSave]
  );

  useSaveAndDiscardActions(
    {
      disabledSaveButton: isFormBusy,
      disabledDiscardButton: isFormBusy,
      onSaveClick: handleSave,
      onDiscardClick: () => setCompanyDetails(initialCompanyDetails),
      changesLabel: 'unsaved_company_details',
    },
    [companyDetails, isFormBusy, handleSave]
  );

  return (
    <Box className="flex flex-col gap-y-4 w-full pb-20">
      <Details
        companyDetails={companyDetails}
        setCompanyDetails={setCompanyDetails}
        errors={errors}
        isLoading={isLoading}
        isFormBusy={isFormBusy}
      />

      <AddressCard
        companyDetails={companyDetails}
        setCompanyDetails={setCompanyDetails}
        errors={errors}
        isLoading={isLoading}
        isFormBusy={isFormBusy}
      />

      <LogoCard
        companyDetails={companyDetails}
        setCompanyDetails={setCompanyDetails}
        errors={errors}
        isLoading={isLoading}
        isFormBusy={isFormBusy}
      />
    </Box>
  );
};

export default CompanyDetails;
