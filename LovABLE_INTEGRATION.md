# Lovable + Stripe + AionDB Multi-Tenant Integration

## Overview
You've been using:
- **Lovable** → Build React frontend (drag-and-drop UI)
- **Stripe** → Handle payments (already working)
- **Netlify** → Host website + serverless functions

This guide integrates the **AionDB multi-tenant backend** with your existing setup.

---

## Architecture (How It All Connects)

```
┌─────────────────────────────────────────────────┐
│              LOVABLE FRONTEND                   │
│         (Lovable generates React code)           │
│                   │
│  /pricing → Pricing page (Stripe Checkout)    │
│  /signup  → Signup form (create tenant)        │
│  /dashboard → Redirect to tenant Studio        │
└──────────────────┬──────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────┐
│           NETLIFY SERVERLESS FUNCTIONS           │
│                   │
│  /create-checkout → Creates Stripe session     │
│  /stripe-webhook → Handles subscription events  │
│  /verify-session → Gets customer details       │
└──────────────────┬──────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────┐
│         AIONDB PLATFORM API (VPS)               │
│    (aion-platform repo - tenant-provision.ts)    │
│                   │
│  POST /tenants/provision → Creates tenant       │
│  PUT  /tenants/subscription → Updates status   │
│  GET  /tenants/:id → Gets tenant info          │
└──────────────────┬──────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────┐
│      SHARED POSTGRESQL (Multi-Tenant)           │
│                   │
│  - tenants table (platform level)              │
│  - tenant_usage table (billing)                │
│  - tenant_abc123 schema (customer's data)      │
└─────────────────────────────────────────────────┘
```

---

## Step 1: Keep Your Lovable Pages

Lovable generates React components in `/src/pages/`. **Don't overwrite them** — just add the new pages:

### Pages to Add (or let Lovable generate them):
```
src/pages/
├── Pricing.jsx    ← Create with Lovable (drag-and-drop)
├── Signup.jsx     ← Create with Lovable
├── Home.jsx       ← Already exists (Lovable-generated)
├── Docs.jsx       ← Already exists
└── ...
```

### Let Lovable Generate Pricing Page:
1. Go to [lovable.dev](https://lovable.dev)
2. Open your project
3. Prompt: *"Create a pricing page with 4 plans: Free ($0), Pro ($25/mo), Team ($149/mo), Enterprise (contact us). Include Stripe Checkout buttons."*
4. Lovable generates `Pricing.jsx` → download and save to `src/pages/`

---

## Step 2: Your Existing Stripe Setup

Since Stripe is already working, just **add these environment variables** in Netlify:

```bash
# Netlify → Site Settings → Environment Variables
STRIPE_PUBLISHABLE_KEY=pk_live_...    # Already set
STRIPE_SECRET_KEY=sk_live_...          # Already set
STRIPE_WEBHOOK_SECRET=whsec_...       # ADD THIS (from Stripe webhook settings)

# AionDB Platform API
AION_API_URL=https://api.aionscript.com
AION_SERVICE_KEY=your_service_key_here  # Generate this from your platform
```

---

## Step 3: Update Stripe Webhook (Non-Breaking)

Your existing `stripe-webhook.js` already works. I've enhanced it (see `netlify/functions/stripe-webhook.js`). The key addition:

```javascript
// When checkout completes, provision the tenant
case 'checkout.session.completed': {
  const session = stripeEvent.data.object;
  
  // Call AionDB platform to create tenant
  await fetch(`${process.env.AION_API_URL}/tenants/provision`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.AION_SERVICE_KEY}`
    },
    body: JSON.stringify({
      email: session.customer_email,
      plan: session.metadata.plan,
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
    })
  });
  break;
}
```

---

## Step 4: Connect Lovable to Stripe

### In Your Lovable Pricing Page:

```jsx
// Lovable generates this (you customize the Stripe call)
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const handleSubscribe = async (priceId, plan) => {
  const stripe = await stripePromise;
  
  // Call your Netlify function
  const response = await fetch('/.netlify/functions/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      priceId: priceId,
      plan: plan,
      billingCycle: 'monthly',
      email: userEmail, // Get from your form
    })
  });
  
  const { sessionId } = await response.json();
  
  // Redirect to Stripe Checkout
  await stripe.redirectToCheckout({ sessionId });
};
```

---

## Step 5: Multi-Tenant Provisioning (AionDB Platform)

Deploy the `aion-platform` with the `tenant-provision.ts` I created:

```bash
cd "/Users/danielgurczynski/Library/Mobile Documents/com~apple~CloudDocs/aion/aion-platform"

# Add to core/aion-platform.ts
import { TenantProvisioner } from './tenant-provision.js';

const provisioner = new TenantProvisioner();
provisioner.setupRoutes(app);
```

### What Happens on Signup:
1. User clicks "Subscribe" on Lovable Pricing page
2. Stripe Checkout opens (handled by `create-checkout.js`)
3. User enters payment info
4. Stripe sends `checkout.session.completed` webhook
5. `stripe-webhook.js` calls AionDB API: `POST /tenants/provision`
6. `tenant-provision.ts` creates:
   - PostgreSQL schema: `tenant_abc123`
   - Admin user in that schema
   - API keys (anon + service)
7. User redirected to `/signup?session_id=xxx`
8. User sets password → tenant activated
9. Redirect to their dashboard: `https://abc123.aionscript.com`

---

## Step 6: Test the Flow

### Test Card (Stripe Test Mode):
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

### Test Steps:
1. **Lovable Preview** → Go to `/pricing`
2. Click "Subscribe" on Pro plan
3. Enter test card details
4. Stripe redirects to `/signup?session_id=xxx`
5. Webhook fires → tenant provisioned
6. Complete signup → redirected to dashboard

---

## Key Files (Don't Overwrite Lovable's Code)

| File | Purpose | Overwrite? |
|------|---------|-------------|
| `src/pages/Home.jsx` | Homepage | ❌ No (Lovable-generated) |
| `src/pages/Pricing.jsx` | Pricing page | ✅ Let Lovable create |
| `src/pages/Signup.jsx` | Signup form | ✅ Create manually |
| `netlify/functions/create-checkout.js` | Stripe Checkout | ✅ Use my improved version |
| `netlify/functions/stripe-webhook.js` | Webhook handler | ✅ Use my improved version |
| `core/tenant-provision.ts` | Tenant creation | ✅ New file (platform) |

---

## Common Issues & Fixes

### "Stripe webhook signature verification failed"
- Make sure `STRIPE_WEBHOOK_SECRET` is set in Netlify env vars
- Get it from: Stripe Dashboard → Webhooks → Your endpoint → Signing secret

### "CORS error when calling Aion API"
- Add CORS headers to your platform API
- Or use Netlify proxy: `/api/*` → `https://api.aionscript.com/*`

### "Tenant not provisioned after payment"
- Check Netlify function logs: Netlify Dashboard → Functions → stripe-webhook → View logs
- Verify `AION_API_URL` and `AION_SERVICE_KEY` are set

---

## Next Steps

1. ✅ **Keep using Lovable** for frontend changes (drag-and-drop)
2. ✅ **Stripe stays as-is** (just add webhook secret)
3. ✅ **Deploy AionDB platform** with tenant provisioning
4. ✅ **Test the full flow** end-to-end

Need help with:
- Setting up Stripe webhook in dashboard?
- Deploying the Aion platform to your VPS?
- Connecting Lovable to your custom domain?
