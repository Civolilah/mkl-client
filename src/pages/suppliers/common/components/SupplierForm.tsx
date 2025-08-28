/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Supplier, ValidationErrors } from '@interfaces/index';

import { Box, StaticTabs, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';
import useTabs from '../hooks/useTabs';

type Props = {
  supplier: Supplier | undefined;
  setSupplier: Dispatch<SetStateAction<Supplier | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onlyFields?: boolean;
};

const SupplierForm = ({
  supplier,
  setSupplier,
  errors,
  isLoading,
  onlyFields,
}: Props) => {
  const t = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const isEnabledInvoicing = true;

  const handleChange = useHandleChange({ setSupplier });

  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get('tab') ?? 'details'
  );

  const tabs = useTabs({
    supplier,
    isLoading,
    errors,
    setSupplier,
  });

  useEffect(() => {
    if (Object.keys(errors).length && isEnabledInvoicing) {
      const isErrorFromDetailsPage = Object.keys(errors).some(
        (key) =>
          key.includes('name') ||
          key.includes('country_id') ||
          key.includes('currency_id')
      );

      if (isErrorFromDetailsPage) {
        setActiveTab('details');
      }
    }
  }, [errors]);

  useEffect(() => {
    if (isEnabledInvoicing) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('tab', activeTab);
        return newParams;
      });
    }
  }, [activeTab]);

  if (onlyFields) {
    return (
      <>
        <TextField
          required
          label={t('name')}
          placeHolder={t('supplier_name_placeholder')}
          value={supplier?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />
      </>
    );
  }

  return (
    <Box className="flex w-full self-start md:w-full xl:w-3/4">
      <StaticTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
};

export default SupplierForm;
