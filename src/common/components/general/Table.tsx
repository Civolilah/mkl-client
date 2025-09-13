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
import { atom, useAtom } from 'jotai';
import { get, some } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  Button,
  Dropdown,
  MobilePreviewModal,
  Spinner,
  Text,
  TextField,
} from '@components/index';

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

import Box from './Box';
import Icon from './Icon';

export type CreationRoute =
  | '/subsidiaries/new'
  | '/employees/new'
  | '/statuses/new'
  | '/label_categories/new'
  | '/labels/new'
  | '/categories/new'
  | '/suppliers/new'
  | '/brands/new'
  | '/products/new'
  | '/warehouses/new'
  | '/tax_rates/new';

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

interface PropsWithAdjustedFilteringValues<EntityType> {
  key: keyof EntityType;
  adjustingFunction: (value: EntityType[keyof EntityType]) => string;
}

interface Props<EntityType> {
  isDataLoading?: boolean;
  columns: TableColumnsType<EntityType>;
  data: EntityType[];
  handleParametersChange?: TableProps<EntityType>['onChange'];
  enableFiltering?: boolean;
  filteringProps?: (keyof EntityType)[];
  creationRoute?: CreationRoute;
  creationButtonLabel?: string;
  filterFieldPlaceHolder?: string;
  turnOnMobilePreview?: boolean;
  mobileCardRender?: (entity: EntityType) => ReactNode;
  mobileModalRender?: (entity: EntityType) => ReactNode;
  onMobileCardClick?: (entity: EntityType) => void;
  propsWithAdjustedFilteringValues?: PropsWithAdjustedFilteringValues<EntityType>[];
}

interface CustomHeaderCellProps {
  children: ReactNode;
  style: CSSProperties;
  className?: string;
}

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

interface CustomBodyCellProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

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
  className?: string;
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
  className,
  perPage,
  currentPage,
  total,
  setPerPage,
  setCurrentPage,
}: FooterProps) => {
  const t = useTranslation();

  const colors = useColors();

  const numberOfPages = Math.ceil(total / perPage) || 1;

  const actions: MenuProps['items'] = [
    {
      label: <Box className="px-3 py-1.5 text-sm">10</Box>,
      onClick: () => setPerPage(10),
      key: '10',
      disabled: perPage === 10,
    },
    {
      label: <Box className="px-3 py-1.5 text-sm">20</Box>,
      onClick: () => setPerPage(20),
      key: '20',
      disabled: perPage === 20,
    },
    {
      label: <Box className="px-3 py-1.5 text-sm">50</Box>,
      onClick: () => setPerPage(50),
      key: '50',
      disabled: perPage === 50,
    },
    {
      label: <Box className="px-3 py-1.5 text-sm">100</Box>,
      onClick: () => setPerPage(100),
      key: '100',
      disabled: perPage === 100,
    },
  ];

  return (
    <Box
      className={classNames(
        'flex justify-between items-center w-full relative',
        className
      )}
    >
      <Box className="flex items-center justify-center space-x-2">
        <Text className="text-sm font-medium">{t('total')}</Text>

        <Text className="text-sm">{total}.</Text>
      </Box>

      <Box className="flex items-center space-x-2">
        <Box className="flex items-center shadow-sm">
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
              // height: isLargeScreen ? '2.2rem' : '1.925rem',
              // width: isLargeScreen ? '2.2rem' : '1.925rem',
              height: '2.2rem',
              width: '2.2rem',
            }}
          >
            <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Icon
                name="doubleArrowBack"
                // size={isLargeScreen ? '1.35rem' : '1.2rem'}
                size="1.35rem"
              />
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
              // height: isLargeScreen ? '2.2rem' : '1.925rem',
              // width: isLargeScreen ? '2.2rem' : '1.925rem',
              height: '2.2rem',
              width: '2.2rem',
            }}
          >
            <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Icon
                name="arrowBack"
                // size={isLargeScreen ? '1.35rem' : '1.2rem'}
                size="1.35rem"
              />
            </Box>
          </PaginationArrowBox>
        </Box>

        <Box className="flex items-center shadow-sm">
          <PaginationArrowBox
            className={classNames('relative border', {
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
              // height: isLargeScreen ? '2.2rem' : '1.925rem',
              // width: isLargeScreen ? '2.2rem' : '1.925rem',
              height: '2.2rem',
              width: '2.2rem',
            }}
          >
            <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Icon
                name="arrowForward"
                // size={isLargeScreen ? '1.35rem' : '1.2rem'}
                size="1.35rem"
              />
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
              // height: isLargeScreen ? '2.2rem' : '1.925rem',
              // width: isLargeScreen ? '2.2rem' : '1.925rem',
              height: '2.2rem',
              width: '2.2rem',
            }}
          >
            <Box className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Icon
                name="doubleArrowForward"
                // size={isLargeScreen ? '1.35rem' : '1.2rem'}
                size="1.35rem"
              />
            </Box>
          </PaginationArrowBox>
        </Box>
      </Box>

      <Dropdown menu={{ items: actions }}>
        <Box
          className="flex items-center justify-between space-x-3 border px-3 py-1.5 cursor-pointer whitespace-nowrap w-full"
          style={{ backgroundColor: colors.$2, borderColor: colors.$1 }}
        >
          <Text className="text-sm">{t(perPage.toString())}</Text>

          <Icon name="arrowDown" size="1.2rem" style={{ color: colors.$10 }} />
        </Box>
      </Dropdown>
    </Box>
  );
};

