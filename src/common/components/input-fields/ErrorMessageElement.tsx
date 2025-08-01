/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Box, Icon, Text } from '@components/index';

type Props = {
  errorMessage: string | undefined;
};

const ErrorMessageElement = ({ errorMessage }: Props) => {
  return (
    <>
      {errorMessage && (
        <Box className="mt-1 text-sm text-red-600 flex items-center space-x-1">
          <Box className="mt-0.5">
            <Icon name="error" size="1.25rem" style={{ color: '#dc2626' }} />
          </Box>

          <Text className="break-words text-sm">{errorMessage}</Text>
        </Box>
      )}
    </>
  );
};

export default ErrorMessageElement;
