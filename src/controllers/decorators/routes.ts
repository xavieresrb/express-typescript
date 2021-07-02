import 'reflect-metadata';
import { METHOD } from './Method';
import { METADATA_KEY } from './MetadataKey';

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata(METADATA_KEY.PATH, path, target, key);
      Reflect.defineMetadata(METADATA_KEY.METHOD, method, target, key);
    };
  };
}

export const get = routeBinder(METHOD.GET);
export const put = routeBinder(METHOD.PUT);
export const post = routeBinder(METHOD.POST);
export const del = routeBinder(METHOD.DELETE);
export const patch = routeBinder(METHOD.PATCH);
