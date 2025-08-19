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

import { User } from '@interfaces/index';

import SelectDataField from '@components/input-fields/SelectDataField';

import { useHasPermission } from '@hooks/index';

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
  excludeCurrentCompanyEmployees?: boolean;
};

const EmployeesSelector = ({
  value,
  onChange,
  onClear,
  errorMessage,
  label,
  placeholder,
  mode = 'single',
  withRefreshButton,
  afterSelectorLabel,
  excludeCurrentCompanyEmployees,
}: Props) => {
  const hasPermission = useHasPermission();

  return (
    <SelectDataField
      queryIdentifiers={
        excludeCurrentCompanyEmployees
          ? ['/api/users', 'selector', 'exclude_current_company_employees']
          : ['/api/users', 'selector']
      }
      mode={mode}
      label={label}
      placeholder={placeholder}
      valueKey="id"
      labelKey="name"
      endpoint={`/api/users?selector=true${
        excludeCurrentCompanyEmployees
          ? '&excludeCurrentCompanyEmployees=true'
          : ''
      }`}
      formatLabel={(employee) =>
        `${(employee as User).first_name} ${(employee as User).last_name} (${(employee as User).email})`
      }
      enableByPermission={hasPermission('admin') || hasPermission('owner')}
      withoutRefreshData={!withRefreshButton}
      value={value}
      onChange={onChange}
      onClear={onClear}
      errorMessage={errorMessage}
      afterLabel={afterSelectorLabel}
    />
  );
};

export default EmployeesSelector;
