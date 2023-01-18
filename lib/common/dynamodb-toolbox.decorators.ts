import { Inject } from '@nestjs/common';
import { DataSource, DataSourceOptions } from '../interfaces';
import { getDataSourceToken } from './dynamodb-toolbox.utils';

export const InjectDataSource: (
  dataSource?: DataSource | DataSourceOptions | string,
) => ReturnType<typeof Inject> = (
  dataSource?: DataSource | DataSourceOptions | string,
) => Inject(getDataSourceToken(dataSource));
