/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useTranslation } from '@hooks/index';

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

  return (
    <Default title={t('new_employee')} breadcrumbs={breadcrumbs}>
      Create
    </Default>
  );
};

export default Create;
