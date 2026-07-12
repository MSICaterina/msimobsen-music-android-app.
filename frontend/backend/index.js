const Stripe = require('stripe');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const secretClient = new SecretManagerServiceClient();

async function getStripeKey() {
  const [version] = await secretClient.accessSecretVersion({
    name: 'projects/YOUR_PROJECT_ID/secrets/stripe-secret-key/versions/latest',
  });
  return version.payload.data.toString();
}

exports.processGPayPayment = async (req, res) => {
  // CORS Headers
  res.set('Access-Control-Allow-Origin', 'https://msimobsen-30560796-7c5e1.web.app');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  try {
    const { token, amount, currency } = req.body;

    if (!token || !amount) {
      return res.status(400).send({ error: 'Missing payment token or amount' });
    }

    // Retrieve Stripe API Key securely
    const stripeApiKey = await getStripeKey();
    const stripe = Stripe(stripeApiKey);

    // Charge the Google Pay token (which represents the card)
    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100), // convert to cents
      currency: currency || 'cad',
      source: token.id, // The GPay token payload
      description: 'Msi Mobsen Music - GenAI Web3 Access Payout'
    });

    return res.status(200).send({ success: true, chargeId: charge.id });

  } catch (error) {
    console.error('Payment processing failed:', error);
    return res.status(500).send({ success: false, error: error.message });
  }
};
