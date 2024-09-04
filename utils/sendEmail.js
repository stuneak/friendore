const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SEND_EMAIL_LOGIN,
    pass: process.env.SEND_EMAIL_PASSWORD,
  },
});

const generateSubscriptionHash = (arr) => {
  return encodeURIComponent(arr.join("$sep$"));
};

const getEmailContent = (content, unsubscribeHash) => {
  return `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2; background: #f6f8fb;">
            <div style="margin:20px auto;width:70%;padding:20px 20px; background: white; color: black;">
                <div style="border-bottom:1px solid #eee">
                    <a href="https://friendore.com/" style="font-size:1.4em;text-decoration:none;font-weight:600">Friendore</a>
                </div>
               <p style="margin: 0;">&nbsp;</p>
              ${content}
              <p style="margin: 0;">&nbsp;</p>
              <p style="margin: 0; font-size:0.9em;">Best regards,<br />Friendore</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <p style="margin: 0; font-size: 0.8em; color: #777;">
                   If you no longer wish to receive these emails, you can <a href="https://friendore.com/unsubscribe?hash=${unsubscribeHash}" style="color: #007bff; text-decoration: none;">unsubscribe here</a>.
               </p>
            </div>
          </div>`;
};

const sendLocalSignUpMessage = async (user, prefix = "") => {
  if (!user.isAgreedToReceiveEmail) {
    return;
  }

  const email = user.email;
  const password = user.password;
  const unsubscribeHashValues = [user.uniqueHash, user._id];

  const message = getEmailContent(
    `
      <p style="margin: 0; font-size:1.1em">Hi, ${email}!</p>
      <p style="margin: 0;">Welcome to Friendore! We're excited to have you with us. Here are your login details:</p>
      <ul style="margin: 0;">
        <li>Email: ${email}</li>
        <li>Password: ${password}</li>
      </ul>
    `,
    generateSubscriptionHash(unsubscribeHashValues)
  );

  console.log(`${prefix} sendLocalSignUpMessage: ${email}`);
  try {
    let info = await transporter.sendMail({
      from: "noreply@friendore.com", // sender address
      to: email, // list of receivers
      subject: "Notification from friendore", // Subject line
      html: message,
    });
    console.log(`${prefix} sendLocalSignUpMessage: ${email}. Email is sent`);
  } catch (error) {
    console.log(
      `${prefix} sendLocalSignUpMessage: ${email} failed. Error: ${error}`
    );
  }
};

const sendProfileApprovalMessage = async (user, prefix = "") => {
  if (!user.isAgreedToReceiveEmail) {
    return;
  }
  const email = user.email;
  const unsubscribeHashValues = [user.uniqueHash, user._id];
  const message = getEmailContent(
    `
      <p style="margin: 0; font-size:1.1em">Hi, ${email}! Thank you for giving such detailed answers to all the questions. You did a fantastic job, and now you can access all our features. We can't wait to help you find the best connections! :) </p>
    `,
    generateSubscriptionHash(unsubscribeHashValues)
  );

  console.log(`${prefix} sendProfileApprovalMessage: ${email}`);
  try {
    let info = await transporter.sendMail({
      from: "noreply@friendore.com", // sender address
      to: email, // list of receivers
      subject: "Notification from friendore", // Subject line
      html: message,
    });
    console.log(
      `${prefix} sendProfileApprovalMessage: ${email}. Email is sent`
    );
  } catch (error) {
    console.log(
      `${prefix} sendProfileApprovalMessage: ${email} failed. Error: ${error}`
    );
  }
};

const sendExpiringConnectionMessage = async (
  user,
  connectionsNumber,
  prefix = ""
) => {
  if (!user.isAgreedToReceiveEmail) {
    return;
  }
  const email = user.email;
  const unsubscribeHashValues = [user.uniqueHash, user._id];
  const message = getEmailContent(
    `
      <p style="margin: 0; font-size:1.1em">Hi, ${email}! You have ${connectionsNumber} connections that will expire in less than 2 days! Take a moment to check them 👀 </p>
    `,
    generateSubscriptionHash(unsubscribeHashValues)
  );

  console.log(`${prefix} sendExpiringConnectionMessage: ${email}`);
  try {
    let info = await transporter.sendMail({
      from: "noreply@friendore.com", // sender address
      to: email, // list of receivers
      subject: "Notification from friendore", // Subject line
      html: message,
    });
    console.log(
      `${prefix} sendExpiringConnectionMessage: ${email}. Email is sent`
    );
  } catch (error) {
    console.log(
      `${prefix} sendExpiringConnectionMessage: ${email} failed. Error: ${error}`
    );
  }
};

const sendExpiringFriendMessage = async (user, friendsNumber, prefix = "") => {
  if (!user.isAgreedToReceiveEmail) {
    return;
  }
  const email = user.email;
  const unsubscribeHashValues = [user.uniqueHash, user._id];
  const message = getEmailContent(
    `
      <p style="margin: 0; font-size:1.1em">Hi, ${email}! You have ${friendsNumber} friends that will expire in less than 2 days! Take a moment to check them 👀 </p>
    `,
    generateSubscriptionHash(unsubscribeHashValues)
  );

  console.log(`${prefix} sendExpiringFriendMessage: ${email}`);
  try {
    let info = await transporter.sendMail({
      from: "noreply@friendore.com", // sender address
      to: email, // list of receivers
      subject: "Notification from friendore", // Subject line
      html: message,
    });
    console.log(`${prefix} sendExpiringFriendMessage: ${email}. Email is sent`);
  } catch (error) {
    console.log(
      `${prefix} sendExpiringFriendMessage: ${email} failed. Error: ${error}`
    );
  }
};

module.exports = {
  sendLocalSignUpMessage,
  sendProfileApprovalMessage,
  sendExpiringConnectionMessage,
};
