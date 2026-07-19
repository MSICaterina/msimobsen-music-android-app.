#!/bin/bash

# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com

# Create Pub/Sub topic for ad events
gcloud pubsub topics create ad-events

# Create BigQuery dataset for ad revenues
gcloud bigquery datasets create ad_revenues

# Create Redis instance for ad caching
gcloud redis instances create ad-cache --region=us-central1 --size=1

# Create Secret for Stripe API Key
gcloud secrets create stripe-secret-key

# Create Cloud Scheduler job for daily AdSense sync
gcloud scheduler jobs create http adsense-sync-job \
  --location=us-central1 \
  --schedule="0 0 * * *" \
  --uri="https://ad-exchange-service-feisty-port-483522-q0.run.app" \
  --http-method=POST \
  --oidc-service-account-email="<SERVICE_ACCOUNT_EMAIL>" \
  --oidc-token-audience="https://ad-exchange-service-feisty-port-483522-q0.run.app"

# Deploy the AdSense Sync Service to Cloud Run
gcloud run deploy adsense-sync-service \
  --source . \
  --region us-central1 \
  --service-account ad-revenue-backend-sa@feisty-port-483522-q0.iam.gserviceaccount.com \
  --no-allow-unauthenticated

# Update Cloud Scheduler job with correct URI and Service Account
gcloud scheduler jobs update http adsense-sync-job \
  --location=us-central1 \
  --uri="https://genai-app-msimobsenmusic-1-1783599542654-762658008656.us-central1.run.app/sync" \
  --oidc-service-account-email="ad-revenue-backend-sa@feisty-port-483522-q0.iam.gserviceaccount.com" \
  --oidc-token-audience="https://genai-app-msimobsenmusic-1-1783599542654-762658008656.us-central1.run.app"
