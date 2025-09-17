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

import { route } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';

import { User } from '@interfaces/index';

import {
  AISearchAction,
  Box,
  Card,
  CopyToClipboardOnlyIcon,
  FooterAction,
  LabelElement,
  Link,
  RefreshDataElement,
  Text,
} from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useFetchEntity,
  useFindSubsidiary,
  useFindWarehouse,
  useHasPermission,
  useMobileActions,
  usePageLayoutAndActions,
  useTranslation,
} from '@hooks/index';

const Show = () => {
  const t = useTranslation();

  const { id } = useParams();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('employees'),
      href: '/employees',
    },
    {
      title: t('view_employee'),
      href: route('/employees/:id/show', { id: id || '' }),
    },
  ];

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();
  const hasPermission = useHasPermission();
  const { findWarehouseById } = useFindWarehouse();
  const { findSubsidiaryById } = useFindSubsidiary();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employee, setEmployee] = useState<User | undefined>();

  const { refresh } = useFetchEntity<User>({
    queryIdentifiers: ['/api/users'],
    endpoint: '/api/users',
    setEntity: setEmployee,
    setIsLoading,
    enableByPermission: hasPermission('admin'),
  });

  useEffect(() => {
    return () => {
      setEmployee(undefined);
    };
  }, []);

  usePageLayoutAndActions(
    {
      title: t('view_employee'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isLoading,
        isDisabled: isLoading,
        onClick: () => {
          navigate(route('/employees/:id/edit', { id: id || '' }));
        },
        disabledWithLoadingIcon: isLoading,
        label: 'edit',
        iconName: 'edit',
        iconColor: 'white',
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
          />

          <FooterAction
            text="edit"
            onClick={() => {
              navigate(route('/employees/:id/edit', { id: id || '' }));
            }}
            iconName="edit"
            disabled={isLoading}
          />

          <FooterAction
            text="reload"
            onClick={refresh}
            iconName="refresh"
            disabled={isLoading}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [employee, isLoading]
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
    <Box className="flex w-full self-start md:w-full xl:w-3/4 pb-20">
      <Card title={t('view_employee')} className="w-full">
        <LabelElement label={t('first_name')} withoutOptionalText>
          <Text className="font-medium">{employee?.first_name}</Text>
        </LabelElement>

        <LabelElement label={t('last_name')} withoutOptionalText>
          <Text className="font-medium">
            {employee?.last_name || t('no_entry')}
          </Text>
        </LabelElement>

        <LabelElement label={t('email')} withoutOptionalText>
          <Box className="flex items-center gap-x-2">
            <Text className="font-medium">{employee?.email}</Text>

            <CopyToClipboardOnlyIcon
              text={employee?.email as string}
              withoutClickOpenOnMobile
            />
          </Box>
        </LabelElement>

        <LabelElement label={t('phone')} withoutOptionalText>
          <Text className="font-medium">
            {employee?.phone || t('no_entry')}
          </Text>
        </LabelElement>

        <LabelElement label={t('subsidiaries')} withoutOptionalText>
          <Box className="flex items-center flex-wrap">
            {!employee?.subsidiaries_ids?.length && (
              <Text className="font-medium">{t('no_entry')}</Text>
            )}

            {employee?.subsidiaries_ids?.map((subsidiaryId, index, array) => (
              <Box
                key={subsidiaryId}
                className="flex items-center whitespace-nowrap"
              >
                <Link
                  to={route('/subsidiaries/:id/edit', { id: subsidiaryId })}
                >
                  {findSubsidiaryById(subsidiaryId)?.name}
                </Link>

                {index < array.length - 1 && <Text className="mx-2">|</Text>}
              </Box>
            ))}
          </Box>
        </LabelElement>

        <LabelElement label={t('warehouses')} withoutOptionalText>
          <Box className="flex items-center flex-wrap">
            {!employee?.warehouses_ids?.length && (
              <Text className="font-medium">{t('no_entry')}</Text>
            )}

            {employee?.warehouses_ids?.map((warehouseId, index, array) => (
              <Box
                key={warehouseId}
                className="flex items-center whitespace-nowrap"
              >
                <Link to={route('/warehouses/:id/edit', { id: warehouseId })}>
                  {findWarehouseById(warehouseId)?.name}
                </Link>

                {index < array.length - 1 && <Text className="mx-2">|</Text>}
              </Box>
            ))}
          </Box>
        </LabelElement>

        <LabelElement label={t('permissions')} withoutOptionalText>
          <Box className="flex items-center flex-wrap">
            {employee?.permissions?.map((permission, index, array) => (
              <Box key={index} className="flex items-center whitespace-nowrap">
                <Text className="font-medium">{t(permission)}</Text>

                {index < array.length - 1 && <Text className="mx-2">|</Text>}
              </Box>
            ))}

            {employee?.permissions?.length === 0 && (
              <Text className="font-medium">
                {t('no_permissions_assigned')}
              </Text>
            )}
          </Box>
        </LabelElement>
      </Card>
    </Box>
  );
};

export default Show;
