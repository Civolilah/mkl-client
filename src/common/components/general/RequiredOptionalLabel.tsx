/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Text } from '@components/index';

import { useTranslation } from '@hooks/index';

type Props = {
  required: boolean;
  withoutOptionalText?: boolean;
};

const RequiredOptionalLabel = (props: Props) => {
  const t = useTranslation();

  const { required, withoutOptionalText } = props;

  return (
    <>
      {required ? (
        <Text className="text-xs">({t('required')})</Text>
      ) : (
        <>
          {Boolean(!withoutOptionalText) && (
            <Text className="text-xs">({t('optional')})</Text>
          )}
        </>
      )}
    </>
  );
};

export default RequiredOptionalLabel;
