import bodyParser from 'body-parser';
import home from './home';
import user from './user';
import account from './account';
import transaction from './transaction';

export default (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/', home);
  app.use('/api/v1', user);
  app.use('/api/v1', account);
  app.use('/api/v1', transaction);
};
