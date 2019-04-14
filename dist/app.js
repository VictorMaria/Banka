'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _routes = require('./server/routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var app = (0, _express2.default)();
app.use(_express2.default.json());
(0, _routes2.default)(app);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log('Banka listens on port ' + port);
});
module.exports = app;