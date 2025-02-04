/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useMediaQuery } from 'react-responsive';

import { Text } from '@components/index';

import { useTranslation } from '@hooks/index';

type Props = {
  required: boolean;
  withoutOptionalText?: boolean;
};

const RequiredOptionalLabel = (props: Props) => {
  const t = useTranslation();

  const { required, withoutOptionalText } = props;

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      {required ? (
        <Text style={{ fontSize: isSmallScreen ? '0.6rem' : '0.65rem' }}>
          ({t('required')})
        </Text>
      ) : (
        <>
          {Boolean(!withoutOptionalText) && (
            <Text style={{ fontSize: isSmallScreen ? '0.6rem' : '0.65rem' }}>
              ({t('optional')})
            </Text>
          )}
        </>
      )}
    </>
  );
};

export default RequiredOptionalLabel;
