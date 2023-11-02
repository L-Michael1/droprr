import { createTransport } from "nodemailer";

type EmailProductInfo = {
  title: string;
  url: string;
};

type NotificationType = "PRICE_DROP";

type EmailContent = {
  subject: string;
  body: string;
};

export const notification = {
  PRICE_DROP: "PRICE_DROP",
};

export const generateEmailBody = (
  product: EmailProductInfo,
  type: NotificationType,
) => {
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;

  let subject = "";
  let body = "";

  switch (type) {
    case notification.PRICE_DROP:
      subject = `Price Drop Alert for ${shortenedTitle}`;
      body = `
        <div>
          <h1>Price Drop Alert!</h1>
          <p>The price for ${product.title} has dropped to ${product.url}.</p>
        </div>
        `;
      break;
    default:
      throw new Error("Invalid notification type");
  }

  return { subject, body };
};

const transporter = createTransport({
  pool: true,
  service: "hotmail",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  maxConnections: 1,
});

export const sendEmail = (emailContent: EmailContent, sendTo: string) => {
  const mailOptions = {
    from: "",
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    } else {
      return console.log("Email sent: " + info.response);
    }
  });
};
