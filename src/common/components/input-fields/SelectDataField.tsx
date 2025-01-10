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
import { useMediaQuery } from 'react-responsive';

import { Box, Icon, Label, Text, Tooltip } from '@components/index';

import { useFetchEntity, useTranslation } from '@hooks/index';

type Props = {
  label?: string;
  required?: boolean;
  withoutOptionalText?: boolean;
  mode?: 'multiple' | 'tags';
  value: string[];
  placeholder?: string;
  onChange: (value: string[]) => void;
  errorMessage?: string;
  labelKey?: string;
  valueKey?: string;
  onClear?: () => void;
  endpoint: string;
};

type Option = {
  label: string;
  value: string;
};

const SelectDataField = (props: Props) => {
  const t = useTranslation();

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
  } = props;

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

  const { refresh } = useFetchEntity({
    queryKey: endpoint,
    setEntities: setOptions,
    setIsLoading,
    listQuery: true,
    formatRecords: (records) =>
      records.map((record) => ({
        label: record[labelKey as keyof Option],
        value: record[(valueKey || 'id') as keyof Option],
      })),
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
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    return () => {
      setOptions([]);
      setIsLoading(false);
      setFilteredOptions([]);
    };
  }, []);

  return (
    <Box className="flex flex-col space-y-2 w-full">
      {label && (
        <Box className="flex items-center space-x-1">
          <Label>{label}</Label>

          {required ? (
            <Text style={{ fontSize: isSmallScreen ? '0.65rem' : '0.72rem' }}>
              ({t('required')})
            </Text>
          ) : (
            <>
              {Boolean(!withoutOptionalText) && (
                <Text
                  style={{ fontSize: isSmallScreen ? '0.65rem' : '0.72rem' }}
                >
                  ({t('optional')})
                </Text>
              )}
            </>
          )}
        </Box>
      )}

      <Box className="flex items-center w-full space-x-3">
        <Select
          mode={mode}
          size="large"
          style={{ width: '100%' }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          options={filteredOptions}
          disabled={isLoading}
          loading={isLoading}
          filterOption={false}
          onSearch={handleSearch}
          onClear={onClear}
          allowClear={Boolean(onClear)}
        />

        <Tooltip text={t('refresh_data')}>
          <div
            className="cursor-pointer"
            onClick={() => !isLoading && refresh()}
          >
            <Icon name="refresh" size="1.45rem" />
          </div>
        </Tooltip>
      </Box>

      {errorMessage && (
        <Box className="mt-1 text-sm text-red-600 flex items-center space-x-1">
          <Box className="mt-0.5">
            <Icon name="error" size={19} style={{ color: '#dc2626' }} />
          </Box>

          <Text className="break-words">{errorMessage}</Text>
        </Box>
      )}
    </Box>
  );
};

export default SelectDataField;
