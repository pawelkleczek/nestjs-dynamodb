import { Type } from '@nestjs/common';
import { Table } from 'dynamodb-toolbox';

import { DEFAULT_DATA_SOURCE_NAME } from '../dynamodb-toolbox.constants';
import { DataSource, DataSourceOptions } from '../interfaces';

export function getDataSourceToken(
  dataSource:
    | DataSource
    | DataSourceOptions
    | string = DEFAULT_DATA_SOURCE_NAME,
): string | Function | Type<DataSource> {
  return DEFAULT_DATA_SOURCE_NAME === dataSource
    ? Table
    : 'string' === typeof dataSource
    ? `${dataSource}DataSource`
    : DEFAULT_DATA_SOURCE_NAME === dataSource.name || !dataSource.name
    ? Table
    : `${dataSource.name}DataSource`;
}
