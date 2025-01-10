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
};

const RefreshDataElement = ({
  isLoading,
  refresh,
  iconSize = '1.55rem',
}: Props) => {
  const t = useTranslation();

  return (
    <Tooltip text={t('refresh_data')}>
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
