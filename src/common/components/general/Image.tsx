/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import ImageBase from 'antd/es/image';

type Props = {
  alt?: string;
  src: string;
  width?: number;
  height?: number;
  preview?: boolean;
};

const Image = (props: Props) => {
  const { src, width, alt, preview, height } = props;

  return (
    <ImageBase
      src={src}
      alt={alt}
      preview={preview}
      width={width}
      height={height}
    />
  );
};

export default Image;