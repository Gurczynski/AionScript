// Netlify Function: Create Stripe Checkout Session
// Improved with: validation, yearly pricing, customer metadata
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body);
    const { priceId, plan = 'pro', billingCycle = 'monthly', email } = body;

    // Validation
    if (!email || !priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: email, priceId' }),
      };
    }

    // Valid plans
    const validPlans = ['free', 'pro', 'team', 'enterprise'];
    if (!validPlans.includes(plan)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Invalid plan. Must be one of: ${validPlans.join(', ')}` }),
      };
    }

    // Free plan doesn't need checkout
    if (plan === 'free') {
      return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: null, free: true }),
      };
    }

    // Create or retrieve Stripe customer
    let customer;
    if (email) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({
          email,
          metadata: {
            plan: plan,
            source: 'aionscript_website',
          },
        });
      }
    }

    // Determine price ID based on billing cycle
    let finalPriceId = priceId;
    if (billingCycle === 'yearly' && plan !== 'team') {
      // Try yearly price ID first, fallback to monthly
      const yearlyPriceId = `${priceId}_YEARLY`;
      try {
        await stripe.prices.retrieve(yearlyPriceId);
        finalPriceId = yearlyPriceId;
      } catch {
        console.log('Yearly price not found, using monthly');
      }
    }

    // Create Checkout Session
    const sessionParams = {
      customer: customer?.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: finalPriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 14, // Free trial for paid plans
        metadata: {
          plan: plan,
        },
      },
      success_url: `${process.env.URL || 'http://localhost:3000'}/signup?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${process.env.URL || 'http://localhost:3000'}/pricing`,
      metadata: {
        plan: plan,
        billingCycle: billingCycle,
        source: 'aionscript_website',
      },
      // Collect billing address for tax
      billing_address_collection: 'auto',
      // Allow promotion codes
      allow_promotion_codes: true,
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: session.id,
        free: false,
      }),
    };
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        type: error.type || 'unknown',
      }),
    };
  }
};
