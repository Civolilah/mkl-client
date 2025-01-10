/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Switch } from 'antd';

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};

const Toggle = (props: Props) => {
  const { checked, onChange, disabled } = props;

  return <Switch checked={checked} onChange={onChange} disabled={disabled} />;
};

export default Toggle;
