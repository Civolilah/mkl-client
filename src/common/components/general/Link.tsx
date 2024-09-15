/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode } from 'react';

import classNames from 'classnames';
import { Link as BaseLink } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  to: string;
  className?: string;
  children: ReactNode;
  target?: '_blank';
  locale?: 'en' | 'tr';
  disableHoverColor?: boolean;
  enableUnderline?: boolean;
  constantUnderline?: boolean;
};

const StyledLink = styled(BaseLink)`
  &:hover {
    color: ${(props) => props.theme.hoverColor};
  }
`;

const Link = (props: Props) => {
  const {
    children,
    to,
    target,
    className,
    enableUnderline,
    constantUnderline,
  } = props;

  return (
    <StyledLink
      to={to}
      className={classNames(
        'transition-colors duration-200',
        {
          'hover:underline': enableUnderline,
          underline: constantUnderline,
        },
        className
      )}
      target={target}
      style={{ letterSpacing: 0.8 }}
      theme={{ hoverColor: '#2E6CBD' }}
    >
      {children}
    </StyledLink>
  );
};

export default Link;
