const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, service, message } = req.body;

  // Validate required fields
  if (!name || !email || !service || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // Format the email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Contact Form Submission - ${service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #9333ea;">New Contact Form Submission</h2>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 10px 0;"><strong>Service Interested In:</strong> ${service}</p>
        </div>
        <div style="margin: 20px 0;">
          <h3 style="color: #9333ea;">Message:</h3>
          <p style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #9333ea; border-radius: 4px;">
            ${message}
          </p>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px;">
          This email was sent from your Video Editing Portfolio website contact form.
        </p>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Service Interested In: ${service}

Message:
${message}

---
This email was sent from your Video Editing Portfolio website contact form.
    `
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully to:', process.env.RECIPIENT_EMAIL);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Email will be sent to: ${process.env.RECIPIENT_EMAIL}`);
});
