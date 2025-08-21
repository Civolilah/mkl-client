/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useState } from 'react';

import { Drawer } from 'antd';
import { useAtom } from 'jotai';

import { filterAtom } from '@components/general/Table';
import { Box, Button, FooterAction, TextField } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

interface Props {
  iconSize?: string;
  disabled?: boolean;
  searchPlaceholder?: string;
}

const MobileSearchAction = ({
  iconSize = '1.3rem',
  disabled = false,
  searchPlaceholder = 'Search',
}: Props) => {
  const t = useTranslation();
  const colors = useColors();

  const [filter, setFilter] = useAtom(filterAtom);

  const [currentFilter, setCurrentFilter] = useState<string>('');
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

  const onClose = () => {
    setIsDrawerOpened(false);
    setCurrentFilter('');
  };

  useEffect(() => {
    if (isDrawerOpened) {
      setCurrentFilter(filter);
    }
  }, [isDrawerOpened]);

  return (
    <>
      <Drawer
        placement="bottom"
        open={isDrawerOpened}
        closable={false}
        onClose={onClose}
        width="100%"
        height="auto"
        rootStyle={{ padding: 0 }}
        styles={{
          body: { padding: 0 },
        }}
      >
        <Box className="relative flex flex-col w-full bg-white">
          <Box className="flex justify-center py-2">
            <Box
              className="w-10 h-1 rounded-full"
              style={{ backgroundColor: colors.$1 }}
            />
          </Box>

          <Box className="flex flex-col items-center pt-6 pb-2 px-6 gap-y-6">
            <TextField
              placeHolder={t(searchPlaceholder)}
              value={currentFilter}
              onValueChange={(value) => setCurrentFilter(value)}
              onPressEnter={() => {
                setFilter(currentFilter);
                onClose();
              }}
            />

            <Button
              className="w-full"
              onClick={() => {
                setFilter(currentFilter);
                onClose();
              }}
            >
              {t('search')}
            </Button>
          </Box>

          <Box className="h-3" />
        </Box>
      </Drawer>

      <FooterAction
        text="search"
        onClick={() => {
          setIsDrawerOpened(true);
        }}
        iconName="search"
        iconSize={iconSize}
        disabled={disabled}
      />
    </>
  );
};

export default MobileSearchAction;
