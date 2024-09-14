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

import { INITIAL_STATUS } from '@constants/index';

import { Status } from '@interfaces/index';

import { Card, Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useTranslation } from '@hooks/index';

import Form from '../components/Form';

const Create = () => {
  const t = useTranslation();

  const [status, setStatus] = useState<Status>(INITIAL_STATUS);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('statuses'),
      href: '/statuses',
    },
    {
      title: t('new_status'),
    },
  ];

  const handleSave = () => {
    console.log('save');
  };

  return (
    <Default title={t('new_status')} breadcrumbs={breadcrumbs}>
      <Card
        title={t('new_status')}
        className="w-full md:w-3/4 xl:w-1/2"
        onSaveClick={handleSave}
      >
        <Form status={status} setStatus={setStatus} />
      </Card>
    </Default>
  );
};

export default Create;
