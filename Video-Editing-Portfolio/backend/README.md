# Video Editing Portfolio - Backend

This is the backend server for the Video Editing Portfolio website. It handles contact form submissions and sends them to your email address.

## Features

- Receives contact form data from the frontend
- Sends formatted emails with submission details
- CORS enabled for Angular frontend
- Beautiful HTML email templates

## Setup Instructions

### 1. Install Dependencies

Dependencies are already installed, but if needed:

```bash
npm install
```

### 2. Configure Email Settings

1. Copy `.env.example` to create your `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your email credentials:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   PORT=3000
   ```

### 3. Gmail App Password Setup

**Important:** For Gmail, you need to use an "App Password" instead of your regular password.

#### Steps to get a Gmail App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. Select "Security" from the left menu
3. Under "Signing in to Google," select "2-Step Verification" (you must have this enabled)
4. At the bottom, select "App passwords"
5. Select "Mail" and your device
6. Click "Generate"
7. Copy the 16-character password and paste it into your `.env` file as `EMAIL_PASSWORD`

**Note:** Remove spaces from the app password when pasting.

### 4. Using Other Email Providers

If you're not using Gmail, update the `service` in `server.js`:

```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook', // or 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

Or use SMTP directly:

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

## Running the Server

### Development

```bash
npm start
```

The server will start on `http://localhost:3000`

### Production

For production deployment, you can use services like:

- **Heroku**: `git push heroku main`
- **Railway**: Connect your GitHub repo
- **DigitalOcean App Platform**: Connect your GitHub repo
- **AWS/Azure/GCP**: Deploy as a Node.js app

Remember to set environment variables in your hosting platform.

## API Endpoints

### POST `/api/contact`

Receives contact form submissions and sends an email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "pro",
  "message": "I'd like to hire you for a project..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error message"
}
```

### GET `/api/health`

Health check endpoint to verify server is running.

**Response (200):**
```json
{
  "status": "Server is running"
}
```

## Email Format

The emails you receive will include:

- **Subject:** "New Contact Form Submission - [service type]"
- **From Name:** The name from the form
- **Contact Email:** The email address from the form
- **Service:** The package they're interested in
- **Message:** Their full message
- Beautifully formatted HTML email with your brand colors

## Troubleshooting

### "Invalid login" or authentication errors

- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled on your Google account
- Check that there are no spaces in your App Password

### "Connection refused" from frontend

- Make sure the backend server is running (`npm start`)
- Verify the API URL in the frontend matches: `http://localhost:3000`
- Check that CORS is properly configured (it should be by default)

### Emails not being received

- Check your spam folder
- Verify `RECIPIENT_EMAIL` in `.env` is correct
- Look at the server console logs for error messages
- Test with the health endpoint: `http://localhost:3000/api/health`

## Security Notes

- Never commit your `.env` file to version control
- The `.gitignore` file is already configured to exclude it
- Use environment variables for all sensitive data
- Consider rate limiting for production to prevent spam

## Next Steps

1. Set up your `.env` file with your email credentials
2. Run `npm start` to start the server
3. Test the contact form on your website
4. Deploy to a hosting platform for production use
