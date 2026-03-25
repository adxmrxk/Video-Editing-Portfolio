# Video Editing Portfolio - Backend Server

This is the backend server for handling contact form submissions and sending emails.

## Setup Instructions

### 1. Install Dependencies

Navigate to the server directory and install the required packages:

```bash
cd server
npm install
```

### 2. Configure Gmail App Password

To send emails via Gmail, you need to create an App Password:

1. Go to your Google Account: https://myaccount.google.com/security
2. Enable **2-Step Verification** if not already enabled
3. Go to **App passwords**: https://myaccount.google.com/apppasswords
4. Select **Mail** as the app and **Other** as the device
5. Give it a name like "Video Portfolio Contact Form"
6. Click **Generate**
7. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

### 3. Create Environment File

Copy the example environment file and add your credentials:

```bash
cp .env.example .env
```

Then edit the `.env` file and add:

```env
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

**IMPORTANT:**
- Replace `your-email@gmail.com` with your Gmail address
- Replace `your-16-char-app-password` with the app password you generated (remove spaces)
- Never commit the `.env` file to git (it's already in .gitignore)

### 4. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST /api/contact

Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "pro",
  "message": "I'd like to discuss a project..."
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

### GET /api/health

Check if the server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Testing the Server

You can test the server using curl or Postman:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "service": "starter",
    "message": "This is a test message"
  }'
```

## Deployment

### Option 1: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-app-password
   ```
5. Deploy: `git push heroku main`

### Option 2: Railway

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### Option 3: Render

1. Create a new Web Service on Render
2. Connect your repository
3. Set environment variables
4. Deploy

**Don't forget to update the API URL in the Angular component** (`contact.component.ts`) when deploying to production:

```typescript
private apiUrl = 'https://your-backend-url.com/api/contact';
```

## Troubleshooting

### Email not sending?

1. Check that your Gmail App Password is correct
2. Verify 2-Step Verification is enabled on your Google account
3. Check the server logs for error messages
4. Make sure the `.env` file exists and has the correct values

### CORS errors?

The server is configured to accept requests from any origin. If you need to restrict this in production, update the CORS configuration in `server.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

### Port already in use?

Change the PORT in your `.env` file to a different number (e.g., 3001, 5000, etc.)

## Security Notes

- Never commit the `.env` file
- Keep your App Password secure
- In production, use environment variables from your hosting provider
- Consider rate limiting for the contact endpoint in production
