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

import { INITIAL_COMPANY } from '@constants/company/company';
import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Company, ValidationErrors } from '@interfaces/index';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import { Box, Button, Icon, Modal, Text, TextField } from '@components/index';

import { useHasPermission, useRefetch, useTranslation } from '@hooks/index';

const AddCompanyAction = () => {
  const t = useTranslation();

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [searchParams, setSearchParams] = useSearchParams();

  const userCompany = useAtomValue(userCompanyAtom);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [company, setCompany] = useState<Company>(INITIAL_COMPANY);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [createdCompanyId, setCreatedCompanyId] = useState<string>('');
  const [isSwitchToCompanyModalVisible, setIsSwitchToCompanyModalVisible] =
    useState<boolean>(false);

  const handleClose = () => {
    setIsModalVisible(false);
    setCompany(INITIAL_COMPANY);
  };

  const handleCreateCompany = async () => {
    if (!company) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/companies', company)
        .then((response) => {
          toast.success('created_company');

          refetch(['companies']);

          setCreatedCompanyId(response.data.company_id);

          handleClose();

          setTimeout(() => {
            setIsSwitchToCompanyModalVisible(true);
          }, 150);
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        })
        .finally(() => setIsFormBusy(false));
    }
  };

  const handleSwitchToCompany = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('company', createdCompanyId);
    setSearchParams(newSearchParams);

    navigate(route('/'));

    setIsSwitchToCompanyModalVisible(false);
  };

  return (
    <>
      <Modal
        title={t('switch_to_company')}
        visible={isSwitchToCompanyModalVisible}
        onClose={() => setIsSwitchToCompanyModalVisible(false)}
      >
        <Box className="flex flex-col gap-y-4 w-full">
          <Text>{t('switch_company_question')}</Text>

          <Box className="flex justify-between w-full">
            <Button onClick={() => setIsSwitchToCompanyModalVisible(false)}>
              {t('cancel')}
            </Button>

            <Button onClick={handleSwitchToCompany}>{t('switch')}</Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        title={t('new_company')}
        visible={isModalVisible}
        onClose={handleClose}
        size="small"
        disableClosing={isFormBusy}
      >
        {userCompany?.account.plan === 'professional' ||
        userCompany?.account.plan === 'enterprise' ? (
          <Box className="flex flex-col gap-y-4 w-full">
            <TextField
              required
              label={t('name')}
              value={company.name}
              onValueChange={(value) => setCompany({ ...company, name: value })}
              errorMessage={errors.name && t(errors.name)}
            />

            <Button
              onClick={handleCreateCompany}
              disabled={isFormBusy || !company.name}
              disabledWithLoadingIcon={isFormBusy}
            >
              {t('save')}
            </Button>
          </Box>
        ) : (
          <Box className="flex flex-col gap-y-4 w-full">
            <Box className="flex gap-x-4 items-center">
              <Box>
                <Icon name="information" size="1.5rem" />
              </Box>

              <Text className="font-medium">
                {t('add_company_plan_message')}
              </Text>
            </Box>

            <Button
              onClick={() => navigate(route('/settings/account_management'))}
            >
              {t('upgrade_plan')}
            </Button>
          </Box>
        )}
      </Modal>

      {hasPermission('owner') && (
        <Box
          className={classNames('flex items-center gap-x-2 py-2 px-3', {
            'cursor-pointer': !isFormBusy,
            'pointer-events-none': isFormBusy,
          })}
          onClick={() => !isFormBusy && setIsModalVisible(true)}
        >
          <Icon name="add" size="1.5rem" />
          <Text className="text-sm font-medium">{t('new_company')}</Text>
        </Box>
      )}
    </>
  );
};

export default AddCompanyAction;
