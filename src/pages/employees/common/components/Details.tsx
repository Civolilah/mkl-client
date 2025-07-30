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

import { User } from '@interfaces/index';

import {
  Box,
  Card,
  InformationLabel,
  RefreshDataElement,
  SubsidiariesSelector,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

export type EmployeeProps = {
  employee: User | undefined;
  editPage: boolean | undefined;
  isLoading: boolean | undefined;
  onRefresh?: () => void;
  errors: Record<string, string>;
  handleChange: (field: keyof User, value: string | string[]) => void;
  setEmployee: Dispatch<SetStateAction<User | undefined>>;
};

const Details = (props: EmployeeProps) => {
  const t = useTranslation();

  const { editPage, isLoading, onRefresh, errors, handleChange, employee } =
    props;

  return (
    <Card
      title={t('details')}
      className="w-full"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
    >
      <Box className="flex flex-col space-y-4 pb-4">
        <TextField
          required
          label={t('first_name')}
          placeHolder={t('first_name_placeholder')}
          value={employee?.first_name || ''}
          onValueChange={(value) => handleChange('first_name', value)}
          changeOnBlur
          errorMessage={errors?.first_name && t(errors.first_name)}
        />

        <TextField
          label={t('last_name')}
          placeHolder={t('last_name_placeholder')}
          value={employee?.last_name || ''}
          onValueChange={(value) => handleChange('last_name', value)}
          changeOnBlur
          errorMessage={errors?.last_name && t(errors.last_name)}
        />

        <TextField
          required
          label={t('email')}
          placeHolder={t('email_placeholder')}
          value={employee?.email || ''}
          onValueChange={(value) => handleChange('email', value)}
          changeOnBlur
          errorMessage={errors?.email && t(errors.email)}
        />

        <TextField
          required={!editPage}
          type="password"
          label={t(editPage ? 'new_password' : 'password')}
          placeHolder={t('password_placeholder')}
          value={employee?.password || ''}
          onValueChange={(value) => handleChange('password', value)}
          changeOnBlur
          errorMessage={errors?.password && t(errors.password)}
        />

        <Box className="flex flex-col space-y-2 w-full">
          <SubsidiariesSelector
            label={t('subsidiaries')}
            placeholder={t('select_subsidiaries')}
            value={employee?.subsidiaries || []}
            onChange={(value) => handleChange('subsidiaries', value)}
            onClear={() => handleChange('subsidiaries', [])}
            errorMessage={errors?.subsidiaries && t(errors.subsidiaries)}
            withActionButton
          />

          <InformationLabel text={t('subsidiary_assigning')} />
        </Box>
      </Box>
    </Card>
  );
};

export default Details;
