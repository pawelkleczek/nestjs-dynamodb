import { Type } from '@nestjs/common';
import { Entity, Table } from 'dynamodb-toolbox';

import { DEFAULT_DATA_SOURCE_NAME } from '../dynamodb-toolbox.constants';
import { DataSource, DataSourceOptions } from '../interfaces';
import { EntityClassOrSchema } from '../interfaces/entity-class-or-schema.type';

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

export function getRepositoryToken(
  entity: EntityClassOrSchema,
  dataSource:
    | DataSource
    | DataSourceOptions
    | string = DEFAULT_DATA_SOURCE_NAME,
): Function | string {
  const dataSourcePrefix = getDataSourcePrefix(dataSource);
  if (entity instanceof Function && entity.prototype instanceof Entity) {
    if (!dataSourcePrefix) {
      return entity;
    }
    return `${dataSourcePrefix}${getCustomRepositoryToken(entity)}`;
  }

  return `${dataSourcePrefix}${entity.name}Repository`;
}

export function getDataSourcePrefix(
  dataSource:
    | DataSource
    | DataSourceOptions
    | string = DEFAULT_DATA_SOURCE_NAME,
): string {
  if (dataSource === DEFAULT_DATA_SOURCE_NAME) {
    return '';
  }
  if (typeof dataSource === 'string') {
    return dataSource + '_';
  }
  if (dataSource.name === DEFAULT_DATA_SOURCE_NAME || !dataSource.name) {
    return '';
  }
  return dataSource.name + '_';
}

export function getCustomRepositoryToken(repository: Function): string {
  return repository.name;
}
