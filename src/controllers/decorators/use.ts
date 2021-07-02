import { Request } from 'express-serve-static-core';
import 'reflect-metadata';
import { RequestHandler } from 'express';
import { METADATA_KEY } from './MetadataKey';

export function use(middleware: RequestHandler) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(METADATA_KEY.MIDDLEWARE, target, key) || [];
    middlewares.push(middleware);
    Reflect.defineMetadata(METADATA_KEY.MIDDLEWARE, middlewares, target, key);
  };
}
