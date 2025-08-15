/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useSearchParams } from 'react-router-dom';

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
}: Props) => {
  const hasPermission = useHasPermission();

  const [searchParams] = useSearchParams();

  return (
    <SelectDataField
      queryIdentifiers={[
        `/api/users/${searchParams.get('company')}`,
        'selector',
      ]}
      mode={mode}
      label={label}
      placeholder={placeholder}
      valueKey="id"
      labelKey="name"
      endpoint="/api/users?selector=true"
      enableByPermission={hasPermission('admin') || hasPermission('owner')}
      withoutRefreshData={!withRefreshButton}
      value={value}
      onChange={onChange}
      onClear={onClear}
      errorMessage={errorMessage}
    />
  );
};

export default EmployeesSelector;
