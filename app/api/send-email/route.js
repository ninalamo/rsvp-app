// import mailjet from 'node-mailjet';

// // Initialize Mailjet with the correct API connection method
// const mailjetClient = mailjet.apiConnect(
//   process.env.MAILJET_API_KEY,
//   process.env.MAILJET_API_SECRET
// );

// export async function POST(req) {
//   try {
//     const { name, email, message, isAttending } = await req.json();

//     const subject = isAttending
//       ? "RSVP Confirmation: Attending"
//       : "RSVP Confirmation: Not Attending";

//     const content = `
//       <h3>RSVP Details:</h3>
//       <p><strong>Name:</strong> ${name}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Message:</strong> ${message}</p>
//       <p><strong>Attendance:</strong> ${isAttending ? "Yes" : "No"}</p>
//     `;

//     const request = mailjetClient
//       .post('send')
//       .request({
//         Messages: [
//           {
//             From: {
//               Email: process.env.NEXT_PUBLIC_EMAIL_FROM,  // replace with your Mailjet verified sender email
//               Name: 'RSVP App',
//             },
//             To: [
//               {
//                 Email: email,
//               },
//             ],
//             Subject: subject,
//             HTMLPart: content,
//           },
//         ],
//       });

//     await request;

//     return new Response(
//       JSON.stringify({ message: "Email sent successfully!" }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return new Response(
//       JSON.stringify({ error: "Error sending email." }),
//       { status: 500 }
//     );
//   }
// }
