/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode } from 'react';
import SelectDataField from '@components/input-fields/SelectDataField';

import { useHasPermission, useTranslation } from '@hooks/index';

type Props = {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string | string[]) => void;
  onClear: () => void;
  errorMessage: string;
  mode?: 'single' | 'multiple';
  withRefreshButton?: boolean;
  afterSelectorLabel?: ReactNode;
};

const CompaniesSelector = ({
  value,
  onChange,
  onClear,
  errorMessage,
  label,
  placeholder,
  mode = 'single',
  withRefreshButton,
  afterSelectorLabel,
}: Props) => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  return (
    <SelectDataField
      queryIdentifiers={['/api/companies', 'selector']}
      mode={mode}
      label={label}
      placeholder={placeholder}
      valueKey="id"
      labelKey="name"
      endpoint="/api/companies?selector=true"
      enableByPermission={hasPermission('admin') || hasPermission('owner')}
      withoutRefreshData={!withRefreshButton}
      value={value}
      onChange={onChange}
      onClear={onClear}
      errorMessage={errorMessage}
      afterLabel={afterSelectorLabel}
      formatLabel={(label) => label.name || t('untitled_company')}
    />
  );
};

export default CompaniesSelector;
