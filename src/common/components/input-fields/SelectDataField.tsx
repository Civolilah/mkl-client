/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import { Select } from 'antd';
import Fuse from 'fuse.js';
import { cloneDeep } from 'lodash';

import { Label as LabelType, User as UserType } from '@interfaces/index';

import {
  Box,
  ErrorMessageElement,
  Label,
  RefreshDataElement,
  RequiredOptionalLabel,
  Tooltip,
} from '@components/index';

import { useFetchEntity } from '@hooks/index';

type Entity = LabelType | UserType;

type Props = {
  label?: string;
  required?: boolean;
  withoutOptionalText?: boolean;
  mode?: 'multiple' | 'tags' | 'single';
  value: string[];
  placeholder?: string;
  onChange?: (value: string[] | string) => void;
  errorMessage?: string;
  labelKey?: string;
  valueKey?: string;
  onClear?: () => void;
  endpoint: string;
  enableByPermission: boolean;
  size?: 'large' | 'middle' | 'small';
  withoutRefreshData?: boolean;
  formatLabel?: (entity: Entity) => string;
  maxTagTextLength?: number;
  maxTagCount?: number;
  actionButton?: ReactNode;
  additionalOptions?: Option[];
  exclude?: string[];
  disabled?: boolean;
  queryIdentifiers: string[];
  afterLabel?: ReactNode;
  tooltipOverlayInnerStyle?: CSSProperties;
  readOnly?: boolean;
};

export type Option = {
  label: string;
  value: string;
  newOption?: boolean;
};

const SelectDataField = ({
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
  size = 'large',
  withoutRefreshData,
  formatLabel,
  maxTagTextLength,
  maxTagCount,
  actionButton,
  additionalOptions,
  exclude = [],
  disabled,
  queryIdentifiers,
  afterLabel,
  readOnly,
}: Props) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

  const { refresh } = useFetchEntity({
    queryIdentifiers,
    endpoint,
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
    setFilteredOptions(cloneDeep([...(additionalOptions || []), ...options]));
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
          <Box className="flex items-center">
            <Label>{label}</Label>

            {required && <span className="text-red-500 mb-1 ml-0.5">*</span>}
          </Box>

          <RequiredOptionalLabel
            required={Boolean(required)}
            withoutOptionalText={withoutOptionalText}
          />

          {afterLabel}
        </Box>
      )}

      <Box className="flex items-center w-full space-x-3">
        {mode === 'multiple' && (
          <Select
            className="w-full"
            open={isDropdownOpen}
            onDropdownVisibleChange={(open) =>
              !readOnly && setIsDropdownOpen(open)
            }
            mode={mode}
            size={size}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            options={filteredOptions.filter(
              (option) => !exclude.includes(option.value)
            )}
            disabled={disabled || isLoading}
            loading={isLoading}
            maxTagTextLength={maxTagTextLength}
            maxTagCount={maxTagCount}
            filterOption={false}
            onSearch={!readOnly ? handleSearch : undefined}
            onClear={onClear}
            showSearch={!readOnly}
            allowClear={Boolean(onClear)}
            style={{
              minHeight: '2.5rem',
              fontSize: '0.875rem',
              boxShadow: 'none',
            }}
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
                  withoutClickOpenOnMobile
                >
                  <span>{`+ ${omittedValues.length} ...`}</span>
                </Tooltip>
              ) : undefined
            }
            dropdownRender={(menu) =>
              actionButton ? (
                <Box className="flex flex-col space-y-1 w-full">
                  <Box
                    className="w-full flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
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
          />
        )}

        {mode === 'single' && (
          <Select
            className="w-full"
            open={isDropdownOpen}
            onDropdownVisibleChange={(open) =>
              !readOnly && setIsDropdownOpen(open)
            }
            size={size}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            options={filteredOptions.filter(
              (option) => !exclude.includes(option.value)
            )}
            disabled={disabled || isLoading}
            loading={isLoading}
            onSearch={!readOnly ? handleSearch : undefined}
            filterOption={false}
            showSearch={!readOnly}
            onClear={onClear}
            style={{
              height: '2.5rem',
              fontSize: '0.875rem',
              boxShadow: 'none',
            }}
            dropdownRender={(menu) =>
              actionButton ? (
                <Box className="flex flex-col space-y-1 w-full">
                  <Box
                    className="w-full flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
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
