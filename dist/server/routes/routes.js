'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use(_bodyParser2.default.json());
  app.use('/', _home2.default);
  app.use('/api/v1', _user2.default);
  app.use('/api/v1', _account2.default);
};