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
import { useMediaQuery } from 'react-responsive';

import { Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

type Props = {
  label?: ReactNode;
  helpLabel?: ReactNode;
  pushContentToRight?: boolean;
  required?: boolean;
  children?: ReactNode;
  className?: string;
  withoutItemsCenter?: boolean;
  withoutWrappingLeftSide?: boolean;
  disabledLabels?: boolean;
  noVerticalPadding?: boolean;
  twoGridColumns?: boolean;
  withoutOptionalText?: boolean;
};

const LabelElement = (props: Props) => {
  const { required, withoutOptionalText, className, label, helpLabel } = props;

  const t = useTranslation();
  const colors = useColors();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div
      className={classNames(
        `flex flex-col lg:flex-row sm:grid sm:gap-10 ${className}`,
        {
          'py-4 sm:py-3': !props.noVerticalPadding,
          'lg:items-center': !props.withoutItemsCenter,
          'sm:grid-cols-2': props.twoGridColumns,
          'sm:grid-cols-3': !props.twoGridColumns,
        }
      )}
    >
      <div
        className={classNames('flex flex-col', {
          'opacity-75': props.disabledLabels,
        })}
      >
        <div className="flex items-center space-x-1">
          <Text
            style={{
              fontSize: isSmallScreen ? '14px' : '15px',
              fontWeight: 500,
            }}
          >
            {label}
          </Text>

          {required ? (
            <span className="self-start text-red-600">*</span>
          ) : (
            <>
              {Boolean(!withoutOptionalText) && (
                <span style={{ fontSize: isSmallScreen ? '11.5px' : '12.5px' }}>
                  ({t('optional')})
                </span>
              )}
            </>
          )}
        </div>

        {helpLabel && (
          <div
            style={{
              color: colors.$16,
              fontSize: isSmallScreen ? '12px' : '13.35px',
            }}
          >
            {helpLabel}
          </div>
        )}
      </div>

      <div
        className={classNames({
          'flex flex-col sm:flex-row sm:justify-end': props.pushContentToRight,
          'sm:col-span-1': props.twoGridColumns,
          'sm:col-span-2': !props.twoGridColumns,
        })}
      >
        {props.children}
      </div>
    </div>
  );
};

export default LabelElement;
