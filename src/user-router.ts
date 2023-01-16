import { Router } from './modules/Router/Router';
import { getUsers, createUser, deleteUser, updateUser } from './controller/user-controller';

export const userRouter = new Router();

userRouter.get('/api/users', getUsers);
userRouter.post('/api/users', createUser);
userRouter.put('/api/users', updateUser);
userRouter.delete('/api/users', deleteUser);
