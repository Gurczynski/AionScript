import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Check,
  X,
  Zap,
  Database,
  Users,
  Shield,
  Globe,
  Headphones,
} from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'For experiments and small projects',
    price: 0,
    priceId: null,
    features: [
      { text: '10 Tables', included: true },
      { text: '1,000 Rows', included: true },
      { text: '100 MB Storage', included: true },
      { text: 'Basic Auth', included: true },
      { text: 'Vector Search', included: false },
      { text: 'Real-time', included: false },
      { text: 'Custom Domain', included: false },
      { text: 'Priority Support', included: false },
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For production applications',
    price: 25,
    priceId: import.meta.env.VITE_STRIPE_PRO_PRICE_ID,
    features: [
      { text: '100 Tables', included: true },
      { text: '1M Rows', included: true },
      { text: '10 GB Storage', included: true },
      { text: 'Advanced Auth', included: true },
      { text: 'Vector Search (384d)', included: true },
      { text: 'Real-time', included: true },
      { text: 'Custom Domain', included: false },
      { text: 'Priority Support', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'team',
    name: 'Team',
    description: 'For teams and growing businesses',
    price: 149,
    priceId: import.meta.env.VITE_STRIPE_TEAM_PRICE_ID,
    features: [
      { text: 'Unlimited Tables', included: true },
      { text: '10M Rows', included: true },
      { text: '100 GB Storage', included: true },
      { text: 'SSO/SAML', included: true },
      { text: 'Vector Search (1536d)', included: true },
      { text: 'Real-time + Presence', included: true },
      { text: 'Custom Domain', included: true },
      { text: 'Priority Support', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large-scale deployments',
    price: 500,
    priceId: null,
    features: [
      { text: 'Unlimited Everything', included: true },
      { text: 'Unlimited Rows', included: true },
      { text: 'Unlimited Storage', included: true },
      { text: 'Dedicated Resources', included: true },
      { text: 'Custom Vectors', included: true },
      { text: 'Real-time + Broadcasting', included: true },
      { text: 'Custom Domain + SSL', included: true },
      { text: 'Dedicated Support', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(null);

  const handleSubscribe = async (plan) => {
    if (plan.price === 0) {
      // Create free tenant directly
      window.location.href = '/signup?plan=free';
      return;
    }

    if (!plan.priceId) {
      // Enterprise - contact sales
      window.location.href = '/beta';
      return;
    }

    setLoading(plan.id);

    try {
      const stripe = await stripePromise;
      
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.priceId,
          plan: plan.id,
          billingCycle,
        }),
      });

      const { sessionId } = await response.json();
      
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) console.error(error);
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include AI-native features.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl bg-white dark:bg-gray-800 shadow-lg border-2 transition-all ${
                plan.popular
                  ? 'border-blue-500 scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    ${billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  } disabled:opacity-50`}
                >
                  {loading === plan.id ? 'Processing...' : plan.cta}
                </button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 p-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-400 dark:text-gray-500 line-through'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Compare Plans
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-8 py-4 text-sm font-medium text-gray-500 uppercase">
                    Feature
                  </th>
                  <th className="text-center px-8 py-4 text-sm font-medium text-gray-500 uppercase">
                    Free
                  </th>
                  <th className="text-center px-8 py-4 text-sm font-medium text-gray-500 uppercase">
                    Pro
                  </th>
                  <th className="text-center px-8 py-4 text-sm font-medium text-gray-500 uppercase">
                    Team
                  </th>
                  <th className="text-center px-8 py-4 text-sm font-medium text-gray-500 uppercase">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Tables', free: '10', pro: '100', team: '∞', enterprise: '∞' },
                  { feature: 'Rows', free: '1K', pro: '1M', team: '10M', enterprise: '∞' },
                  { feature: 'Storage', free: '100 MB', pro: '10 GB', team: '100 GB', enterprise: '∞' },
                  { feature: 'Vector Search', free: false, pro: true, team: true, enterprise: true },
                  { feature: 'Real-time', free: false, pro: true, team: true, enterprise: true },
                  { feature: 'Custom Domain', free: false, pro: false, team: true, enterprise: true },
                  { feature: 'SSO/SAML', free: false, pro: false, team: true, enterprise: true },
                  { feature: 'Priority Support', free: false, pro: false, team: true, enterprise: true },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="px-8 py-4 text-sm text-gray-900 dark:text-white font-medium">
                      {row.feature}
                    </td>
                    <td className="px-8 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      {typeof row.free === 'boolean' ? (row.free ? <Check className="w-5 h-5 text-green-500 inline" /> : <X className="w-5 h-5 text-gray-300 inline" />) : row.free}
                    </td>
                    <td className="px-8 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      {typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-5 h-5 text-green-500 inline" /> : <X className="w-5 h-5 text-gray-300 inline" />) : row.pro}
                    </td>
                    <td className="px-8 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      {typeof row.team === 'boolean' ? (row.team ? <Check className="w-5 h-5 text-green-500 inline" /> : <X className="w-5 h-5 text-gray-300 inline" />) : row.team}
                    </td>
                    <td className="px-8 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
                      {typeof row.enterprise === 'boolean' ? (row.enterprise ? <Check className="w-5 h-5 text-green-500 inline" /> : <X className="w-5 h-5 text-gray-300 inline" />) : row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Can I upgrade or downgrade anytime?',
                a: 'Yes! You can change your plan at any time. When upgrading, you\'ll be prorated for the remainder of your billing period.',
              },
              {
                q: 'What happens if I exceed my plan limits?',
                a: 'We\'ll send you an email notification. You can either upgrade your plan or reduce usage. We won\'t automatically charge you or cut off service immediately.',
              },
              {
                q: 'Is there a free trial for paid plans?',
                a: 'Yes! Pro and Team plans come with a 14-day free trial. No credit card required to start.',
              },
              {
                q: 'Can I use my own domain?',
                a: 'Custom domains are available on Team and Enterprise plans. We handle SSL certificates automatically via Let\'s Encrypt.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
