import type { EntityConstructor } from 'dynamodb-toolbox/dist/classes/Entity/types';
import type { Entity } from 'dynamodb-toolbox';

export type EntityClassOrSchema = Entity | EntityConstructor;
