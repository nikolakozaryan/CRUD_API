import * as http from 'http';
import { IServerUser } from './modules/Storage/interface';

export type HandlerType = (req: CustomRequest, res: http.ServerResponse) => void;

export class CustomRequest extends http.IncomingMessage {
  pathname: string = '';
  user_id: string = '';
  body: IServerUser | IServerUser[] = [];
}
