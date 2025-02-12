/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useGoogleLogin } from '@react-oauth/google';
import classNames from 'classnames';
import styled from 'styled-components';

import { AccessType } from '@pages/authentication/register/Register';

import { Text } from '@components/index';

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

const Div = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};

  ${(props) =>
    !props.theme.disabled &&
    `
    &:hover {
      border: 1px solid ${props.theme.hoverBorderColor};
    }
  `}
`;

const GoogleLogo = () => (
  <svg
    width="1.35rem"
    height="1.35rem"
    viewBox="0 0 775 794"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M775 405.797C775 373.248 772.362 349.496 766.653 324.865H395.408V471.773H613.32C608.929 508.282 585.204 563.264 532.482 600.209L531.743 605.127L649.124 696.166L657.256 696.979C731.943 627.921 775 526.315 775 405.797"
      fill="#4285F4"
    />
    <path
      d="M395.408 792.866C502.167 792.866 591.792 757.676 657.256 696.979L532.482 600.209C499.093 623.521 454.279 639.796 395.408 639.796C290.845 639.796 202.099 570.741 170.463 475.294L165.826 475.688L43.772 570.256L42.1759 574.698C107.198 704.013 240.758 792.866 395.408 792.866Z"
      fill="#34A853"
    />
    <path
      d="M170.463 475.294C162.116 450.662 157.285 424.269 157.285 397C157.285 369.728 162.116 343.338 170.024 318.706L169.803 313.46L46.2193 217.373L42.1759 219.299C15.3772 272.961 0 333.222 0 397C0 460.778 15.3772 521.036 42.1759 574.698L170.463 475.294"
      fill="#FBBC05"
    />
    <path
      d="M395.408 154.201C469.656 154.201 519.74 186.31 548.298 213.143L659.891 104.059C591.356 40.2812 502.167 1.13428 395.408 1.13428C240.758 1.13428 107.198 89.9835 42.1759 219.299L170.024 318.706C202.099 223.259 290.845 154.201 395.408 154.201"
      fill="#EB4335"
    />
  </svg>
);

type Props = {
  disabled: boolean;
  handleAccessApp: (type: AccessType, token?: string) => void;
};

const GoogleButton = (props: Props) => {
  const t = useTranslation();

  const { disabled, handleAccessApp } = props;

  const colors = useColors();
  const accentColor = useAccentColor();

  const login = useGoogleLogin({
    scope: 'profile email',
    onSuccess: (tokenResponse) => {
      handleAccessApp('google', tokenResponse.access_token);
    },
  });

  return (
    <Div
      className={classNames(
        'flex items-center justify-center w-full space-x-4 px-3 py-2.5 text-sm font-medium border',
        {
          'cursor-not-allowed opacity-75': disabled,
          'cursor-pointer': !disabled,
        }
      )}
      onClick={(event) => {
        event.preventDefault();

        login();
      }}
      theme={{
        borderColor: colors.$1,
        hoverBorderColor: accentColor,
        disabled,
      }}
    >
      <GoogleLogo />

      <Text className="text-xs-plus">{t('continue_with_google')}</Text>
    </Div>
  );
};

export default GoogleButton;
