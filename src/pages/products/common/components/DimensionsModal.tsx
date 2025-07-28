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

import { Box, Button, Icon, Modal, NumberField, Text } from '@components/index';

import { useTranslation } from '@hooks/index';

import { VariantCombination } from './InventoryCard';

type Props = {
  selectedCombinationIndex: number | null;
  handleCombinationChange: (
    index: number,
    field: string,
    value: number | boolean
  ) => void;
  variantCombinations: VariantCombination[];
};

const DimensionsModal = ({
  selectedCombinationIndex,
  handleCombinationChange,
  variantCombinations,
}: Props) => {
  const t = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        type="default"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2"
      >
        <Box>
          <Icon name="ruler" size="1rem" />
        </Box>

        <Text>{t('set_dimensions')}</Text>
      </Button>

      <Modal
        title={t('dimensions')}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedCombinationIndex !== null && (
          <Box className="flex flex-col space-y-4 pt-4">
            <NumberField
              label={t('weight')}
              placeHolder={t('enter_weight')}
              value={variantCombinations[selectedCombinationIndex]?.weight || 0}
              onValueChange={(value) =>
                handleCombinationChange(
                  selectedCombinationIndex,
                  'weight',
                  value
                )
              }
              addonAfter="kg"
              min={0}
            />

            <NumberField
              label={t('height')}
              placeHolder={t('enter_height')}
              value={variantCombinations[selectedCombinationIndex]?.height || 0}
              onValueChange={(value) =>
                handleCombinationChange(
                  selectedCombinationIndex,
                  'height',
                  value
                )
              }
              addonAfter="cm"
              min={0}
            />

            <NumberField
              label={t('width')}
              placeHolder={t('enter_width')}
              value={variantCombinations[selectedCombinationIndex]?.width || 0}
              onValueChange={(value) =>
                handleCombinationChange(
                  selectedCombinationIndex,
                  'width',
                  value
                )
              }
              addonAfter="cm"
              min={0}
            />

            <NumberField
              label={t('length')}
              placeHolder={t('enter_length')}
              value={variantCombinations[selectedCombinationIndex]?.length || 0}
              onValueChange={(value) =>
                handleCombinationChange(
                  selectedCombinationIndex,
                  'length',
                  value
                )
              }
              addonAfter="cm"
              min={0}
            />
          </Box>
        )}
      </Modal>
    </>
  );
};

export default DimensionsModal;
