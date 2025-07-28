/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { cloneDeep, set } from 'lodash';

import { Box, Button, ColorPicker, Icon } from '@components/index';

type Props = {
  colors: string[];
  handleChange: (value: string[]) => void;
  addColor: () => void;
  images?: string[];
};

const ColorSelector = ({ colors, handleChange, addColor, images }: Props) => {
  const handleColorChange = (value: string, index: number) => {
    const updatedColors = cloneDeep(colors);
    set(updatedColors, index, value);
    return updatedColors;
  };

  return (
    <Box className="flex items-center gap-2 w-full">
      <Box className="flex flex-wrap items-center gap-2">
        {colors.map((color, index) => (
          <ColorPicker
            key={index}
            value={color}
            onValueChange={(value) =>
              handleChange(handleColorChange(value, index))
            }
            productQuantityPreview
            images={images}
          />
        ))}
      </Box>

      <Button type="primary" onClick={addColor}>
        <Box>
          <Icon name="add" size="1.3rem" />
        </Box>
      </Button>
    </Box>
  );
};

export default ColorSelector;
