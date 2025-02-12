/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { LabelCategory } from '@interfaces/index';

export type Label = {
  id?: string;
  name: string;
  label_category_id: string;
  label_category?: LabelCategory;
};
