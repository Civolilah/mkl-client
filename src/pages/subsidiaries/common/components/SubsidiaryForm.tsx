/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction } from 'react';

import { Subsidiary, ValidationErrors } from '@interfaces/index';

import { Box, Card, RefreshDataElement, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

type Props = {
  subsidiary: Subsidiary | undefined;
  setSubsidiary: Dispatch<SetStateAction<Subsidiary | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
};

const SubsidiaryForm = (props: Props) => {
  const t = useTranslation();

  const { subsidiary, setSubsidiary, errors, editPage, isLoading, onRefresh } =
    props;

  const handleChange = useHandleChange({ setSubsidiary });

  return (
    <Card
      title={editPage ? t('edit_subsidiary') : t('new_subsidiary')}
      className="w-full md:w-3/4 xl:w-1/2 pb-6"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement
            isLoading={isLoading}
            refresh={onRefresh}
            iconSize="1.45rem"
          />
        ) : undefined
      }
    >
      <Box className="pb-4">
        <TextField
          required
          label={t('name')}
          value={subsidiary?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />
      </Box>
    </Card>
  );
};

export default SubsidiaryForm;
