import type { TableConstructor } from 'dynamodb-toolbox/dist/classes/Table/types';
import type { Table } from 'dynamodb-toolbox';

type Key = string | number | symbol;
export type DataSourceOptions = TableConstructor<string, Key, Key | null>;
export type DataSource = Table<string, string, string>;
export type DynamoDbToolboxModuleOptions = DataSourceOptions;
