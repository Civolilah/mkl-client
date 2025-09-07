/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode } from 'react';

import { route } from '@helpers/index';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { Link as BaseLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { areChangesMadeAtom } from '@hooks/global/useHandleEntityChanges';
import { usePreventAction } from '@hooks/index';

type Props = {
  to: string;
  className?: string;
  children: ReactNode;
  target?: '_blank';
  locale?: 'en' | 'tr';
  disableHoverColor?: boolean;
  style?: CSSProperties;
};

const StyledLink = styled(BaseLink)`
  color: ${(props) => props.theme.color};
  &:hover {
    color: ${(props) => props.theme.hoverColor};
  }
`;

const Link = ({ children, to, target, className, style }: Props) => {
  const navigate = useNavigate();

  const preventAction = usePreventAction();

  const areChangesMade = useAtomValue(areChangesMadeAtom);

  return (
    <StyledLink
      to={areChangesMade ? '' : target !== '_blank' ? route(to) : to}
      className={classNames(
        'transition-colors duration-200 hover:underline',
        className
      )}
      target={target}
      theme={{
        color: '#2E6CBD',
        hoverColor: '#2E6CBD',
      }}
      style={style}
      onClick={() => {
        preventAction({
          action: () => {
            if (target !== '_blank') {
              navigate(route(to));
            } else {
              window.open(to, '_blank');
            }
          },
        });
      }}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
