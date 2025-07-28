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

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { endpoint, request, useToast } from '@helpers/index';
import { cloneDeep, isEqual } from 'lodash';
import { useParams } from 'react-router-dom';

import { User, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import EmployeeForm from '../common/components/EmployeeForm';
import { validateEmployee } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('employees'),
      href: '/employees',
    },
    {
      title: t('edit_employee'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const actions = useActions();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employee, setEmployee] = useState<User | undefined>();
  const [initialResponse, setInitialResponse] = useState<User | undefined>();

  const { refresh } = useFetchEntity<User>({
    queryIdentifiers: ['/api/users'],
    endpoint: '/api/users',
    setEntity: setEmployee,
    setIsLoading,
    setInitialResponse,
    enableByPermission: hasPermission('admin'),
  });

  const handleSave = async () => {
    if (!isLoading && id && employee) {
      if (isEqual(initialResponse, employee)) {
        toast.info('no_employee_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateEmployee(employee, {
        creatingUser: false,
        password: employee.password,
      });

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request(
        'PATCH',
        endpoint('/api/users/:id/update_employee', { id }),
        employee
      )
        .then(() => {
          setEmployee(
            (prev) =>
              prev && {
                ...prev,
                password: '',
              }
          );

          toast.success('updated_employee');
          setInitialResponse(cloneDeep(employee));
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [employee]);

  useEffect(() => {
    return () => {
      setErrors({});
      setEmployee(undefined);
    };
  }, []);

  return (
    <Default
      title={t('edit_employee')}
      breadcrumbs={breadcrumbs}
      onSaveClick={handleSave}
      disabledSaveButton={isLoading}
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && employee)}
      actions={employee ? actions(employee) : []}
    >
      <EmployeeForm
        employee={employee}
        setEmployee={setEmployee}
        errors={errors}
        editPage
        isLoading={isLoading && !employee}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
