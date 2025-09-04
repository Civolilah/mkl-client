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

import { Select } from 'antd';
import Fuse from 'fuse.js';

import {
  Box,
  ErrorMessageElement,
  Label,
  RequiredOptionalLabel,
} from '@components/index';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  required?: boolean;
  withoutOptionalText?: boolean;
  mode?: 'multiple' | 'tags' | 'single';
  value: string[];
  placeholder?: string;
  onChange: (value: string[] | string) => void;
  errorMessage?: string;
  labelKey?: string;
  valueKey?: string;
  onClear?: () => void;
  options: Option[];
  size?: 'large' | 'middle' | 'small';
};

const SelectStaticField = ({
  label,
  required,
  withoutOptionalText,
  value,
  mode = 'multiple',
  onChange,
  placeholder,
  errorMessage,
  onClear,
  size = 'large',
  options,
}: Props) => {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredOptions(options);
      return;
    }

    const directMatches = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );

    if (directMatches.length) {
      setFilteredOptions(directMatches);
      return;
    }

    const fuse = new Fuse(options, {
      keys: ['label'],
      threshold: 0.4,
    });

    const fuseResults = fuse.search(value);
    const formattedResults = fuseResults.map((result) => result.item);
    setFilteredOptions(formattedResults);
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    return () => {
      setFilteredOptions([]);
    };
  }, []);

  return (
    <Box className="flex flex-col space-y-1 w-full">
      {label && (
        <Box className="flex items-center space-x-1">
          <Box className="flex items-center">
            <Label>{label}</Label>

            {required && <span className="text-red-500 mb-1 ml-0.5">*</span>}
          </Box>

          <RequiredOptionalLabel
            required={Boolean(required)}
            withoutOptionalText={withoutOptionalText}
          />
        </Box>
      )}

      {mode === 'multiple' && (
        <Select
          className="w-full"
          mode={mode}
          size={size}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          options={filteredOptions}
          filterOption={false}
          onSearch={handleSearch}
          onClear={() => {
            setFilteredOptions(options);
            onClear?.();
          }}
          onDropdownVisibleChange={(visible) => {
            if (!visible) {
              setFilteredOptions(options);
            }
          }}
          allowClear={Boolean(onClear)}
        />
      )}

      {mode === 'single' && (
        <Select
          className="w-full"
          size={size}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          options={filteredOptions}
          onSearch={handleSearch}
          filterOption={false}
          showSearch
          onClear={() => {
            setFilteredOptions(options);
            onClear?.();
          }}
          onDropdownVisibleChange={(visible) => {
            if (!visible) {
              setFilteredOptions(options);
            }
          }}
          allowClear={Boolean(onClear)}
        />
      )}

      <ErrorMessageElement errorMessage={errorMessage} />
    </Box>
  );
};

export default SelectStaticField;
