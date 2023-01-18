import { Provider } from '@nestjs/common';
import { DataSource, DataSourceOptions } from './interfaces';
import { getDataSourceToken, getRepositoryToken } from './common';
import { EntityClassOrSchema } from './interfaces/entity-class-or-schema.type';
import { DEFAULT_DATA_SOURCE_NAME } from './dynamodb-toolbox.constants';
import { Entity } from 'dynamodb-toolbox';

export function createDynamoDbToolboxProviders(
  entities: EntityClassOrSchema[],
  dataSource:
    | DataSource
    | DataSourceOptions
    | string = DEFAULT_DATA_SOURCE_NAME,
): Provider[] {
  return (entities || []).map((entity) => ({
    provide: getRepositoryToken(entity, dataSource),
    useFactory: (dataSource: DataSource) => {
      if (dataSource.entities.includes(entity.name)) {
        return entity;
      } else {
        entity = entity instanceof Entity ? entity : new Entity(entity);
        entity.setTable(dataSource);
        return entity;
      }
    },
    inject: [getDataSourceToken(dataSource)],
  }));
}
