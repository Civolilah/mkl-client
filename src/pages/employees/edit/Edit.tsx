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
import { endpoint, request, route, useToast } from '@helpers/index';
import { cloneDeep, isEqual } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';

import { User, ValidationErrors } from '@interfaces/index';

import {
  ActionPopoverIcon,
  AISearchAction,
  Box,
  FooterAction,
  RefreshDataElement,
} from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useFetchEntity,
  useHasPermission,
  useMobileActions,
  usePageLayoutAndActions,
  useRefetch,
  useTranslation,
} from '@hooks/index';

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

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const refetch = useRefetch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
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

  const actions = useActions({ refresh });

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

          refetch(['users']);

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

  usePageLayoutAndActions(
    {
      title: t('edit_employee'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isLoading,
        isDisabled: isLoading,
        onClick: handleSave,
        disabledWithLoadingIcon: isLoading,
      },
      actions: {
        list: employee ? actions(employee) : [],
      },
      footer: isLargeScreen ? (
        <Box className="flex w-full items-center justify-end">
          <RefreshDataElement
            isLoading={isLoading}
            refresh={refresh}
            tooltipPlacement="left"
          />
        </Box>
      ) : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="employees"
            onClick={() => {
              navigate(route('/employees'));
            }}
            iconName="employees"
            disabled={isLoading}
            iconSize="1.3rem"
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading}
            iconSize="1.2rem"
          />

          <FooterAction
            text="actions"
            iconForPopover={(isOpen) => <ActionPopoverIcon isOpen={isOpen} />}
            disabled={isLoading}
            actions={employee ? actions(employee) : []}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [employee, isLoading, handleSave]
  );

  useMobileActions(
    [
      {
        iconName: 'add',
        iconSize: '1.6rem',
        onClick: () => navigate(route('/employees/new')),
        visible: true,
        disabled: isLoading,
      },
    ],
    [isLoading, isLargeScreen]
  );

  return (
    <EmployeeForm
      employee={employee}
      setEmployee={setEmployee}
      errors={errors}
      editPage
      isLoading={isLoading && !employee}
      onRefresh={refresh}
    />
  );
};

export default Edit;
