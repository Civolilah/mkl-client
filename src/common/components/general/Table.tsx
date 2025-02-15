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
import { get, some } from 'lodash';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Dropdown, Text, TextField } from '@components/index';

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

import Box from './Box';
import Icon from './Icon';

type CreationRoute =
  | '/subsidiaries/new'
  | '/employees/new'
  | '/statuses/new'
  | '/label_categories/new'
  | '/labels/new'
  | '/categories/new'
  | '/suppliers/new'
  | '/brands/new';

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
};

type CustomHeaderCellProps = {
  children: ReactNode;
  style: CSSProperties;
  className?: string;
};

const CustomHeaderCell = ({
  children,
  style,
  className,
  ...restProps
}: CustomHeaderCellProps) => {
  const accentColor = useAccentColor();

  return (
    <td
      {...restProps}
      className={classNames(className, 'text-sm')}
      style={{
        ...style,
        backgroundColor: accentColor,
        borderRadius: 0,
        color: 'white',
        whiteSpace: 'nowrap',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        paddingTop: '0.6rem',
        paddingBottom: '0.6rem',
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
  style?: CSSProperties;
};

const CustomBodyCell = ({
  children,
  className,
  onClick,
  style,
  ...restProps
}: CustomBodyCellProps) => {
  return (
    <td
      className={classNames(className, 'text-sm', {
        'cursor-pointer': onClick,
      })}
      onClick={onClick}
      {...restProps}
      style={{
        ...(style || {}),
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        paddingTop: '0.6rem',
        paddingBottom: '0.6rem',
      }}
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
      label: <Box className="px-2 py-1 text-xs-plus">10</Box>,
      onClick: () => setPerPage(10),
      key: '10',
      disabled: perPage === 10,
    },
    {
      label: <Box className="px-2 py-1 text-xs-plus">20</Box>,
      onClick: () => setPerPage(20),
      key: '20',
      disabled: perPage === 20,
    },
    {
      label: <Box className="px-2 py-1 text-xs-plus">50</Box>,
      onClick: () => setPerPage(50),
      key: '50',
      disabled: perPage === 50,
    },
    {
      label: <Box className="px-2 py-1 text-xs-plus">100</Box>,
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
          <Text className="text-xs-plus font-medium">
            {t(perPage.toString())}
          </Text>

          <Icon name="arrowDown" size="1.2rem" style={{ color: colors.$10 }} />
        </Box>
      </Dropdown>

      <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center space-x-2">
        <Text className="text-xs-plus font-medium">{t('total')}</Text>

        <Text className="text-xs-plus">{total}.</Text>
      </Box>

      <Box className="flex items-center">
        <PaginationArrowBox
          className={classNames('relative border-l border-t border-b', {
            'opacity-50 cursor-not-allowed': currentPage === 1,
            'cursor-pointer': currentPage !== 1,
          })}
          onClick={() => currentPage !== 1 && setCurrentPage(1)}
          theme={{
            backgroundColor: colors.$23,
            hoverBgColor: currentPage === 1 ? colors.$21 : colors.$22,
          }}
          style={{
            borderColor: colors.$1,
            height: '1.925rem',
            width: '1.925rem',
          }}
        >
          <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Icon name="doubleArrowBack" size="1.2rem" />
          </Box>
        </PaginationArrowBox>

        <PaginationArrowBox
          className={classNames('relative border', {
            'opacity-50 cursor-not-allowed': currentPage === 1,
            'cursor-pointer': currentPage !== 1,
          })}
          onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
          theme={{
            backgroundColor: colors.$23,
            hoverBgColor: currentPage === 1 ? colors.$21 : colors.$22,
          }}
          style={{
            borderColor: colors.$1,
            height: '1.925rem',
            width: '1.925rem',
          }}
        >
          <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Icon name="arrowBack" size="1.2rem" />
          </Box>
        </PaginationArrowBox>

        <PaginationArrowBox
          className={classNames('relative border-t border-b border-r', {
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
          style={{
            borderColor: colors.$1,
            height: '1.925rem',
            width: '1.925rem',
          }}
        >
          <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Icon name="arrowForward" size="1.2rem" />
          </Box>
        </PaginationArrowBox>

        <PaginationArrowBox
          className={classNames('relative border-t border-b border-r', {
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
            height: '1.925rem',
            width: '1.925rem',
          }}
        >
          <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Icon name="doubleArrowForward" size="1.2rem" />
          </Box>
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
  } = props;

  const navigate = useNavigate();

  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<10 | 20 | 50 | 100>(10);
  const [currentData, setCurrentData] = useState<Data<EntityType>>({
    data,
    total: data.length,
  });
  const [currentScrollY, setCurrentScrollY] = useState<string | undefined>();

  const handleFiltering = () => {
    if (!filter) {
      setCurrentData({
        data,
        total: data.length,
      });
    } else {
      setCurrentData({
        data: data.filter((item) =>
          some(filteringProps, (filteringProp) => {
            let updatedFilteringProp = filteringProp;
            let labelProp = '';

            if (filteringProp.toString().includes('.')) {
              updatedFilteringProp = filteringProp
                .toString()
                .split('.')[0] as keyof EntityType;
              labelProp = filteringProp.toString().split('.')[1];
            }

            const value = get(item, updatedFilteringProp);

            if (Array.isArray(value) && labelProp) {
              return some(value, (v) =>
                v[labelProp].toLowerCase().includes(filter.toLowerCase())
              );
            }

            return value
              ? value.toLowerCase().includes(filter.toLowerCase())
              : false;
          })
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
      some(filteringProps, (filteringProp) => {
        let updatedFilteringProp = filteringProp;
        let labelProp = '';

        if (filteringProp.toString().includes('.')) {
          updatedFilteringProp = filteringProp
            .toString()
            .split('.')[0] as keyof EntityType;
          labelProp = filteringProp.toString().split('.')[1];
        }

        const value = get(item, updatedFilteringProp);

        if (Array.isArray(value) && labelProp) {
          return some(value, (v) =>
            v[labelProp].toLowerCase().includes(filter.toLowerCase())
          );
        }

        return value
          ? value.toLowerCase().includes(filter.toLowerCase())
          : false;
      })
    );

    setCurrentData({
      data: updatedData.slice(startIndex, endIndex),
      total: updatedData.length,
    });

    if (perPage === 10 || (perPage > 10 && updatedData.length < 11)) {
      setCurrentScrollY(undefined);
    } else {
      setCurrentScrollY('28.25rem');
    }
  }, [currentPage, perPage, filter, data]);

  return (
    <Box className="flex flex-col relative h-full w-full items-start space-y-4">
      <Box className="flex justify-between space-x-4 items-center w-full">
        {enableFiltering && (
          <Box className="w-72">
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
          scroll={{
            x: 'max-content',
            y: currentScrollY,
          }}
          size="small"
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
