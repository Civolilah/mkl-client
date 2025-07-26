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

import { Subsidiary } from '@interfaces/index';

import { Button, Modal, TextField } from '@components/index';
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
};

const SubsidiariesSelector = (props: Props) => {
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
  } = props;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [subsidiaryPayload, setSubsidiaryPayload] = useState<Subsidiary>({
    name: '',
  });

  const [subsidiaryOptions, setSubsidiaryOptions] = useState<Option[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateSubsidiary = () => {
    setSubsidiaryOptions([
      { label: subsidiaryPayload.name, value: subsidiaryPayload.name },
    ]);
  };

  return (
    <>
      <Modal title={t('new_subsidiary')} visible={isModalOpen}>
        <TextField
          label={t('name')}
          placeHolder={t('subsidiary_placeholder')}
          value={subsidiaryPayload.name}
          onValueChange={(value) =>
            setSubsidiaryPayload((current) => ({ ...current, name: value }))
          }
        />

        <Button type="primary" onClick={handleCreateSubsidiary}>
          {t('done')}
        </Button>
      </Modal>

      <SelectDataField
        label={label}
        placeholder={placeholder}
        valueKey="id"
        labelKey="name"
        endpoint="/api/subsidiaries?selector=true"
        enableByPermission={
          hasPermission('create_subsidiary') ||
          hasPermission('view_subsidiary') ||
          hasPermission('edit_subsidiary')
        }
        withoutRefreshData
        value={value}
        onChange={onChange}
        onClear={onClear}
        errorMessage={errorMessage}
        actionButton={
          withActionButton ? (
            <Button type="primary" onClick={handleOpenModal}>
              {t('new_subsidiary')}
            </Button>
          ) : undefined
        }
        additionalOptions={subsidiaryOptions}
      />
    </>
  );
};

export default SubsidiariesSelector;
