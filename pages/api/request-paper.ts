import type { NextApiRequest, NextApiResponse } from 'next';
import emailjs from '@emailjs/browser';

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
    // Initialize EmailJS
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
    });

    // Send email via EmailJS
    const response = await emailjs.send('gmail', 'paper_request_template', {
      to_email: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || 'mckerchr@mcmaster.ca',
      person: requesterName,
      paper: paperTitle,
      email: requesterEmail,
      institution: requesterInstitution || 'Not provided',
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
