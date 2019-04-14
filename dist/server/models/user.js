'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('../helpers/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User() {
    _classCallCheck(this, User);

    this.users = [];
    this.uniqueUserId = 0;
  }

  _createClass(User, [{
    key: 'signUp',
    value: function signUp(data) {
      this.uniqueUserId += 1;
      var hashedPassword = _helpers2.default.hashPassword(data.password);
      var user = {
        id: this.uniqueUserId,
        email: data.email.toLowerCase(),
        firstName: data.firstName[0].toUpperCase() + data.firstName.slice(1).toLowerCase(),
        lastName: data.lastName[0].toUpperCase() + data.lastName.slice(1).toLowerCase(),
        password: hashedPassword,
        type: 'client',
        isAdmin: false,
        isStaff: false,
        profilePhoto: '/server/uploads/ninja-avi.jpg'
      };
      this.users.push(user);
      var userToken = _helpers2.default.generateToken(user.id, user.isAdmin);

      var response = {
        token: userToken,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
        profilePhoto: user.profilePhoto
      };
      return response;
    }
  }, {
    key: 'checkForEmail',
    value: function checkForEmail(data) {
      return this.users.find(function (u) {
        return u.email === data.email.toLowerCase();
      });
    }
  }, {
    key: 'signIn',
    value: function signIn(data) {
      var user = this.users.find(function (u) {
        return u.email === data.email.toLowerCase();
      });
      var userToken = _helpers2.default.generateToken(user.id, user.isAdmin);
      var response = {
        token: userToken,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type
      };
      return response;
    }

    // eslint-disable-next-line consistent-return

  }, {
    key: 'getUser',
    value: function getUser(id) {
      var user = this.users.find(function (u) {
        return u.id === parseInt(id, 10);
      });
      if (user) {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          type: user.type,
          profilePhoto: user.profilePhoto
        };
      }
    }

    // eslint-disable-next-line consistent-return

  }, {
    key: 'quickCheck',
    value: function quickCheck(id) {
      var user = this.users.find(function (u) {
        return u.id === parseInt(id, 10);
      });
      if (user) {
        return true;
      }
    }
  }, {
    key: 'uploadProfilePhoto',
    value: function uploadProfilePhoto(id, file) {
      var user = this.users.find(function (u) {
        return u.id === parseInt(id, 10);
      });
      if (!file) {
        return 'Select an Image';
      }
      user.profilePhoto = file.path;
      var response = {
        id: user.id,
        email: user.email,
        profilePhoto: user.profilePhoto
      };
      return response;
    }
  }]);

  return User;
}();

exports.default = new User();