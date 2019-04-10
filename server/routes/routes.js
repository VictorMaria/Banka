import bodyParser from 'body-parser';
import home from './home';
import user from './user';

export default (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use('/', home);
  app.use('/api/v1', user);
};
