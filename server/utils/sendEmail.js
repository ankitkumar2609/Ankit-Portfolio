import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('[Nodemailer] SMTP settings not fully configured in environment. Skipping email sending.');
    return { success: true, simulated: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: `"${options.name}" <${process.env.SMTP_USER}>`,
    replyTo: options.email,
    to: process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'ankitkumar952390@gmail.com',
    subject: `Portfolio Contact: ${options.subject || 'New Message'} from ${options.name}`,
    text: `You have received a new contact message from your portfolio website:\n\nName: ${options.name}\nEmail: ${options.email}\nSubject: ${options.subject || 'N/A'}\n\nMessage:\n${options.message}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
        <h2 style="color: #4f46e5;">New Portfolio Contact Message</h2>
        <p><strong>Name:</strong> ${options.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${options.email}">${options.email}</a></p>
        <p><strong>Subject:</strong> ${options.subject || 'Portfolio Inquiry'}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <h3>Message:</h3>
        <p style="background: #f9fafb; padding: 15px; border-left: 4px solid #4f46e5; border-radius: 4px;">
          ${options.message.replace(/\n/g, '<br>')}
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('[Nodemailer] Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Nodemailer Error] Could not send email:', error.message);
    return { success: false, error: error.message };
  }
};

export default sendEmail;
