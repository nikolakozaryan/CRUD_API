import { MESSAGES } from '../constants/constants';
import { IServerUser } from '../modules/Storage/interface';
import { CustomRequest } from '../types';
import http from 'http';

export const sendResponse = (
  req: CustomRequest,
  res: http.ServerResponse,
  identificator: string,
  data?: IServerUser | IServerUser[]
) => {
  const messageData = MESSAGES[identificator];
  const { code } = messageData;

  res.writeHead(code, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(code === 200 || code === 201 ? data : messageData));
};
