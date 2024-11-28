import sendgrid from "@sendgrid/mail";

// Initialize SendGrid with your API key
sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { name, email, message, isAttending } = await req.json();

    const subject = isAttending
      ? "RSVP Confirmation: Attending"
      : "RSVP Confirmation: Not Attending";

    const content = `
      <h3>RSVP Details:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Attendance:</strong> ${isAttending ? "Yes" : "No"}</p>

    `;

    await sendgrid.send({
      to: email,
      from: process.env.NEXT_PUBLIC_EMAIL_FROM,  // replace with your SendGrid verified sender email
      subject: subject,
      html: content,
    });

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "Error sending email." }),
      { status: 500 }
    );
  }
}