export const filterAtom = atom<string>('');

const Table = <EntityType,>({
  columns,
  data,
  isDataLoading,
  enableFiltering,
  filteringProps,
  creationButtonLabel,
  creationRoute,
  filterFieldPlaceHolder,
  turnOnMobilePreview,
  mobileCardRender,
  mobileModalRender,
  onMobileCardClick,
  propsWithAdjustedFilteringValues = [],
}: Props<EntityType>) => {
  const t = useTranslation();

  const navigate = useNavigate();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const [filter, setFilter] = useAtom(filterAtom);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<10 | 20 | 50 | 100>(10);
  const [currentScrollY, setCurrentScrollY] = useState<string | undefined>();
  const [currentEntity, setCurrentEntity] = useState<EntityType | null>(null);
  const [isMobilePreviewModalOpen, setIsMobilePreviewModalOpen] =
    useState<boolean>(false);
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
          some(filteringProps, (filteringProp) => {
            let updatedFilteringProp = filteringProp;
            let labelProp = '';

            if (filteringProp.toString().includes('.')) {
              updatedFilteringProp = filteringProp
                .toString()
                .split('.')[0] as keyof EntityType;
              labelProp = filteringProp.toString().split('.')[1];
            }

            let value = get(item, updatedFilteringProp);

            if (
              propsWithAdjustedFilteringValues.some(
                (prop) => prop.key === updatedFilteringProp
              )
            ) {
              value = propsWithAdjustedFilteringValues
                .find((prop) => prop.key === updatedFilteringProp)
                ?.adjustingFunction(value);
            }

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

        let value = get(item, updatedFilteringProp);

        if (
          propsWithAdjustedFilteringValues.some(
            (prop) => prop.key === updatedFilteringProp
          )
        ) {
          value = propsWithAdjustedFilteringValues
            .find((prop) => prop.key === updatedFilteringProp)
            ?.adjustingFunction(value);
        }

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
    <>
      {isLargeScreen || !turnOnMobilePreview ? (
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
      ) : (
        <>
          {isDataLoading ? (
            <Box className="w-full h-full flex items-center justify-center">
              <Spinner size="large" />
            </Box>
          ) : (
            <Box className="flex flex-col w-full items-start self-start gap-y-6">
              <Box className="grid grid-cols-1 gap-4 w-full">
                {Boolean(!isDataLoading && !currentData.data.length) && (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={t('no_data')}
                  />
                )}

                {currentData.data.map((entity, index) => (
                  <Box
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                      if (mobileModalRender) {
                        setCurrentEntity(entity);
                        setIsMobilePreviewModalOpen(true);
                      }

                      onMobileCardClick?.(entity);
                    }}
                  >
                    {mobileCardRender?.(entity)}
                  </Box>
                ))}
              </Box>

              <Footer
                className="mt-6"
                perPage={perPage}
                currentPage={currentPage}
                total={currentData.total}
                setPerPage={setPerPage}
                setCurrentPage={setCurrentPage}
              />
            </Box>
          )}
        </>
      )}

      <MobilePreviewModal
        title={t('preview')}
        visible={Boolean(isMobilePreviewModalOpen && currentEntity)}
        onClose={() => {
          setIsMobilePreviewModalOpen(false);
          setCurrentEntity(null);
        }}
      >
        {Boolean(currentEntity) &&
          mobileModalRender?.(currentEntity as EntityType)}
      </MobilePreviewModal>
    </>
  );
};

export default Table;
