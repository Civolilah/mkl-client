/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

export type User = {
  id?: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  permissions: string[];
  subsidiaries: string[];
  password?: string;
  password_confirmation?: string;
};
