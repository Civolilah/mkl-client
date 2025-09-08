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

import {
  Box,
  HelpLabel,
  Label,
  RequiredOptionalLabel,
} from '@components/index';

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

  return (
    <Box
      className={classNames(
        `flex flex-col space-y-2 sm:space-y-0 lg:flex-row sm:grid sm:gap-10 ${className}`,
        {
          'py-4 sm:py-3': !props.noVerticalPadding,
          'lg:items-center': !props.withoutItemsCenter,
          'sm:grid-cols-2': props.twoGridColumns,
          'sm:grid-cols-3': !props.twoGridColumns,
        }
      )}
    >
      <Box
        className={classNames('flex flex-col', {
          'opacity-75': props.disabledLabels,
        })}
      >
        <Box className="flex items-center space-x-1">
          <Box className="flex items-center">
            <Label>{label}</Label>

            {required && <span className="text-red-500 mb-1 ml-0.5">*</span>}
          </Box>

          <RequiredOptionalLabel
            required={Boolean(required)}
            withoutOptionalText={withoutOptionalText}
          />
        </Box>

        {helpLabel && <HelpLabel text={helpLabel} />}
      </Box>

      <Box
        className={classNames({
          'flex flex-col sm:flex-row sm:justify-end': props.pushContentToRight,
          'sm:col-span-1 sm:self-center': props.twoGridColumns,
          'sm:col-span-2 sm:self-center': !props.twoGridColumns,
        })}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default LabelElement;
