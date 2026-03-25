const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create email transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // This will be a Gmail App Password
  }
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, service, message } = req.body;

  // Validate required fields
  if (!name || !email || !service || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address'
    });
  }

  // Service packages mapping
  const serviceLabels = {
    'starter': 'Starter Package - $25',
    'pro': 'Pro Package - $50',
    'premium': 'Premium Package - $100',
    'custom': 'Custom Package'
  };

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Sending to yourself
    replyTo: email, // So you can reply directly to the client
    subject: `New Contact Form Submission - ${serviceLabels[service] || service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 3px solid #4A90E2; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 10px 0;">
            <strong style="color: #555;">Name:</strong>
            <span style="color: #333;">${name}</span>
          </p>

          <p style="margin: 10px 0;">
            <strong style="color: #555;">Email:</strong>
            <a href="mailto:${email}" style="color: #4A90E2; text-decoration: none;">${email}</a>
          </p>

          <p style="margin: 10px 0;">
            <strong style="color: #555;">Service Interested In:</strong>
            <span style="color: #333;">${serviceLabels[service] || service}</span>
          </p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #4A90E2; border-radius: 3px;">
            <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
          <p>This email was sent from your video editing portfolio contact form.</p>
          <p>You can reply directly to this email to respond to ${name}.</p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Service Interested In: ${serviceLabels[service] || service}

Message:
${message}

---
This email was sent from your video editing portfolio contact form.
You can reply directly to this email to respond to ${name}.
    `
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Contact form submission received from ${name} (${email})`);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    console.error('Error sending email:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/contact`);
});
