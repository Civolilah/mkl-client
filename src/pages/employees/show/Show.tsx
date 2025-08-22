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
  Box,
  Card,
  FooterAction,
  LabelElement,
  Link,
  RefreshDataElement,
  Text,
} from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useFetchEntity,
  useHasPermission,
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
            text="dashboard"
            onClick={() => {
              navigate(route('/dashboard'));
            }}
            iconName="dashboard"
            disabled={isLoading}
            iconSize="1.1rem"
          />

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
            text="edit"
            onClick={() => {
              navigate(route('/employees/:id/edit', { id: id || '' }));
            }}
            iconName="edit"
            disabled={isLoading}
            iconSize="1.3rem"
          />

          <FooterAction
            text="reload"
            onClick={refresh}
            iconName="refresh"
            disabled={isLoading}
          />
        </Box>
      ),
    },
    [employee, isLoading]
  );

  return (
    <Box className="flex w-full self-start md:w-full xl:w-3/4">
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
          <Text className="font-medium">{employee?.email}</Text>
        </LabelElement>

        <LabelElement label={t('phone')} withoutOptionalText>
          <Text className="font-medium">
            {employee?.phone || t('no_entry')}
          </Text>
        </LabelElement>

        <LabelElement label={t('subsidiaries')} withoutOptionalText>
          <Box className="flex items-center flex-wrap">
            {employee?.subsidiaries_ids?.map((subsidiaryId, index, array) => (
              <Box
                key={subsidiaryId}
                className="flex items-center whitespace-nowrap"
              >
                <Link
                  to={route('/subsidiaries/:id/edit', { id: subsidiaryId })}
                >
                  {subsidiaryId}
                </Link>

                {index < array.length - 1 && <Text className="mx-2">|</Text>}
              </Box>
            ))}
          </Box>
        </LabelElement>
      </Card>
    </Box>
  );
};

export default Show;
