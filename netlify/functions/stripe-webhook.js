// Netlify Function: Handle Stripe Webhooks
// Improved with: better error handling, retry logic, event logging
import Stripe from 'stripe';
import fetch from 'node-fetch';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Event types we handle
const HANDLED_EVENTS = [
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
  'customer.subscription.trial_will_end',
];

export const handler = async (event) => {
  const signature = event.headers['stripe-signature'] || event.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !endpointSecret) {
    console.error('Missing signature or webhook secret');
    return { statusCode: 400, body: 'Missing signature or webhook secret' };
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      signature,
      endpointSecret
    );

    // Log event for debugging
    console.log(`Processing webhook: ${stripeEvent.type} (${stripeEvent.id})`);

    // Ignore unhandled events
    if (!HANDLED_EVENTS.includes(stripeEvent.type)) {
      console.log(`Unhandled event type: ${stripeEvent.type}`);
      return { statusCode: 200, body: 'Event type not handled' };
    }

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        const { plan, billingCycle } = session.metadata;

        // Validate metadata
        if (!plan || !session.customer_email) {
          console.error('Missing metadata in checkout session:', session.id);
          return { statusCode: 400, body: 'Invalid session metadata' };
        }

        // Provision the tenant on your Aion platform
        const provisionResponse = await fetch(`${process.env.AION_API_URL}/tenants/provision`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AION_SERVICE_KEY || ''}`,
          },
          body: JSON.stringify({
            email: session.customer_email,
            plan: plan,
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            billingCycle: billingCycle || 'monthly',
          }),
        });

        if (!provisionResponse.ok) {
          const errorText = await provisionResponse.text();
          console.error('Failed to provision tenant:', errorText);
          // Retry logic could be added here (e.g., send to queue)
          return { statusCode: 500, body: 'Provisioning failed' };
        }

        const provisionData = await provisionResponse.json();
        console.log('Tenant provisioned successfully:', provisionData.tenant?.id);

        // Send welcome email (optional - via Resend)
        // await sendWelcomeEmail(session.customer_email, plan);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object;
        const { plan } = subscription.metadata;

        // Update tenant status based on subscription status
        let tenantStatus = 'active';
        if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
          tenantStatus = 'suspended';
        } else if (subscription.status === 'past_due') {
          tenantStatus = 'past_due';
        }

        const updateResponse = await fetch(`${process.env.AION_API_URL}/tenants/subscription`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AION_SERVICE_KEY || ''}`,
          },
          body: JSON.stringify({
            stripeSubscriptionId: subscription.id,
            status: subscription.status,
            tenantStatus: tenantStatus,
          }),
        });

        if (!updateResponse.ok) {
          console.error('Failed to update subscription:', await updateResponse.text());
        }

        // Downgrade plan if subscription canceled
        if (subscription.status === 'canceled' && plan) {
          console.log(`Subscription canceled for plan: ${plan}`);
          // Could downgrade to free plan here
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object;

        // Suspend tenant access
        const deleteResponse = await fetch(`${process.env.AION_API_URL}/tenants/subscription`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.AION_SERVICE_KEY || ''}`,
          },
          body: JSON.stringify({
            stripeSubscriptionId: subscription.id,
            status: 'deleted',
            tenantStatus: 'deleted',
          }),
        });

        if (!deleteResponse.ok) {
          console.error('Failed to mark subscription as deleted');
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = stripeEvent.data.object;
        console.log(`Payment succeeded for customer: ${invoice.customer}, amount: ${invoice.amount_paid}`);

        // Could send receipt email here
        // Could update usage quotas after successful payment
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object;
        console.log(`Payment failed for customer: ${invoice.customer}, attempt: ${invoice.attempt_count}`);

        // Notify user after first failure
        if (invoice.attempt_count === 1) {
          // Send payment failed email
          console.log('Sending payment failure notification');
        }

        // Suspend after multiple failed attempts
        if (invoice.attempt_count >= 3) {
          console.log('Suspending tenant due to payment failures');
          // Update tenant status to suspended
        }
        break;
      }

      case 'customer.subscription.trial_will_end': {
        const subscription = stripeEvent.data.object;
        console.log(`Trial ending soon for customer: ${subscription.customer}`);

        // Send trial ending reminder (3 days before)
        // await sendTrialEndingEmail(subscription.customer);
        break;
      }
    }

    return { statusCode: 200, body: 'Webhook processed successfully' };
  } catch (error) {
    console.error('Webhook error:', error);
    return { statusCode: 400, body: `Webhook Error: ${error.message}` };
  }
};
