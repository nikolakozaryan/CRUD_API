import * as dotenv from 'dotenv';
import { parseUrl } from './middlewares/parseUrl';
import { App } from './modules/App/App';
import { userRouter } from './user-router';

dotenv.config();
const PORT = process.env.PORT as string;

const app = new App();
app.use(parseUrl);
app.addRouter(userRouter);
app.listen(+PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
