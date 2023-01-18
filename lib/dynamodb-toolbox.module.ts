import { DynamicModule, Module } from '@nestjs/common';
import { DynamoDbToolboxCoreModule } from './dynamodb-toolbox-core.module';
import { DynamoDbToolboxModuleOptions } from './interfaces';

@Module({})
export class DynamoDbToolboxModule {
  static forRoot(options: DynamoDbToolboxModuleOptions): DynamicModule {
    return {
      module: DynamoDbToolboxModule,
      imports: [DynamoDbToolboxCoreModule.forRoot(options)],
    };
  }
}
