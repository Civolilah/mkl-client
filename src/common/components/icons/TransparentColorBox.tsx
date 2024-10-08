/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

type Props = { size?: string | number };

const TransparentColorBox = (props?: Props) => {
  const { size } = props || {};

  return (
    <div style={{ width: size ?? '2.2rem', height: size ?? '2.2rem' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
      >
        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          fill="white"
          stroke="#bdbdbd"
          strokeWidth="3"
          rx="8"
          ry="8"
        />

        <line
          x1="89"
          y1="11"
          x2="11"
          y2="89"
          stroke="#FF0000"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default TransparentColorBox;
