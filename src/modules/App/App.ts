import http from 'http';
import EventEmitter from 'events';
import { Router } from '../Router/Router';
import { CustomRequest, HandlerType } from '../../types';
import { Methods } from '../Router/types';
import { sendResponse } from '../../utils/sendResponse';

export class App {
  emitter: EventEmitter;
  server: http.Server;
  middlewares: HandlerType[];
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware: HandlerType) {
    this.middlewares.push(middleware);
  }

  listen(port: number, callback: () => void) {
    this.server.listen(port, callback);
  }

  addRouter(router: Router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method as Methods), (req, res) => {
          const handler = endpoint[method as Methods]!;
          handler(req, res);
        });
      });
    });
  }

  _getRouteMask(path: string, method: Methods) {
    return `[${path}]:[${method}]`;
  }

  _createServer() {
    return http.createServer((req, res) => {
      const customReq = req as CustomRequest;

      try {
        let body = '';

        customReq.on('data', (chunk) => {
          body += chunk;
        });

        customReq.on('end', () => {
          if (body) {
            customReq.body = JSON.parse(body);
          }
          this.middlewares.forEach((middleware) => middleware(customReq, res));

          const eventName = this._getRouteMask(customReq.pathname, customReq.method as Methods);
          const emitted = this.emitter.emit(eventName, req, res);

          if (!emitted) sendResponse(customReq, res, 'INVALID_RESOURCE');
        });
      } catch {
        sendResponse(customReq, res, 'SERVER_ERROR');
      }
    });
  }
}
