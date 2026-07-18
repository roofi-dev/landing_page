import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const uniqueId = Math.random().toString(36).substring(7).toUpperCase();
    const finalSubject = subject 
      ? `${subject} [#${uniqueId}]`
      : `New contact form message from ${name} [#${uniqueId}]`;

    const { data, error } = await resend.emails.send({
      from: "Ladang Lima Contact <onboarding@resend.dev>",
      to: ["ladangwebstore@gmail.com"],
      replyTo: email,
      subject: finalSubject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #FAF9F6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px rgba(5, 46, 22, 0.05); border: 1px solid #e5e7eb;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 30px; background-color: #052e16; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">Ladang Lima</h1>
                        <p style="margin: 8px 0 0; color: #a1bfa3; font-size: 12px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase;">Contact Center</p>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <div style="margin-bottom: 30px;">
                          <h2 style="margin: 0 0 10px; color: #052e16; font-size: 20px; font-weight: 700;">New Message Received</h2>
                          <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">You have a new inquiry from the website contact form. Here are the details:</p>
                        </div>

                        <!-- Info Grid -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; border-collapse: separate; border-spacing: 0 12px;">
                          <tr>
                            <td width="100" style="vertical-align: top; padding-right: 20px;">
                              <p style="margin: 0; color: #9ca3af; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Name</p>
                            </td>
                            <td style="vertical-align: top;">
                              <p style="margin: 0; color: #052e16; font-size: 14px; font-weight: 600;">${name}</p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100" style="vertical-align: top; padding-right: 20px;">
                              <p style="margin: 0; color: #9ca3af; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Email</p>
                            </td>
                            <td style="vertical-align: top;">
                              <a href="mailto:${email}" style="margin: 0; color: #4a7c59; font-size: 14px; font-weight: 600; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td width="100" style="vertical-align: top; padding-right: 20px;">
                              <p style="margin: 0; color: #9ca3af; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Subject</p>
                            </td>
                            <td style="vertical-align: top;">
                              <p style="margin: 0; color: #052e16; font-size: 14px; font-weight: 600;">${subject || "N/A"}</p>
                            </td>
                          </tr>
                        </table>

                        <!-- Message Box -->
                        <div style="background-color: #f9fafb; border-radius: 16px; padding: 24px; border: 1px solid #f1f5f9;">
                          <p style="margin: 0 0 10px; color: #9ca3af; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">Message Content</p>
                          <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>

                        <!-- Action Button -->
                        <div style="margin-top: 40px; text-align: center;">
                          <a href="mailto:${email}" style="display: inline-block; background-color: #052e16; color: #ffffff; padding: 16px 32px; border-radius: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; text-decoration: none; transition: background-color 0.3s ease;">Reply to ${name.split(" ")[0]}</a>
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 0 40px 40px; text-align: center;">
                        <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 0 0 30px;" />
                        <p style="margin: 0; color: #9ca3af; font-size: 11px; letter-spacing: 0.05em;">
                          &copy; ${new Date().getFullYear()} Ladang Lima. All rights reserved.<br />
                          Sent via Ladang Lima Website Portal.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
