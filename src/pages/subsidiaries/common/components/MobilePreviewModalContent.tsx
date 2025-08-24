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

import { Subsidiary } from '@interfaces/index';

import { Box, Button, LabelElement, Text } from '@components/index';

import { useResolveCountry, useTranslation } from '@hooks/index';

interface Props {
  entity: Subsidiary;
  refresh: () => void;
}

const MobilePreviewModalContent = ({ entity }: Props) => {
  const t = useTranslation();

  const navigate = useNavigate();
  const resolveCountry = useResolveCountry();

  return (
    <Box className="flex flex-col w-full">
      <LabelElement label={t('name')} withoutOptionalText>
        <Text className="font-medium">{entity.name}</Text>
      </LabelElement>

      <LabelElement label={t('address')} withoutOptionalText>
        <Text className="font-medium">{entity.address || t('no_entry')}</Text>
      </LabelElement>

      <LabelElement label={t('city')} withoutOptionalText>
        <Text className="font-medium">{entity.city || t('no_entry')}</Text>
      </LabelElement>

      <LabelElement label={t('zip_code')} withoutOptionalText>
        <Text className="font-medium">{entity.zip_code || t('no_entry')}</Text>
      </LabelElement>

      <LabelElement label={t('country')} withoutOptionalText>
        <Text className="font-medium">
          {resolveCountry(entity.country_id || '') || t('no_entry')}
        </Text>
      </LabelElement>

      <Button
        className="w-full mt-4"
        onClick={() =>
          navigate(route('/subsidiaries/:id/edit', { id: entity.id || '' }))
        }
      >
        {t('edit')}
      </Button>
    </Box>
  );
};

export default MobilePreviewModalContent;
