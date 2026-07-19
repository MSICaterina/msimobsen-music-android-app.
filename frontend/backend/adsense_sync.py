import os
from flask import Flask, request
from googleapiclient.discovery import build
from google.cloud import bigquery
import google.auth

app = Flask(__name__)

@app.route('/sync', methods=['POST'])
def sync():
  try:
    # 1. Authenticate
    credentials, project = google.auth.default()
    service = build('adsense', 'v2', credentials=credentials)

    # 2. Fetch Report for your Publisher ID
    account_name = 'accounts/pub-9501043041040319'
    report = service.accounts().reports().generate(
      account=account_name,
      dateRange='LAST_30_DAYS',
      metrics=['ESTIMATED_EARNINGS', 'IMPRESSIONS', 'CLICKS'],
      dimensions=['DATE']
    ).execute()

    # 3. Process Rows
    rows_to_insert = []
    for row in report.get('rows', []):
      rows_to_insert.append({
        "date": row['cells'][0]['value'],
        "earnings": float(row['cells'][1]['value']),
        "impressions": int(row['cells'][2]['value']),
        "clicks": int(row['cells'][3]['value']),
        "publisher_id": "pub-9501043041040319"
      })

    # 4. Write to BigQuery
    bq_client = bigquery.Client()
    table_id = "feisty-port-483522-q0.ad_revenues.daily_earnings"
    errors = bq_client.insert_rows_json(table_id, rows_to_insert)

    if not errors:
      return "Sync Successful", 200
    else:
      return f"BigQuery Errors: {errors}", 500

  except Exception as e:
    print(f"Error: {str(e)}")
    return f"Internal Error: {str(e)}", 500

if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
