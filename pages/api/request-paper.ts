import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ResponseData = {
  message: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { paperTitle, requesterName, requesterEmail, requesterInstitution } = req.body;

  // Validate required fields
  if (!paperTitle || !requesterName || !requesterEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create a transporter using your email service
    // For Gmail, you'll need an app-specific password
    // See: https://support.google.com/accounts/answer/185833
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email to you (researcher)
    const researcherEmail = {
      from: process.env.EMAIL_USER,
      to: 'mckerchr@mcmaster.ca',
      subject: `Paper Request: ${paperTitle}`,
      html: `
        <h2>Paper Request Received</h2>
        <p><strong>Paper:</strong> ${paperTitle}</p>
        <p><strong>Requester Name:</strong> ${requesterName}</p>
        <p><strong>Requester Email:</strong> ${requesterEmail}</p>
        <p><strong>Institution:</strong> ${requesterInstitution || 'Not provided'}</p>
        <p>Please send the paper to the requester at your earliest convenience.</p>
      `,
    };

    // Send email to researcher only
    await transporter.sendMail(researcherEmail);

    return res.status(200).json({ message: 'Paper request sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      message: 'Failed to send request. Please try again later.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
