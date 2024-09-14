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
  children: React.ReactNode;
};

const CopyToClipboard = ({ children, text }: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const handleCopy = () => {
    copy(text);

    toast.success(t('copied_to_clipboard'));
  };

  return (
    <div className="flex items-center space-x-2">
      <div>{children}</div>

      <Tooltip text={t('copy_to_clipboard')}>
        <div
          onClick={(event) => {
            event.stopPropagation();

            handleCopy();
          }}
        >
          <Icon name="copy" size={19} />
        </div>
      </Tooltip>
    </div>
  );
};

export default CopyToClipboard;
