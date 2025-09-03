/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { BreadcrumbItem } from '@components/layout/Default';

import { usePageLayoutAndActions, useTranslation } from '@hooks/index';

const Profile = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('settings'),
      href: '/settings',
    },
  ];

  usePageLayoutAndActions(
    {
      title: t('settings'),
      breadcrumbs: {
        breadcrumbs,
      },
    },
    []
  );

  return <div>Profile</div>;
};

export default Profile;
