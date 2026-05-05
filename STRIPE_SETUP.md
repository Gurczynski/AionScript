# Stripe Integration Setup Guide

## Overview
This guide explains how to set up Stripe for AionDB's multi-tenant subscription system.

## 1. Create Stripe Account

1. Sign up at [stripe.com](https://stripe.com)
2. Activate your account and complete verification
3. Switch to **Test Mode** for development

## 2. Create Products & Prices

In Stripe Dashboard → Products:

### Pro Plan
- **Name**: AionDB Pro
- **Description**: For production applications
- **Pricing**: $25/month (recurring)
- **Trial**: 14 days
- **Copy Price ID**: `price_xxxxx_pro_monthly`

### Team Plan
- **Name**: AionDB Team
- **Description**: For teams and growing businesses
- **Pricing**: $149/month (recurring)
- **Trial**: 14 days
- **Copy Price ID**: `price_xxxxx_team_monthly`

## 3. Get API Keys

1. Go to **Developers → API keys**
2. Copy **Publishable key** (starts with `pk_test_`)
3. Copy **Secret key** (starts with `sk_test_`) - Click "Reveal"
4. Add to your `.env` file

## 4. Set Up Webhooks

1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. **Endpoint URL**: `https://aionscript.com/.netlify/functions/stripe-webhook`
4. **Events to send**:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Copy **Webhook signing secret** (starts with `whsec_`)

## 5. Environment Variables

Add to Netlify environment variables (Site settings → Environment variables):

```bash
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
VITE_STRIPE_PRO_PRICE_ID=price_xxxxx
VITE_STRIPE_TEAM_PRICE_ID=price_xxxxx
AION_API_URL=https://api.aionscript.com
AION_SERVICE_KEY=your_service_key
```

## 6. Test the Flow

### Test Card Numbers (Stripe Test Mode)
- **Success**: 4242 4242 4242 4242
- **Requires Auth**: 4000 0025 0000 3155
- **Declined**: 4000 0000 0000 9995

### Test Signup Flow
1. Go to `/pricing`
2. Click "Start Free Trial" on Pro plan
3. Use test card: 4242 4242 4242 4242
4. Any future expiry date, any CVC
5. Complete checkout
6. Verify webhook receives `checkout.session.completed`
7. Check tenant is provisioned in your Aion platform

## 7. Provisioning Flow

```
User clicks "Start Free Trial"
    ↓
Stripe Checkout Session created
    ↓
User enters payment info
    ↓
Stripe sends checkout.session.completed webhook
    ↓
Netlify function /stripe-webhook handles event
    ↓
Calls Aion Platform API: POST /tenants/provision
    ↓
Tenant created in shared PostgreSQL:
  - Schema: tenant_abc123
  - Admin user created
  - API keys generated
    ↓
User redirected to /signup?session_id=xxx&plan=pro
    ↓
User sets password
    ↓
Tenant activated, redirected to dashboard
```

## 8. Production Checklist

- [ ] Switch Stripe to Live mode
- [ ] Update webhook endpoint to production URL
- [ ] Replace test API keys with live keys
- [ ] Set up SSL certificates (Let's Encrypt)
- [ ] Configure DNS:
  - `aionscript.com` → website
  - `api.aionscript.com` → Aion platform API
  - `*.aionscript.com` → tenant dashboards
- [ ] Set up monitoring (Stripe Radar for fraud)
- [ ] Configure email templates for:
  - Welcome email
  - Payment failed
  - Subscription canceled
  - Invoice payment

## 9. Multi-Tenant Architecture

### Shared Infrastructure (Supabase-style)
```
┌─────────────────────────────────────────┐
│     Aion Platform (Shared K8s)        │
│                                         │
│  Tenant A Schema  │  Tenant B Schema   │
│  ├─ users         │  ├─ users          │
│  ├─ api_keys      │  ├─ api_keys       │
│  └─ audit_log    │  └─ audit_log      │
│                                         │
│  Shared PostgreSQL + Resource Limits    │
└─────────────────────────────────────────┘
```

### Resource Limits by Plan
| Plan | Tables | Rows | Storage | Vector Dims |
|------|--------|------|----------|-------------|
| Free | 10 | 1K | 100MB | 384 |
| Pro | 100 | 1M | 10GB | 384 |
| Team | 1000 | 10M | 100GB | 1536 |
| Enterprise | Unlimited | Unlimited | Unlimited | 1536 |

## 10. Monitoring

### Stripe Dashboard
- Monitor new subscriptions
- Track MRR (Monthly Recurring Revenue)
- Check failed payments

### Aion Platform
- Monitor tenant usage via `/tenants/:id/usage`
- Track resource consumption
- Set up alerts for limit breaches

## Support
For issues with:
- **Stripe**: https://support.stripe.com
- **AionDB Platform**: Check platform logs at `/var/log/aion-platform.log`
