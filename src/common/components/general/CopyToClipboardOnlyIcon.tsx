/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useToast } from '@helpers/index';
import copy from 'copy-to-clipboard';

import { useTranslation } from '@hooks/index';

import Icon from './Icon';
import Tooltip from './Tooltip';

type Props = {
  text: string;
};

const CopyToClipboardOnlyIcon = ({ text }: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const handleCopy = () => {
    copy(text);

    toast.success(t('copied_to_clipboard'));
  };

  return (
    <Tooltip text={t('copy_to_clipboard')}>
      <div
        className="cursor-pointer"
        onClick={(event) => {
          event.stopPropagation();

          handleCopy();
        }}
      >
        <Icon name="copy" size={19} />
      </div>
    </Tooltip>
  );
};

export default CopyToClipboardOnlyIcon;
