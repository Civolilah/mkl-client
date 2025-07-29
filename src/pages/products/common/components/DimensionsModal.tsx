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

import {
  Box,
  Button,
  Icon,
  Modal,
  NumberField,
  TextField,
} from '@components/index';

import {
  useNumberFieldSymbols,
  useSymbols,
  useTranslation,
} from '@hooks/index';

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

  const { falsyValuePlaceholder } = useNumberFieldSymbols();
  const { weightSymbol, dimensionSymbol, diameterSymbol } = useSymbols();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDone = () => {
    setIsModalOpen(false);
  };

  const formatDimensions = (
    combination: VariantCombination,
    weightSymbol: string,
    dimensionSymbol: string
  ) => {
    const parts = [];

    parts.push(
      `${combination.weight || `${falsyValuePlaceholder} `}${weightSymbol}`
    );

    parts.push(
      `${combination.height || `${falsyValuePlaceholder} `}${dimensionSymbol}`
    );

    parts.push(
      `${combination.width || falsyValuePlaceholder}${dimensionSymbol}`
    );

    parts.push(
      `${combination.length || `${falsyValuePlaceholder} `}${dimensionSymbol}`
    );

    parts.push(
      `⌀ ${combination.diameter || `${falsyValuePlaceholder} `}${diameterSymbol}`
    );

    return parts.length > 0 ? parts.join(', ') : '--';
  };

  return (
    <>
      <TextField
        value={
          selectedCombinationIndex !== null
            ? formatDimensions(
                variantCombinations[selectedCombinationIndex],
                weightSymbol,
                dimensionSymbol
              )
            : '--'
        }
        onClick={() => setIsModalOpen(true)}
        addonAfter={<Icon name="ruler" size="1rem" />}
        readOnly
      />

      <Modal
        title={t('dimensions')}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="small"
      >
        {selectedCombinationIndex !== null && (
          <Box className="flex flex-col space-y-6 w-full">
            <Box className="flex flex-col space-y-4 w-full">
              <NumberField
                label={t('weight')}
                value={
                  variantCombinations[selectedCombinationIndex]?.weight || 0
                }
                onValueChange={(value) =>
                  handleCombinationChange(
                    selectedCombinationIndex,
                    'weight',
                    value
                  )
                }
                addonAfter={weightSymbol}
                falsyValuePlaceholder={falsyValuePlaceholder}
                min={0}
              />

              <NumberField
                label={t('height')}
                value={
                  variantCombinations[selectedCombinationIndex]?.height || 0
                }
                onValueChange={(value) =>
                  handleCombinationChange(
                    selectedCombinationIndex,
                    'height',
                    value
                  )
                }
                addonAfter={dimensionSymbol}
                falsyValuePlaceholder={falsyValuePlaceholder}
                min={0}
              />

              <NumberField
                label={t('width')}
                value={
                  variantCombinations[selectedCombinationIndex]?.width || 0
                }
                onValueChange={(value) =>
                  handleCombinationChange(
                    selectedCombinationIndex,
                    'width',
                    value
                  )
                }
                addonAfter={dimensionSymbol}
                falsyValuePlaceholder={falsyValuePlaceholder}
                min={0}
              />

              <NumberField
                label={t('length')}
                value={
                  variantCombinations[selectedCombinationIndex]?.length || 0
                }
                onValueChange={(value) =>
                  handleCombinationChange(
                    selectedCombinationIndex,
                    'length',
                    value
                  )
                }
                addonAfter={dimensionSymbol}
                falsyValuePlaceholder={falsyValuePlaceholder}
                min={0}
              />

              <NumberField
                label={t('diameter')}
                value={
                  variantCombinations[selectedCombinationIndex]?.diameter || 0
                }
                onValueChange={(value) =>
                  handleCombinationChange(
                    selectedCombinationIndex,
                    'diameter',
                    value
                  )
                }
                addonAfter={diameterSymbol}
                falsyValuePlaceholder={falsyValuePlaceholder}
                min={0}
              />
            </Box>

            <Button type="primary" onClick={handleDone}>
              {t('done')}
            </Button>
          </Box>
        )}
      </Modal>
    </>
  );
};

export default DimensionsModal;
