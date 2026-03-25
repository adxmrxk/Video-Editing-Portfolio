# Backend Email Setup Guide

Your video editing portfolio website now has a working backend that will send form submissions directly to your email!

## Quick Start

### Step 1: Get Your Gmail App Password

1. Go to https://myaccount.google.com/security
2. Click on "2-Step Verification" and enable it if not already enabled
3. Once 2-Step is enabled, go to https://myaccount.google.com/apppasswords
4. Select:
   - App: **Mail**
   - Device: **Other (Custom name)** - name it "Portfolio Contact Form"
5. Click **Generate**
6. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)
   - You won't be able to see this password again, so copy it now!

### Step 2: Configure the Backend

1. Open the file: `server/.env`
2. Replace the placeholder values:
   ```env
   PORT=3000
   EMAIL_USER=your-actual-email@gmail.com
   EMAIL_PASSWORD=abcdefghijklmnop
   ```

   **Example:**
   ```env
   PORT=3000
   EMAIL_USER=adam.videoeditor@gmail.com
   EMAIL_PASSWORD=xqzy wvut srqp onml
   ```

   Note: Remove spaces from the app password when pasting it.

### Step 3: Start the Backend Server

Open a **new terminal/command prompt** and run:

```bash
cd server
npm start
```

You should see:
```
Server is running on http://localhost:3000
Email server is ready to send messages
```

### Step 4: Start the Frontend (Angular)

In a **separate terminal/command prompt**, run:

```bash
npm start
```

This will start your Angular development server.

### Step 5: Test It!

1. Open your website (usually `http://localhost:4200`)
2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your Gmail inbox - you should receive an email with the form submission!

## Important Notes

### Running Both Servers

You need **TWO terminals running at the same time:**

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend (Angular):**
```bash
npm start
```

### When Deploying to Production

1. Deploy your backend to a service like:
   - Heroku (free tier available)
   - Railway (free tier available)
   - Render (free tier available)
   - Vercel/Netlify with serverless functions

2. Update the API URL in `src/app/components/contact/contact.component.ts`:
   ```typescript
   private apiUrl = 'https://your-backend-domain.com/api/contact';
   ```

3. Set your EMAIL_USER and EMAIL_PASSWORD as environment variables in your hosting provider (don't commit the .env file!)

## Troubleshooting

### "Email transporter configuration error"
- Your Gmail app password is incorrect or not set
- Check that you copied the password correctly (no spaces)
- Make sure 2-Step Verification is enabled

### "Connection refused" or "Network error"
- The backend server is not running
- Check that you started the server with `npm start` in the server directory
- Make sure it's running on port 3000

### Form shows "error" message
- Check both terminal windows for error messages
- Verify the backend server is running
- Check browser console for errors (F12)

### Email not received
- Check your spam folder
- Verify EMAIL_USER is correct in .env
- Check the backend terminal for error messages

## Next Steps

Once you've tested that emails are working:

1. Update the placeholder email addresses in `src/app/components/contact/contact.component.html` (lines 111, 115)
2. Add your real social media handles (Instagram, TikTok) in the same file
3. Test the form again to make sure everything works
4. Deploy your backend to a hosting service
5. Update the API URL in the contact component
6. Deploy your frontend

## Need Help?

If you run into issues:
1. Check both terminal windows for error messages
2. Verify your .env file has the correct values
3. Make sure both servers are running
4. Check the browser console (F12) for errors
