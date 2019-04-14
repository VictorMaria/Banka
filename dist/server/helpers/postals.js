'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transporter = _nodemailer2.default.createTransport({
  service: 'outlook',
  auth: {
    user: 'victormaria.oar@outlook.com',
    pass: 'd4shw0rd'
  }
});

// eslint-disable-next-line max-len
var sendEmailNotification = function sendEmailNotification(recipient, emailSubject, transactionType, transactionDate, amount, remark, balance) {
  var mailOptions = {
    from: ' "Banka 👻" victormaria.oar@outlook.com',
    to: recipient,
    subject: emailSubject,
    html: '<h1>Banka</h2>\n              <img src="cid:unique@nodemailer.com"/>\n              <p><strong>' + transactionDate + '</strong><br>\n              <strong>' + transactionType + '</strong><br>\n              Amount <strong>N' + amount + '</strong><br>\n              Remark <strong>' + remark + '</strong><br>\n              Balance <strong>N' + balance + '</strong></p>\n        ',
    attachments: [{
      filename: 'logo.jpg',
      path: _path2.default.join(__dirname, 'banka.jpg'),
      cid: 'unique@nodemailer.com'
    }]
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
exports.default = sendEmailNotification;