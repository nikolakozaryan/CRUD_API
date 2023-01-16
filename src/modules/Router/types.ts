import { HandlerType } from '../../types';

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Endpoint = {
  [key in Methods]?: HandlerType;
};

export type Endpoints = {
  [key: string]: Endpoint;
};
