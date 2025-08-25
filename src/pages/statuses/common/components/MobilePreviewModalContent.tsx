/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { route } from '@helpers/index';
import { useNavigate } from 'react-router-dom';

import { Status } from '@interfaces/index';

import { Box, Button, LabelElement, Text } from '@components/index';

import { useTranslation } from '@hooks/index';

import ColorColumn from './ColorColumn';

interface Props {
  entity: Status;
  refresh: () => void;
}

const MobilePreviewModalContent = ({ entity }: Props) => {
  const t = useTranslation();

  const navigate = useNavigate();

  return (
    <Box className="flex flex-col w-full">
      <LabelElement label={t('name')} withoutOptionalText>
        <Text className="font-medium">{entity.name}</Text>
      </LabelElement>

      <LabelElement label={t('color')} withoutOptionalText>
        <Box style={{ minWidth: '9rem' }}>
          <ColorColumn color={entity.color} />
        </Box>
      </LabelElement>

      <Button
        className="w-full mt-4"
        onClick={() =>
          navigate(route('/statuses/:id/edit', { id: entity.id || '' }))
        }
      >
        {t('edit')}
      </Button>
    </Box>
  );
};

export default MobilePreviewModalContent;
