/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode, useEffect, useState } from 'react';

import { COMPONENTS_FONT_SIZE } from '@constants/index';
import { Select } from 'antd';
import Fuse from 'fuse.js';
import { cloneDeep } from 'lodash';

import { Label as LabelType } from '@interfaces/index';

import {
  Box,
  ErrorMessageElement,
  Label,
  RefreshDataElement,
  RequiredOptionalLabel,
  Tooltip,
} from '@components/index';

import { useFetchEntity } from '@hooks/index';

const semiLargeSelectStyle = {
  minHeight: '2.25rem',
  width: '100%',
  fontSize: COMPONENTS_FONT_SIZE,
};

type Entity = LabelType;

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
  endpoint: string;
  enableByPermission: boolean;
  size?: 'large' | 'middle' | 'small' | 'semi-large';
  withoutRefreshData?: boolean;
  formatLabel?: (entity: Entity) => string;
  maxTagTextLength?: number;
  maxTagCount?: number;
  actionButton?: ReactNode;
  additionalOptions?: Option[];
  exclude?: string[];
};

export type Option = {
  label: string;
  value: string;
  newOption?: boolean;
};

const SelectDataField = (props: Props) => {
  const {
    label,
    required,
    withoutOptionalText,
    value,
    mode = 'multiple',
    onChange,
    placeholder,
    errorMessage,
    labelKey,
    valueKey,
    onClear,
    endpoint,
    enableByPermission,
    size = 'semi-large',
    withoutRefreshData,
    formatLabel,
    maxTagTextLength,
    maxTagCount,
    actionButton,
    additionalOptions,
    exclude = [],
  } = props;

  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

  const { refresh } = useFetchEntity({
    queryKey: endpoint,
    setEntities: setOptions,
    setIsLoading,
    listQuery: true,
    formatRecords: (records) =>
      records.map((record) => ({
        label: formatLabel
          ? formatLabel(record as unknown as Entity)
          : String(record[labelKey as keyof typeof record] || ''),
        value: String(record[(valueKey || 'id') as keyof typeof record] || ''),
      })),
    enableByPermission,
  });

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
    setFilteredOptions(cloneDeep(options));
  }, [options, additionalOptions]);

  useEffect(() => {
    return () => {
      setOptions([]);
      setIsLoading(false);
      setFilteredOptions([]);
    };
  }, []);

  return (
    <Box className="flex flex-col space-y-1 w-full">
      {label && (
        <Box className="flex items-center space-x-1">
          <Label>{label}</Label>
          <RequiredOptionalLabel
            required={Boolean(required)}
            withoutOptionalText={withoutOptionalText}
          />
        </Box>
      )}

      <Box className="flex items-center w-full space-x-3">
        {mode === 'multiple' && (
          <Select
            open={isDropdownOpen}
            onDropdownVisibleChange={(open) => setIsDropdownOpen(open)}
            mode={mode}
            size={size === 'semi-large' ? 'middle' : size}
            style={semiLargeSelectStyle}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            options={filteredOptions.filter(
              (option) => !exclude.includes(option.value)
            )}
            disabled={isLoading}
            loading={isLoading}
            maxTagTextLength={maxTagTextLength}
            maxTagCount={maxTagCount}
            filterOption={false}
            onSearch={handleSearch}
            onClear={onClear}
            allowClear={Boolean(onClear)}
            maxTagPlaceholder={(omittedValues) =>
              maxTagTextLength ? (
                <Tooltip
                  text={
                    <Box className="flex flex-col">
                      {omittedValues.map(({ label }, index) => (
                        <span key={index} className="truncate">
                          {label}
                        </span>
                      ))}
                    </Box>
                  }
                >
                  <span>{`+ ${omittedValues.length} ...`}</span>
                </Tooltip>
              ) : undefined
            }
            dropdownRender={(menu) =>
              actionButton ? (
                <div className="flex flex-col space-y-1">
                  {actionButton}

                  {menu}
                </div>
              ) : (
                menu
              )
            }
          />
        )}

        {mode === 'single' && (
          <Select
            open={isDropdownOpen}
            onDropdownVisibleChange={(open) => setIsDropdownOpen(open)}
            size={size === 'semi-large' ? 'middle' : size}
            style={semiLargeSelectStyle}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            options={filteredOptions.filter(
              (option) => !exclude.includes(option.value)
            )}
            disabled={isLoading}
            loading={isLoading}
            onSearch={handleSearch}
            filterOption={false}
            showSearch
            onClear={onClear}
            dropdownRender={(menu) =>
              actionButton ? (
                <Box className="flex flex-col space-y-1 w-full">
                  <Box
                    className="w-full flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen(false);
                    }}
                  >
                    {actionButton}
                  </Box>

                  {menu}
                </Box>
              ) : (
                menu
              )
            }
            allowClear={Boolean(onClear)}
          />
        )}

        {!withoutRefreshData && (
          <RefreshDataElement isLoading={isLoading} refresh={refresh} />
        )}
      </Box>

      <ErrorMessageElement errorMessage={errorMessage} />
    </Box>
  );
};

export default SelectDataField;
