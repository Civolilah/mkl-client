/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode, useEffect, useState } from 'react';

import { Table as TableBase, TableColumnsType, TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Button, TextField } from '@components/index';

import { useAccentColor, useColors } from '@hooks/index';

import Box from './Box';
import Icon from './Icon';

type CreationRoute = '/subsidiaries/new';

export type EntityColumnType<EntityType> = {
  title: string;
  dataIndex: string;
  render?: (text: string, entity: EntityType) => ReactNode;
};

type Props<EntityType> = {
  isDataLoading?: boolean;
  columns: TableColumnsType<EntityType>;
  data: EntityType[];
  handleParametersChange?: TableProps<EntityType>['onChange'];
  handleRefresh?: () => void;
  enableFiltering?: boolean;
  filteringProps?: (keyof EntityType)[];
  creationRoute?: CreationRoute;
  creationButtonLabel?: string;
  filterFieldPlaceHolder?: string;
};

const Table = <EntityType,>(props: Props<EntityType>) => {
  const {
    columns,
    data,
    isDataLoading,
    handleRefresh,
    enableFiltering,
    filteringProps,
    creationButtonLabel,
    creationRoute,
    filterFieldPlaceHolder,
  } = props;

  const colors = useColors();
  const accentColor = useAccentColor();

  const navigate = useNavigate();

  const [filter, setFilter] = useState<string>('');
  const [perPage, setPerPage] = useState<10 | 50 | 100>(10);
  const [currentData, setCurrentData] = useState<EntityType[]>(data);

  const handleFiltering = () => {
    if (!filter) {
      setCurrentData(data);
    } else {
      setCurrentData(
        data.filter((item) =>
          filteringProps?.some((filteringProp) =>
            (item[filteringProp] as string)
              .toLowerCase()
              .includes(filter.toLowerCase())
          )
        )
      );
    }
  };

  useEffect(() => {
    if (data) {
      setCurrentData(data);
    }
  }, [data]);

  useEffect(() => {
    handleFiltering();
  }, [filter]);

  return (
    <Box className="flex flex-col relative w-full items-start space-y-4">
      <Box className="flex justify-between items-center w-full">
        <Box className="flex space-x-4">
          {handleRefresh && (
            <Box
              className="border cursor-pointer p-2 bg-white"
              onClick={() => {
                handleRefresh();
                setCurrentData(data);
              }}
              style={{ borderColor: colors.$1 }}
            >
              <Icon name="refresh" size={20} />
            </Box>
          )}

          {enableFiltering && (
            <Box>
              <TextField
                placeHolder={filterFieldPlaceHolder}
                value={filter}
                onValueChange={setFilter}
                debounce={300}
              />
            </Box>
          )}
        </Box>

        {creationRoute && (
          <Button onClick={() => navigate(creationRoute)} smallText>
            {creationButtonLabel}
          </Button>
        )}
      </Box>

      <TableBase<EntityType>
        bordered
        loading={isDataLoading}
        columns={columns}
        dataSource={currentData}
        showSorterTooltip={{ target: 'sorter-icon' }}
        style={{
          width: '100%',
          borderColor: colors.$1,
          borderRadius: 0,
          backgroundColor: colors.$6,
        }}
        pagination={{ pageSize: perPage }}
        onChange={(pagination) => {
          setPerPage(pagination.pageSize as 10 | 50 | 100);
        }}
        scroll={{ x: '100%' }}
        size="middle"
      />
    </Box>
  );
};

export default Table;
