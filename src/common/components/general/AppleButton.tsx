/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState, useRef } from 'react';

import { useToast } from '@helpers/index';
import classNames from 'classnames';
import AppleSignInButton, { AppleAuthResponse } from 'react-apple-signin-auth';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { AppleDetails } from '@pages/authentication/login/Login';
import { AccessType } from '@pages/authentication/register/Register';

import { useAccentColor, useColors } from '@hooks/index';

const Div = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};

  ${(props) =>
    !props.theme.disabled &&
    `
    &:hover {
      border: 1px solid ${props.theme.hoverBorderColor};
      background-color: ${props.theme.hoverBackgroundColor};
    }
  `}
`;

type AppleLogoProps = {
  isHovered: boolean;
};

const AppleLogo = ({ isHovered }: AppleLogoProps) => (
  <svg
    width="1.75rem"
    height="1.75rem"
    fill={isHovered ? '#FFFFFF' : '#000000'}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"></path>
    </g>
  </svg>
);

const generateSecureNonce = (): string => {
  return v4().replace(/-/g, '');
};

const generateSecureState = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = v4().slice(0, 8);
  return `${timestamp}_${randomPart}`;
};

type Props = {
  disabled: boolean;
  handleAccessApp: (
    type: AccessType,
    token?: string,
    appleDetails?: AppleDetails
  ) => void;
};

const AppleButton = ({ disabled, handleAccessApp }: Props) => {
  const toast = useToast();

  const colors = useColors();
  const accentColor = useAccentColor();

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const currentSessionRef = useRef<{
    state: string;
    nonce: string;
    timestamp: number;
  } | null>(null);

  const createNewSession = () => {
    const newSession = {
      state: generateSecureState(),
      nonce: generateSecureNonce(),
      timestamp: Date.now(),
    };

    currentSessionRef.current = newSession;
    return newSession;
  };

  const validateSession = (receivedState: string): boolean => {
    const session = currentSessionRef.current;

    if (!session) {
      return false;
    }

    if (session.state !== receivedState) {
      return false;
    }

    const tenMinutes = 10 * 60 * 1000;
    if (Date.now() - session.timestamp > tenMinutes) {
      return false;
    }

    return true;
  };

  // console.log(
  //   jwtDecode(
  //     'eyJraWQiOiJTZjJsRnF3a3BYIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmVjb21rbC53ZWJhcHBzaSIsImV4cCI6MTc1NTA4NzIxOSwiaWF0IjoxNzU1MDAwODE5LCJzdWIiOiIwMDE5NDQuNzAyN2I1YTkwOWJmNGVlYTkwMTU0MzY4MWU1MmUyOTYuMTIxMyIsIm5vbmNlIjoiNmY4OWE0ZWQ3YTQ2NDEwMDlkZGJlYzc4YTc1Zjk4NzIiLCJjX2hhc2giOiJTc2NnejlPcVhqbU4yVkFtRmcycVBnIiwiZW1haWwiOiJoanNmajZqbjY1QHByaXZhdGVyZWxheS5hcHBsZWlkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE3NTUwMDA4MTksIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZX0.GC20nvdeFybw-tatUJfQeiZO9ITjvyt2Syf6QLmWzbREjmaSmgmNzanUZl8sGX9j0ExLePvriXo23DxUkIUoNCGnAe-p8AMcO68HS6SeQpXpwNsDODqyXdjfq4PZZfso8fVR4pnXaH-Z6WCa5D5Zt5i4L3z9PjnJAg1cCWVwUN2jiHHTa7XmOE6rUHrGu89LFzPsTQBShRsCRMOnhNnI-WTVxMd20Nsb_bMBREW8cnAPIHr1VXdi34NMNMl5sSS8wDbykwjNbEVriXuaL4nrRMPNb0hEqmItKCmKS9nMgNJp4FuvmI4z3rR1NKuojdJSYrMs9NjVIGpBF788GD7ELg'
  //   )
  // );

  const handleAppleSuccess = (response: AppleAuthResponse) => {
    console.log(response);

    if (!validateSession(response.authorization.code)) {
      toast.error('Authentication validation failed');
      return;
    }

    currentSessionRef.current = null;

    handleAccessApp(
      'apple',
      response.authorization?.id_token,
      response.user?.name
        ? {
            first_name: response.user?.name.firstName,
            last_name: response.user?.name.lastName,
          }
        : undefined
    );
  };

  const handleAppleError = (error: { error: string }) => {
    currentSessionRef.current = null;

    if (error?.error !== 'popup_closed_by_user') {
      toast.error('something_went_wrong');
    }
  };

  const authOptions = (() => {
    const session = createNewSession();

    return {
      clientId: import.meta.env.VITE_APPLE_CLIENT_ID as string,
      scope: 'email name',
      redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI as string,
      state: session.state,
      nonce: session.nonce,
      usePopup: true,
    };
  })();

  return (
    <AppleSignInButton
      authOptions={authOptions}
      uiType="light"
      render={({ onClick }: { onClick: () => void }) => (
        <Div
          className={classNames(
            'flex items-center justify-center space-x-4 w-full py-1.5 text-sm font-medium border rounded-full',
            {
              'cursor-not-allowed pointer-events-none opacity-75': disabled,
              'cursor-pointer': !disabled,
            }
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          theme={{
            borderColor: isHovered ? '' : colors.$1,
            hoverBorderColor: accentColor,
            hoverBackgroundColor: '#000000',
            disabled,
          }}
          onClick={onClick}
        >
          <AppleLogo isHovered={isHovered} />
        </Div>
      )}
      onSuccess={handleAppleSuccess}
      onError={handleAppleError}
    />
  );
};

export default AppleButton;
