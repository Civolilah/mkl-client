/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import classNames from 'classnames';

import { Icon, Tooltip } from '@components/index';

import { useTranslation } from '@hooks/index';

type Props = {
  isLoading: boolean;
  refresh: () => void;
  iconSize?: string;
  tooltipPlacement?: 'left' | 'right' | 'top' | 'bottom';
};

const RefreshDataElement = ({
  isLoading,
  refresh,
  iconSize = '1.35rem',
  tooltipPlacement = 'top',
}: Props) => {
  const t = useTranslation();

  return (
    <Tooltip
      text={t('reload_data')}
      placement={tooltipPlacement}
      withoutClickOpenOnMobile
    >
      <div
        className={classNames({
          'cursor-not-allowed': isLoading,
          'cursor-pointer': !isLoading,
        })}
        onClick={() => {
          if (!isLoading) {
            refresh();
          }
        }}
      >
        <Icon name="refresh" size={iconSize} />
      </div>
    </Tooltip>
  );
};

export default RefreshDataElement;
