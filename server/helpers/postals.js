import nodemailer from 'nodemailer';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'victormaria.oar@outlook.com',
    pass: 'd4shw0rd',
  },
});

// eslint-disable-next-line max-len
const sendEmailNotification = (recipient, emailSubject, transactionType, transactionDate, amount, remark, balance) => {
  const mailOptions = {
    from: ' "Banka 👻" victormaria.oar@outlook.com',
    to: recipient,
    subject: emailSubject,
    html: `<h1>Banka</h2>
              <img src="cid:unique@nodemailer.com"/>
              <p><strong>${transactionDate}</strong><br>
              <strong>${transactionType}</strong><br>
              Amount <strong>N${amount}</strong><br>
              Remark <strong>${remark}</strong><br>
              Balance <strong>N${balance}</strong></p>
        `,
    attachments: [
      {
        filename: 'logo.jpg',
        path: path.join(__dirname, 'banka.jpg'),
        cid: 'unique@nodemailer.com',
      },
    ],
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
// eslint-disable-next-line import/prefer-default-export
export { sendEmailNotification };
