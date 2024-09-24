/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { LegacyRef } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

type Props = {
  innerRef: LegacyRef<ReCAPTCHA> | undefined;
};

const Captcha = (props: Props) => {
  const { innerRef } = props;

  return (
    <ReCAPTCHA
      ref={innerRef}
      size="invisible"
      sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
    />
  );
};

export default Captcha;
