/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */
import { Icon, Link } from '@components/index';

const HeaderIcons = () => (
  <div className="flex items-center space-x-4">
    <Link to="https://instagram.com" target="_blank">
      <Icon name="facebook" enableHoverColor />
    </Link>

    <Link to="https://instagram.com" target="_blank">
      <Icon
        name="instagram"
        size={20}
        className="hover:text-instagram-brand transition-colors duration-200"
      />
    </Link>
  </div>
);

export default HeaderIcons;
