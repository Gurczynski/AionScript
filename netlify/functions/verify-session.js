// Netlify Function: Verify Stripe Checkout Session
// Used by Lovable frontend to get session details after redirect
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { sessionId } = JSON.parse(event.body);

    if (!sessionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing sessionId' }),
      };
    }

    // Retrieve the Checkout Session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription'],
    });

    // Return relevant details to frontend
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: session.id,
        customer_email: session.customer_email,
        customer_id: session.customer,
        subscription_id: session.subscription,
        plan: session.metadata.plan || 'pro',
        billingCycle: session.metadata.billingCycle || 'monthly',
        status: session.status,
        payment_status: session.payment_status,
      }),
    };
  } catch (error) {
    console.error('Session verification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
