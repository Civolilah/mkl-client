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

const Products = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('products'),
      href: '/products',
    },
    {
      title: t('products'),
    },
  ];

  return (
    <Default breadcrumbs={breadcrumbs} title={t('products')}>
      {t('prevedeno')}
    </Default>
  );
};

export default Products;
