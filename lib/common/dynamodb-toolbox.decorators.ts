import { Inject } from '@nestjs/common';
import { DataSource, DataSourceOptions } from '../interfaces';
import { EntityClassOrSchema } from '../interfaces/entity-class-or-schema.type';
import {
  getDataSourceToken,
  getRepositoryToken,
} from './dynamodb-toolbox.utils';

export const InjectDataSource: (
  dataSource?: DataSource | DataSourceOptions | string,
) => ReturnType<typeof Inject> = (
  dataSource?: DataSource | DataSourceOptions | string,
) => Inject(getDataSourceToken(dataSource));

export const InjectRepository: (
  entityN: EntityClassOrSchema,
  dataSource?: DataSource | DataSourceOptions | string,
) => ReturnType<typeof Inject> = (
  entity: EntityClassOrSchema,
  dataSource?: DataSource | DataSourceOptions | string,
) => Inject(getRepositoryToken(entity, dataSource));
