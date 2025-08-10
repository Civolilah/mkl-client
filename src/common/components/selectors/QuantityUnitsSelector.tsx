/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { SelectStaticField } from '@components/index';

import { useQuantityUnitOptions } from '@hooks/index';
import { useTranslation } from '@hooks/index';

type Props = {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
};

const QuantityUnitsSelector = ({
  value,
  onChange,
  errorMessage,
  label,
  required,
  placeholder,
}: Props) => {
  const t = useTranslation();

  const unitsOfQuantity = useQuantityUnitOptions();

  return (
    <SelectStaticField
      mode="single"
      required={required}
      label={label || t('quantity_unit')}
      options={unitsOfQuantity}
      value={value ? [value] : []}
      onChange={(value) => onChange(value as string)}
      errorMessage={errorMessage}
      placeholder={placeholder}
    />
  );
};

export default QuantityUnitsSelector;
