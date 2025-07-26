/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties } from 'react';

import ImageBase from 'antd/es/image';

type Props = {
  alt?: string;
  src: string;
  width?: number;
  height?: number;
  preview?: boolean;
  className?: string;
  loading?: 'lazy' | 'eager';
  style?: CSSProperties;
};

const Image = (props: Props) => {
  const { src, width, alt, preview, height, className, loading, style } = props;

  return (
    <ImageBase
      src={src}
      className={className}
      alt={alt}
      preview={preview}
      width={width}
      height={height}
      loading={loading}
      style={style}
    />
  );
};

export default Image;
