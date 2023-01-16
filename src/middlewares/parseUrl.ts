import http from 'http';
import { CustomRequest } from '../types';

export const parseUrl = (req: CustomRequest, res: http.ServerResponse) => {
  const url = req.url as string;
  const parsedUrl = url.slice(1).split('/');

  if (parsedUrl.length === 3) {
    req.pathname = '/' + parsedUrl.slice(0, 2).join('/');
    req.user_id = parsedUrl[parsedUrl.length - 1];
  } else {
    req.pathname = url;
    req.user_id = '';
  }
};
