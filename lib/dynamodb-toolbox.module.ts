import { DynamicModule, Module } from '@nestjs/common';
import { DynamoDbToolboxCoreModule } from './dynamodb-toolbox-core.module';
import { DEFAULT_DATA_SOURCE_NAME } from './dynamodb-toolbox.constants';
import { createDynamoDbToolboxProviders } from './dynamodb-toolbox.providers';
import {
  DataSource,
  DataSourceOptions,
  DynamoDbToolboxModuleOptions,
} from './interfaces';
import { EntityClassOrSchema } from './interfaces/entity-class-or-schema.type';

@Module({})
export class DynamoDbToolboxModule {
  static forRoot(options: DynamoDbToolboxModuleOptions): DynamicModule {
    return {
      module: DynamoDbToolboxModule,
      imports: [DynamoDbToolboxCoreModule.forRoot(options)],
    };
  }

  static forFeature(
    entities: EntityClassOrSchema[] = [],
    dataSource:
      | DataSource
      | DataSourceOptions
      | string = DEFAULT_DATA_SOURCE_NAME,
  ): DynamicModule {
    const providers = createDynamoDbToolboxProviders(entities, dataSource);
    return {
      module: DynamoDbToolboxModule,
      providers: providers,
      exports: providers,
    };
  }
}
