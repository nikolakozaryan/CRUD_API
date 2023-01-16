import { HandlerType } from '../types';
import { v4 as uuidv4, validate } from 'uuid';
import { IServerUser, IUser } from '../modules/Storage/interface';
import { sendResponse } from '../utils/sendResponse';
import { isDataValid } from '../utils/isDataValid';
import { storage } from '../user-storage';

export const getUsers: HandlerType = (req, res) => {
  const { user_id } = req;

  if (!user_id) {
    sendResponse(req, res, 'SUCCESS', storage.users);
    return;
  }

  const isUuid = validate(user_id);

  if (!isUuid) {
    sendResponse(req, res, 'INVALID_ID');
    return;
  }

  const user = storage.get(user_id);
  user ? sendResponse(req, res, 'SUCCESS', user) : sendResponse(req, res, 'USER_NOT_FOUND');
};

export const createUser: HandlerType = (req, res) => {
  const { user_id } = req;
  if (user_id) {
    sendResponse(req, res, 'INVALID_RESOURCE');
    return;
  }

  const isValid = isDataValid(req.body as IUser);
  if (!isValid) {
    sendResponse(req, res, 'INVALID_DATA');
    return;
  }

  const user = { ...req.body, id: uuidv4() } as IServerUser;
  storage.add(user);
  sendResponse(req, res, 'CREATED', user);
};

export const updateUser: HandlerType = (req, res) => {
  const { user_id } = req;
  const isUuid = validate(user_id);

  if (!isUuid) {
    sendResponse(req, res, 'INVALID_ID');
    return;
  }

  const isValid = isDataValid(req.body as IUser);

  if (!isValid) {
    sendResponse(req, res, 'INVALID_DATA');
    return;
  }

  const user = req.body as IServerUser;
  const updated = storage.update(user_id, user);
  updated
    ? sendResponse(req, res, 'CREATED', { ...user, id: user_id })
    : sendResponse(req, res, 'USER_NOT_FOUND');
};

export const deleteUser: HandlerType = (req, res) => {
  const { user_id } = req;
  const isUuid = validate(user_id);

  if (!isUuid) {
    sendResponse(req, res, 'INVALID_ID');
    return;
  }

  const isDeleted = storage.delete(user_id);
  const message_code = isDeleted ? 'USER_DELETED' : 'USER_NOT_FOUND';
  sendResponse(req, res, message_code);
};
