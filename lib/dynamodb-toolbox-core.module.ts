import { Table } from 'dynamodb-toolbox';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { DynamoDbToolboxModuleOptions } from './interfaces/dynamodb-toolbox.interface';
import { getDataSourceToken } from './common/dynamodb-toolbox.utils';

@Global()
@Module({})
export class DynamoDbToolboxCoreModule {
  public static forRoot(options: DynamoDbToolboxModuleOptions): DynamicModule {
    const dataSourceProvider = {
      provide: getDataSourceToken(options),
      useFactory: () => this.createDataSourceFactory(options),
    };
    const providers = [dataSourceProvider];
    const exports = [dataSourceProvider];
    return {
      module: DynamoDbToolboxCoreModule,
      providers,
      exports,
    };
  }

  private static createDataSourceFactory(
    options: DynamoDbToolboxModuleOptions,
  ) {
    return new Table(options);
  }
}
