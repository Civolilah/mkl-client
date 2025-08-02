/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { cloneDeep } from 'lodash';

import { QuantityByVariant } from '@interfaces/index';

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

type Props = {
  selectedCombinationIndex: number | null;
  quantityByVariants: QuantityByVariant[];
  readOnlyFields?: boolean;
  setQuantityByVariants?: Dispatch<SetStateAction<QuantityByVariant[]>>;
};

type InitialValues = {
  weight: number | undefined;
  height: number | undefined;
  width: number | undefined;
  length: number | undefined;
  diameter: number | undefined;
};

const DimensionsModal = ({
  selectedCombinationIndex,
  quantityByVariants,
  readOnlyFields,
  setQuantityByVariants,
}: Props) => {
  const t = useTranslation();

  const { falsyValuePlaceholder } = useNumberFieldSymbols();
  const { weightSymbol, dimensionSymbol, diameterSymbol } = useSymbols();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentValues, setCurrentValues] = useState<InitialValues>({
    weight: undefined,
    height: undefined,
    width: undefined,
    length: undefined,
    diameter: undefined,
  });

  const handleClose = () => {
    setIsModalOpen(false);

    setCurrentValues({
      weight: undefined,
      height: undefined,
      width: undefined,
      length: undefined,
      diameter: undefined,
    });
  };

  const handleDone = () => {
    if (typeof selectedCombinationIndex === 'number') {
      if (setQuantityByVariants && !readOnlyFields) {
        const updatedQuantityByVariants = cloneDeep(quantityByVariants);

        updatedQuantityByVariants[selectedCombinationIndex] = {
          ...updatedQuantityByVariants[selectedCombinationIndex],
          ...currentValues,
        };

        setQuantityByVariants(updatedQuantityByVariants);
      }

      handleClose();
    }
  };

  const formatDimensions = (
    combination: QuantityByVariant,
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

  useEffect(() => {
    if (typeof selectedCombinationIndex === 'number' && isModalOpen) {
      const { weight, height, width, length, diameter } =
        quantityByVariants[selectedCombinationIndex];

      setCurrentValues({
        weight,
        height,
        width,
        length,
        diameter,
      });
    }
  }, [quantityByVariants, selectedCombinationIndex, isModalOpen]);

  return (
    <>
      <TextField
        label={t('dimensions')}
        value={
          selectedCombinationIndex !== null
            ? formatDimensions(
                quantityByVariants[selectedCombinationIndex],
                weightSymbol,
                dimensionSymbol
              )
            : '--'
        }
        onClick={() => setIsModalOpen(true)}
        addonAfter={<Icon name="ruler" size="1rem" />}
        readOnly
        withoutOptionalText
      />

      <Modal
        title={t('dimensions')}
        visible={isModalOpen}
        onClose={handleClose}
        size="small"
      >
        {selectedCombinationIndex !== null && (
          <Box className="flex flex-col space-y-6 w-full">
            <Box className="flex flex-col space-y-4 w-full">
              <NumberField
                label={t('weight')}
                value={currentValues.weight || 0}
                onValueChange={(value) =>
                  setCurrentValues((prev) => ({
                    ...prev,
                    weight: value,
                  }))
                }
                addonAfter={weightSymbol}
                falsyValuePlaceholder={falsyValuePlaceholder}
                min={0}
                readOnly={readOnlyFields}
              />

              <NumberField
                label={t('height')}
                value={currentValues.height || 0}
                onValueChange={(value) =>
                  setCurrentValues((prev) => ({
                    ...prev,
                    height: value,
                  }))
                }
                addonAfter={dimensionSymbol}
                falsyValuePlaceholder={falsyValuePlaceholder}
                min={0}
                readOnly={readOnlyFields}
              />

              <NumberField
                label={t('width')}
                value={currentValues.width || 0}
                onValueChange={(value) =>
                  setCurrentValues((prev) => ({
                    ...prev,
                    width: value,
                  }))
                }
                addonAfter={dimensionSymbol}
                falsyValuePlaceholder={falsyValuePlaceholder}
                min={0}
                readOnly={readOnlyFields}
              />

              <NumberField
                label={t('length')}
                value={currentValues.length || 0}
                onValueChange={(value) =>
                  setCurrentValues((prev) => ({
                    ...prev,
                    length: value,
                  }))
                }
                addonAfter={dimensionSymbol}
                falsyValuePlaceholder={falsyValuePlaceholder}
                min={0}
                readOnly={readOnlyFields}
              />

              <NumberField
                label={t('diameter')}
                value={currentValues.diameter || 0}
                onValueChange={(value) =>
                  setCurrentValues((prev) => ({
                    ...prev,
                    diameter: value,
                  }))
                }
                addonAfter={diameterSymbol}
                falsyValuePlaceholder={falsyValuePlaceholder}
                min={0}
                readOnly={readOnlyFields}
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
