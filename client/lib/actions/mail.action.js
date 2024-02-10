// "use server";
// import nodemailer from "nodemailer";

// export default async function sendMail(subject, toEmail, text) {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.SMTP_EMAIL,
//       to: toEmail,
//       subject: subject,
//       text: text,
//       html: "<h1> Hello Mail from the server Action </h1>",
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent: " + info.response);
//       }
//     });
//   } catch (error) {
//     console.log("Error sending mail", error);
//   }
// }
