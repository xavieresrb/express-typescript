import 'reflect-metadata';
import { METADATA_KEY } from './MetadataKey';

export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(METADATA_KEY.VALIDATOR, keys, target, key);
  };
}
