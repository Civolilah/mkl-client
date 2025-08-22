/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState } from 'react';

import { Box, FeedbackModal, Icon, Tooltip } from '@components/index';

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

const NavBarIconsBox = () => {
  const t = useTranslation();
  const colors = useColors();
  const accentColor = useAccentColor();

  const [feedbackModalVisible, setFeedbackModalVisible] =
    useState<boolean>(false);

  return (
    <>
      <FeedbackModal
        visible={feedbackModalVisible}
        onClose={() => setFeedbackModalVisible(false)}
      />

      <Box
        className="flex py-3 border-t items-center justify-center relative"
        style={{ borderColor: colors.$1, height: '2.85rem' }}
      >
        <Box
          className="flex space-x-5 items-center justify-center"
          style={{ color: accentColor }}
        >
          <Tooltip text={t('contact_us')} withoutClickOpenOnMobile>
            <div className="cursor-pointer">
              <Icon name="email" size="1.375rem" />
            </div>
          </Tooltip>

          <Tooltip text={t('about_us')} withoutClickOpenOnMobile>
            <div className="cursor-pointer">
              <Icon name="information" size="1.425rem" />
            </div>
          </Tooltip>

          <Tooltip text={t('feedback_bugs_features')} withoutClickOpenOnMobile>
            <div
              className="cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                setFeedbackModalVisible(true);
              }}
            >
              <Icon name="feedback" size="1.3rem" />
            </div>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default NavBarIconsBox;
