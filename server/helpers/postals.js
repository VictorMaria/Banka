import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const glide = process.env.postalsecret;

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'fatima.kamali@outlook.com',
    pass: glide,
  },
});


const sendEmailNotification = (recipient, emailSubject, transactionType, transactionDate,
  amount, balance) => {
  const mailOptions = {
    from: ' "Banka 👻" victormaria.oar@outlook.com',
    to: recipient,
    subject: emailSubject,
    html: `<h1>Banka</h2>
              <img src="cid:unique@nodemailer.com"/>
              <p><strong>${transactionDate}</strong><br>
              <strong>${transactionType}</strong><br>
              Amount <strong>N${amount}</strong><br>
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
export default sendEmailNotification;
