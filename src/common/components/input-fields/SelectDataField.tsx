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
import { useMediaQuery } from 'react-responsive';

import { Box, Icon, Label, Text } from '@components/index';

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
  } = props;

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(options);

  const { refresh } = useFetchEntity({
    queryKey: '/api/subsidiaries',
    setEntities: setOptions,
    setIsLoading,
    listQuery: true,
  });

  useEffect(() => {
    if (labelKey) {
      setOptions(
        options.map((option) => ({
          label: option[labelKey as keyof Option],
          value: option[valueKey || ('id' as keyof Option)],
        }))
      );
    }
  }, [options]);

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

      <Select
        mode={mode}
        size="large"
        className="outline-none"
        style={{ width: '100%', boxShadow: 'none !important' }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options}
        loading={false}
        filterOption={() => true}
      />

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
