const express = require('express');
const cors = require('cors');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { BigQuery } = require('@google-cloud/bigquery');
const Stripe = require('stripe');
const { google } = require('googleapis');

const app = express();
app.use(cors());
app.use(express.json());

const secretClient = new SecretManagerServiceClient();
const bqClient = new BigQuery();

async function getStripeKey() {
 const [version] = await secretClient.accessSecretVersion({
  name: 'projects/feisty-port-483522-q0/secrets/stripe-secret-key/versions/latest',
 });
 return version.payload.data.toString();
}

app.post('/api/payout', async (req, res) => {
 try {
  const { token, amount, currency } = req.body;
   
  // 1. Fetch Stripe key securely
  const [version] = await secretClient.accessSecretVersion({
   name: 'projects/feisty-port-483522-q0/secrets/stripe-secret-key/versions/latest',
  });
  const stripe = Stripe(version.payload.data.toString());

  // 2. Charge the Google Pay token
  const charge = await stripe.charges.create({
   amount: Math.round(amount * 100),
   currency: currency || 'cad',
   source: token.id,
   description: 'Msi Mobsen Music Payout'
  });

  // 3. Log to BigQuery
  await bqClient.dataset('ad_revenues').table('payout_history').insert([{
   payout_id: charge.id,
   amount: amount,
   timestamp: new Date().toISOString(),
   merchant_id: 'BCR2DN6D7KB2RK3J',
   status: 'SUCCESS'
  }]);

  res.status(200).json({ success: true, chargeId: charge.id });
 } catch (err) {
  console.error('Payment processing failed:', err);
  res.status(500).json({ success: false, error: err.message });
 }
});

app.post('/sync', async (req, res) => {
 try {
  // 1. Authenticate with Google
  const auth = new google.auth.GoogleAuth({
   scopes: ['https://www.googleapis.com/auth/adsense.readonly']
  });
  const authClient = await auth.getClient();
  const adsense = google.adsense({ version: 'v2', auth: authClient });

  // 2. Pull daily report (for pub-9501043041040319)
  const report = await adsense.accounts.reports.generate({
   account: 'accounts/pub-9501043041040319',
   dateRange: 'LAST_30_DAYS',
   metrics: ['ESTIMATED_EARNINGS', 'IMPRESSIONS', 'CLICKS'],
   dimensions: ['DATE']
  });

  if (!report.data.rows) {
   return res.status(200).send("No report data available for the last 30 days.");
  }

  // 3. Process and write rows to BigQuery
  const rows = report.data.rows.map(row => ({
   date: row.cells[0].value,
   earnings: parseFloat(row.cells[1].value) || 0.0,
   impressions: parseInt(row.cells[2].value) || 0,
   clicks: parseInt(row.cells[3].value) || 0,
   publisher_id: "pub-9501043041040319"
  }));

  await bqClient.dataset('ad_revenues').table('daily_earnings').insert(rows);
  res.status(200).send("Sync Successful");
 } catch (err) {
  console.error("Sync Error:", err);
  res.status(500).send(err.message);
 }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
