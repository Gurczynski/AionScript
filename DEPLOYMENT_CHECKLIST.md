# Netlify Deployment Checklist

## Pre-Deployment Setup

### 1. Resend.com Account
- [ ] Create account at [resend.com](https://resend.com)
- [ ] Generate API key with "Sending access" permission
- [ ] (Optional) Verify your domain for better deliverability

### 2. Environment Variables
Set these in Netlify Dashboard → Site Settings → Environment Variables:

**Required:**
- [ ] `RESEND_API_KEY` = your Resend API key (starts with `re_`)
- [ ] `CONTACT_TO_EMAIL` = email where you want to receive messages

**Optional:**
- [ ] `CONTACT_FROM_EMAIL` = verified sender email (defaults to `onboarding@resend.dev`)
- [ ] `CONTACT_SUBJECT_PREFIX` = email subject prefix (defaults to "AionScript Contact")

## Deployment Steps

### 1. Build Configuration
- [ ] Verify `netlify.toml` is configured correctly:
  ```toml
  [build]
    publish = "dist"
    command = "npm run build"

  [functions]
    directory = "netlify/functions"
    node_bundler = "esbuild"

  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

### 2. Deploy to Netlify
- [ ] Connect GitHub repository to Netlify
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Deploy site

### 3. Verify Functions
- [ ] Check that `contact` function appears in Netlify Functions tab
- [ ] Function should show as "Active" status

## Post-Deployment Testing

### 1. Contact Form Test
- [ ] Visit `/beta` page on your live site
- [ ] Fill out the contact form with test data
- [ ] Submit the form
- [ ] Verify success message appears
- [ ] Check your `CONTACT_TO_EMAIL` inbox for the message

### 2. Error Testing
- [ ] Test form validation (empty fields)
- [ ] Test with invalid email format
- [ ] Verify error messages display correctly

### 3. Spam Protection
- [ ] Confirm honeypot field (`company`) is hidden
- [ ] Test that bot submissions are silently ignored

## Troubleshooting

### Common Issues

**Form shows "Network error":**
- Check Netlify Functions logs
- Verify environment variables are set
- Ensure function deployed successfully

**"Server not configured" error:**
- Missing `RESEND_API_KEY` or `CONTACT_TO_EMAIL`
- Check environment variable names (case-sensitive)

**"Failed to send" error:**
- Invalid Resend API key
- Unverified sender domain (if using custom from email)
- Resend account limits exceeded

### Debug Steps
1. Check Netlify Functions logs in dashboard
2. Test function directly: `curl -X POST https://yoursite.netlify.app/.netlify/functions/contact`
3. Verify Resend dashboard for activity
4. Check browser console for JavaScript errors

## Security Checklist

- [ ] API keys are server-side only (not in client code)
- [ ] Honeypot field is properly hidden
- [ ] CORS headers are configured
- [ ] Input sanitization is working
- [ ] Rate limiting considered (if high traffic expected)

## Performance Notes

- [ ] Form submission shows loading state
- [ ] Success/error messages are clear
- [ ] Form resets after successful submission
- [ ] No memory leaks in React components

## Monitoring

After deployment, monitor:
- [ ] Netlify Functions usage/errors
- [ ] Resend sending statistics
- [ ] Form submission success rates
- [ ] User feedback on form functionality
