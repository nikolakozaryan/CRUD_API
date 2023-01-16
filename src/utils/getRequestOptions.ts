import { Methods } from '../modules/Router/types';

export const getRequestOptions = (method: Methods, dataToSend: string) => ({
  method: method,
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(dataToSend),
  },
});
