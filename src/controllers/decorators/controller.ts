import 'reflect-metadata';
import { METHOD } from './Method';
import { METADATA_KEY } from './MetadataKey';
import { AppRouter } from '../../AppRouter';
import { NextFunction, RequestHandler, Request, Response } from 'express';

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Invalid request');
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(METADATA_KEY.PATH, target.prototype, key);
      const method: METHOD = Reflect.getMetadata(
        METADATA_KEY.METHOD,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(METADATA_KEY.MIDDLEWARE, target.prototype, key) || [];

      const requiredBodyProps =
        Reflect.getMetadata(METADATA_KEY.VALIDATOR, target.prototype, key) || [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
      }
    }
  };
}
