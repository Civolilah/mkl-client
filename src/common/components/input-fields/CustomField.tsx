/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useMemo } from 'react';

import { CustomFieldsType } from '@pages/settings/pages/custom-fields/CustomFields';

import SelectStaticField from './SelectStaticField';
import TextField from './TextField';
import Toggle from './Toggle';

type Entity = 'supplier';

type Field =
  | 'custom_field1'
  | 'custom_field2'
  | 'custom_field3'
  | 'custom_field4';

interface Props {
  entity: Entity;
  field: Field;
  customFields: CustomFieldsType | undefined;
  onValueChange: (value: string | boolean) => void;
  value?: string | number | boolean;
}

const CustomField = ({
  entity,
  field,
  customFields,
  onValueChange,
  value,
}: Props) => {
  const customField = useMemo(() => {
    const fieldIndex = Number(field.replace('custom_field', '')) - 1;

    return customFields?.[`${entity}_custom_fields`]?.[fieldIndex];
  }, [customFields, field, entity]);

  if (!customField?.label) {
    return null;
  }

  if (customField?.type === 'text') {
    return (
      <TextField
        value={value?.toString() || ''}
        label={customField?.label}
        onValueChange={onValueChange}
      />
    );
  }

  if (customField?.type === 'textarea') {
    return (
      <TextField
        type="textarea"
        value={value?.toString() || ''}
        label={customField?.label}
        onValueChange={onValueChange}
      />
    );
  }

  if (customField?.type === 'toggle') {
    return (
      <Toggle
        checked={Boolean(value) || false}
        label={customField?.label}
        onChange={(value) => onValueChange(value)}
      />
    );
  }

  if (customField?.type === 'select') {
    return (
      <SelectStaticField
        mode="single"
        value={value ? [value.toString()] : []}
        label={customField?.label}
        onChange={(value) => onValueChange(value as string)}
        options={customField?.value.split(',').map((option) => ({
          label: option,
          value: option,
        }))}
      />
    );
  }

  return <div>CustomField</div>;
};

export default CustomField;
