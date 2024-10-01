/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import Turnstile from 'react-turnstile';

type Props = {
  onVerify: (token: string) => void;
};

const Captcha = (props: Props) => {
  const { onVerify } = props;

  return (
    <Turnstile
      sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
      appearance="always"
      onVerify={onVerify}
    />
  );
};

export default Captcha;
