/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import {
  Empty,
  MenuProps,
  Table as TableBase,
  TableColumnsType,
  TableProps,
} from 'antd';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Dropdown, Text, TextField } from '@components/index';

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

import Box from './Box';
import Icon from './Icon';

type CreationRoute = '/subsidiaries/new' | '/employees/new';

export type EntityColumnType<EntityType> = {
  title: string;
  dataIndex: string;
  render?: (text: string, entity: EntityType) => ReactNode;
};

const PaginationArrowBox = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundColor};
  &:hover {
    background-color: ${({ theme }) => theme.hoverBgColor};
  }
`;

type Props<EntityType> = {
  isDataLoading?: boolean;
  columns: TableColumnsType<EntityType>;
  data: EntityType[];
  handleParametersChange?: TableProps<EntityType>['onChange'];
  enableFiltering?: boolean;
  filteringProps?: (keyof EntityType)[];
  creationRoute?: CreationRoute;
  creationButtonLabel?: string;
  filterFieldPlaceHolder?: string;
  scrollX?: string;
};

type CustomHeaderCellProps = {
  children: ReactNode;
  style: CSSProperties;
};

const CustomHeaderCell = ({
  children,
  style,
  ...restProps
}: CustomHeaderCellProps) => {
  const accentColor = useAccentColor();

  return (
    <td
      {...restProps}
      style={{
        ...style,
        backgroundColor: accentColor,
        borderRadius: 0,
        color: 'white',
      }}
    >
      {children}
    </td>
  );
};

type CustomBodyCellProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

const CustomBodyCell = ({
  children,
  className,
  onClick,
  ...restProps
}: CustomBodyCellProps) => {
  return (
    <td
      className={classNames(className, { 'cursor-pointer': onClick })}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </td>
  );
};

type FooterProps = {
  perPage: 10 | 20 | 50 | 100;
  currentPage: number;
  total: number;
  setPerPage: (perPage: 10 | 20 | 50 | 100) => void;
  setCurrentPage: (currentPage: number) => void;
};

type Data<T> = {
  data: T[];
  total: number;
};

const Footer = ({
  perPage,
  currentPage,
  total,
  setPerPage,
  setCurrentPage,
}: FooterProps) => {
  const t = useTranslation();

  const colors = useColors();

  const numberOfPages = Math.ceil(total / perPage);

  const actions: MenuProps['items'] = [
    {
      label: '10',
      onClick: () => setPerPage(10),
      key: '10',
      disabled: perPage === 10,
    },
    {
      label: '20',
      onClick: () => setPerPage(20),
      key: '20',
      disabled: perPage === 20,
    },
    {
      label: '50',
      onClick: () => setPerPage(50),
      key: '50',
      disabled: perPage === 50,
    },
    {
      label: '100',
      onClick: () => setPerPage(100),
      key: '100',
      disabled: perPage === 100,
    },
  ];

  return (
    <Box className="flex justify-between items-center w-full relative">
      <Dropdown menu={{ items: actions }}>
        <Box
          className="flex items-center justify-between space-x-3 border px-2 py-1 cursor-pointer whitespace-nowrap w-full"
          style={{ backgroundColor: colors.$2, borderColor: colors.$1 }}
        >
          <Text className="text-sm font-medium">{t(perPage.toString())}</Text>

          <Icon name="arrowDown" size={25} style={{ color: colors.$10 }} />
        </Box>
      </Dropdown>

      <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center space-x-2">
        <Text className="text-sm font-medium">{t('total')}</Text>

        <Text className="text-sm">{total}.</Text>
      </Box>

      <Box className="flex items-center">
        <PaginationArrowBox
          className={classNames('p-1.5 border-l border-t border-b', {
            'opacity-50 cursor-not-allowed': currentPage === 1,
            'cursor-pointer': currentPage !== 1,
          })}
          onClick={() => currentPage !== 1 && setCurrentPage(1)}
          theme={{
            backgroundColor: colors.$23,
            hoverBgColor: currentPage === 1 ? colors.$21 : colors.$22,
          }}
          style={{ borderColor: colors.$1 }}
        >
          <Icon name="doubleArrowBack" size={24} />
        </PaginationArrowBox>

        <PaginationArrowBox
          className={classNames('p-1.5 border', {
            'opacity-50 cursor-not-allowed': currentPage === 1,
            'cursor-pointer': currentPage !== 1,
          })}
          onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
          theme={{
            backgroundColor: colors.$23,
            hoverBgColor: currentPage === 1 ? colors.$21 : colors.$22,
          }}
          style={{ borderColor: colors.$1 }}
        >
          <Icon name="arrowBack" size={24} />
        </PaginationArrowBox>

        <PaginationArrowBox
          className={classNames('p-1.5 border-t border-b border-r', {
            'opacity-50 cursor-not-allowed': currentPage === numberOfPages,
            'cursor-pointer': currentPage !== numberOfPages,
          })}
          onClick={() =>
            currentPage !== numberOfPages && setCurrentPage(currentPage + 1)
          }
          theme={{
            backgroundColor: colors.$23,
            hoverBgColor:
              currentPage === numberOfPages ? colors.$21 : colors.$22,
          }}
          style={{ borderColor: colors.$1 }}
        >
          <Icon name="arrowForward" size={24} />
        </PaginationArrowBox>

        <PaginationArrowBox
          className={classNames('p-1.5 border-t border-b border-r', {
            'opacity-50 cursor-not-allowed': currentPage === numberOfPages,
            'cursor-pointer': currentPage !== numberOfPages,
          })}
          onClick={() =>
            currentPage !== numberOfPages && setCurrentPage(numberOfPages)
          }
          theme={{
            backgroundColor: colors.$23,
            hoverBgColor:
              currentPage === numberOfPages ? colors.$21 : colors.$22,
          }}
          style={{
            borderColor: colors.$1,
          }}
        >
          <Icon name="doubleArrowForward" size={24} />
        </PaginationArrowBox>
      </Box>
    </Box>
  );
};

const Table = <EntityType,>(props: Props<EntityType>) => {
  const t = useTranslation();

  const {
    columns,
    data,
    isDataLoading,
    enableFiltering,
    filteringProps,
    creationButtonLabel,
    creationRoute,
    filterFieldPlaceHolder,
    scrollX,
  } = props;

  const navigate = useNavigate();

  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<10 | 20 | 50 | 100>(10);
  const [currentData, setCurrentData] = useState<Data<EntityType>>({
    data,
    total: data.length,
  });

  const handleFiltering = () => {
    if (!filter) {
      setCurrentData({
        data,
        total: data.length,
      });
    } else {
      setCurrentData({
        data: data.filter((item) =>
          filteringProps?.some((filteringProp) =>
            (item[filteringProp] as string)
              .toLowerCase()
              .includes(filter.toLowerCase())
          )
        ),
        total: data.length,
      });
    }
  };

  useEffect(() => {
    if (data) {
      setCurrentData({
        data,
        total: data.length,
      });
    }
  }, [data]);

  useEffect(() => {
    handleFiltering();
  }, [filter]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    const updatedData = data.filter((item) =>
      filteringProps?.some((filteringProp) =>
        (item[filteringProp] as string)
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
    );
    setCurrentData({
      data: updatedData.slice(startIndex, endIndex),
      total: updatedData.length,
    });
  }, [currentPage, perPage, filter, data]);

  return (
    <Box className="flex flex-col relative h-full w-full items-start space-y-4">
      <Box className="flex justify-between items-center w-full">
        {enableFiltering && (
          <Box>
            <TextField
              placeHolder={filterFieldPlaceHolder}
              value={filter}
              onValueChange={setFilter}
              debounce={300}
              disabled={isDataLoading}
            />
          </Box>
        )}

        {creationRoute && (
          <Button
            onClick={() => navigate(creationRoute)}
            smallText
            disabled={isDataLoading}
          >
            {creationButtonLabel}
          </Button>
        )}
      </Box>

      <Box className="flex flex-col flex-1 space-y-4 w-full">
        <TableBase<EntityType>
          bordered
          loading={isDataLoading}
          columns={columns}
          dataSource={currentData.data.map((entity) => ({
            ...entity,
            key: entity['id' as keyof EntityType],
          }))}
          showSorterTooltip={{ target: 'sorter-icon' }}
          pagination={false}
          components={{
            header: {
              cell: (props: CustomHeaderCellProps) => (
                <CustomHeaderCell {...props} />
              ),
            },
            body: {
              cell: (props: CustomBodyCellProps) => (
                <CustomBodyCell {...props} />
              ),
            },
          }}
          scroll={{ x: scrollX ?? '100%', y: '29.5rem' }}
          size="middle"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={t('no_data')}
              />
            ),
          }}
        />

        <Footer
          perPage={perPage}
          currentPage={currentPage}
          total={currentData.total}
          setPerPage={setPerPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Box>
  );
};

export default Table;
