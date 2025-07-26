/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { Brand } from '@interfaces/index';

import { Box, Button, Modal, TextField } from '@components/index';
import SelectDataField, {
  Option,
} from '@components/input-fields/SelectDataField';

import { useHasPermission, useTranslation } from '@hooks/index';

type Props = {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string | string[]) => void;
  onClear: () => void;
  errorMessage: string;
  withActionButton?: boolean;
  mode?: 'single' | 'multiple';
};

const BrandSelector = (props: Props) => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const {
    value,
    onChange,
    onClear,
    errorMessage,
    label,
    placeholder,
    withActionButton,
    mode = 'multiple',
  } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [brandPayload, setBrandPayload] = useState<Brand>({
    name: '',
  });

  const [brandOptions, setBrandOptions] = useState<Option[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateBrand = () => {
    setBrandOptions([
      { label: brandPayload.name, value: uuidv4(), newOption: true },
    ]);
    setBrandPayload({ name: '' });
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setBrandPayload({ name: '' });
    setBrandOptions([]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title={t('new_brand')} visible={isModalOpen} onClose={handleClose}>
        <Box className="flex flex-col space-y-6 w-full">
          <TextField
            label={t('name')}
            placeHolder={t('brand_name_placeholder')}
            value={brandPayload.name}
            onValueChange={(value) =>
              setBrandPayload((current) => ({ ...current, name: value }))
            }
          />

          <Button type="primary" onClick={handleCreateBrand}>
            {t('done')}
          </Button>
        </Box>
      </Modal>

      <SelectDataField
        mode={mode}
        label={label}
        placeholder={placeholder}
        valueKey="id"
        labelKey="name"
        endpoint="/api/brands?selector=true"
        enableByPermission={
          hasPermission('create_brand') ||
          hasPermission('view_brand') ||
          hasPermission('edit_brand')
        }
        withoutRefreshData
        value={value}
        onChange={onChange}
        onClear={onClear}
        errorMessage={errorMessage}
        actionButton={
          withActionButton ? (
            <Button
              className="w-full"
              type="primary"
              onClick={() => setTimeout(handleOpenModal, 200)}
            >
              {t('new_brand')}
            </Button>
          ) : undefined
        }
        additionalOptions={brandOptions}
      />
    </>
  );
};

export default BrandSelector;
