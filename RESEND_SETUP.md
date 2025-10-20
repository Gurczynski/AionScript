# Resend.com Integration Setup for Netlify

This guide explains how to configure the contact form to work with Resend.com on Netlify.

## Prerequisites

1. **Resend.com Account**: Sign up at [resend.com](https://resend.com)
2. **Verified Domain** (recommended): Add and verify your domain in Resend for better deliverability
3. **Netlify Deployment**: Your site should be deployed on Netlify

## Environment Variables Setup

In your Netlify dashboard, go to **Site settings > Environment variables** and add the following:

### Required Variables

```bash
RESEND_API_KEY=re_xxxxxxxxxx
CONTACT_TO_EMAIL=your-email@yourdomain.com
```

### Optional Variables

```bash
CONTACT_FROM_EMAIL=contact@yourdomain.com
CONTACT_SUBJECT_PREFIX=AionScript Contact
```

## Getting Your Resend API Key

1. Log into your Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Choose **Sending access** for the permission level
5. Copy the generated key (starts with `re_`)

## Email Configuration

### From Email Address
- **With verified domain**: Use any address from your verified domain (e.g., `contact@yourdomain.com`)
- **Without verified domain**: Use `onboarding@resend.dev` (default)

### To Email Address
- Set `CONTACT_TO_EMAIL` to where you want to receive contact form submissions
- Can be any valid email address

## Form Features

✅ **Spam Protection**: Includes honeypot field (`company`) to catch bots  
✅ **Validation**: Client and server-side validation  
✅ **CORS Support**: Proper headers for cross-origin requests  
✅ **Error Handling**: Graceful error messages for users  
✅ **Reply-To**: Automatically sets reply-to as the sender's email  

## Testing

1. Deploy your site to Netlify
2. Set the environment variables
3. Visit `/beta` page where the contact form is located
4. Submit a test message
5. Check your `CONTACT_TO_EMAIL` inbox

## Troubleshooting

### Common Issues

**"Server not configured" error**:
- Check that `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set in Netlify

**"Failed to send" error**:
- Verify your Resend API key is correct
- Check if your from email domain is verified (if using custom domain)
- Ensure you have sending credits in your Resend account

**Form not submitting**:
- Check browser console for JavaScript errors
- Verify the Netlify function is deployed (check Functions tab in Netlify)

### Debug Steps

1. Check Netlify Functions logs in your dashboard
2. Test the function directly: `POST /.netlify/functions/contact`
3. Verify environment variables are set correctly
4. Check Resend dashboard for sending activity

## Security Notes

- The honeypot field (`company`) should remain hidden
- API keys are server-side only and not exposed to clients
- CORS is configured for same-origin requests
- Input is sanitized before sending emails

## Rate Limiting

Resend has the following limits:
- **Free tier**: 100 emails/day, 3,000 emails/month
- **Pro tier**: Higher limits available

Consider implementing additional rate limiting if needed.
