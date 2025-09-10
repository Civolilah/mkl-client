/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Box, Card, Icon, LabelElement, Text, Toggle } from '@components/index';

import { useTranslation } from '@hooks/index';

import { NotificationsProps } from '../../Notifications';
import useHandleChange from '../hooks/useHandleChange';

const NotificationsCard = ({
  notifications,
  setNotifications,
  isLoading,
}: NotificationsProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setNotifications });

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="notifications" size="1.5rem" />
          </Box>

          <Text>{t('notifications')}</Text>
        </Box>
      }
      className="w-full"
      isLoading={isLoading}
    >
      <LabelElement
        label={t('enable_notifications')}
        helpLabel={t('enable_notifications_help')}
        twoGridColumns
        withoutOptionalText
      >
        <Toggle
          checked={notifications?.enabled_web_notifications || false}
          onChange={(value) => handleChange('enabled_web_notifications', value)}
        />
      </LabelElement>
    </Card>
  );
};

export default NotificationsCard;
