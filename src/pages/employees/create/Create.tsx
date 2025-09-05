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

import {
  INITIAL_EMPLOYEE,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { User, ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import EmployeeForm from '../common/components/EmployeeForm';
import { validateEmployee } from '../common/helpers/helpers';
import PermissionAlertModal from './common/components/PermissionAlertModal';

const Create = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('employees'),
      href: '/employees',
    },
    {
      title: t('new_employee'),
    },
  ];

  const toast = useToast();
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isPermissionModalOpenOnce, setIsPermissionModalOpenOnce] =
    useState<boolean>(false);
  const [isPermissionAlertModalOpen, setIsPermissionAlertModalOpen] =
    useState<boolean>(false);
  const [employee, setEmployee] = useState<User | undefined>(INITIAL_EMPLOYEE);

  const handleCheckPermissions = () => {
    if (isPermissionModalOpenOnce) return false;

    if (!employee?.permissions.length) {
      setIsPermissionAlertModalOpen(true);
      setIsPermissionModalOpenOnce(true);

      return true;
    }

    return false;
  };

  const handleSave = async () => {
    if (!employee) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateEmployee(employee, {
        creatingUser: true,
      });

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      const isPermissionAlertRequired = handleCheckPermissions();

      if (isPermissionAlertRequired) {
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/users/add_employee', employee)
        .then((response) => {
          toast.success('created_employee');

          refetch(['users']);

          navigate(route('/employees/:id/edit', { id: response.data.id }));
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

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [employee]);

  useSaveAndDiscardActions(
    {
      disabledSaveButton: isFormBusy,
      disabledDiscardButton: isFormBusy,
      onSaveClick: handleSave,
      onDiscardClick: () => navigate(route('/employees')),
    },
    [employee, isFormBusy, handleSave]
  );

  usePageLayoutAndActions(
    {
      title: t('new_employee'),
      footer: isLargeScreen ? undefined : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="employees"
            onClick={() => {
              navigate(route('/employees'));
            }}
            iconName="employees"
            disabled={isFormBusy}
            iconSize="1.3rem"
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isFormBusy}
            iconSize="1.3rem"
          />

          <AISearchAction disabled={isFormBusy} />
        </Box>
      ),
    },
    [employee, isFormBusy]
  );

  useEffect(() => {
    return () => {
      setErrors({});
      setEmployee(INITIAL_EMPLOYEE);
    };
  }, []);

  return (
    <>
      <PermissionAlertModal
        visible={isPermissionAlertModalOpen}
        setVisible={setIsPermissionAlertModalOpen}
        saveEmployee={handleSave}
      />

      <EmployeeForm
        employee={employee}
        setEmployee={setEmployee}
        errors={errors}
      />
    </>
  );
};

export default Create;
