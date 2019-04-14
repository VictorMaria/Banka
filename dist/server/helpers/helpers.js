'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helper = {
  hashPassword: function hashPassword(password) {
    return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(8));
  },
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcrypt2.default.compareSync(password, hashPassword);
  },
  generateToken: function generateToken(id, isAdmin) {
    var token = _jsonwebtoken2.default.sign({
      userId: id, admin: isAdmin
    }, process.env.SECRET, { expiresIn: '1d' });
    return token;
  }
};
exports.default = helper;