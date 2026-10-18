-- AI FACTORY Razorpay TEST MODE only.
-- Apply only to a dedicated AI FACTORY Cloudflare D1 database.
-- This schema does not enable live payments or seller payouts.
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS payment_orders (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL UNIQUE,
  product_id TEXT NOT NULL CHECK (product_id = 'test-item'),
  amount_paise INTEGER NOT NULL CHECK (amount_paise = 100),
  currency TEXT NOT NULL CHECK (currency = 'INR'),
  status TEXT NOT NULL CHECK (status IN ('creating','created','authorized','captured','failed')),
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT UNIQUE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_payment_orders_status_created ON payment_orders(status, created_at);
CREATE TABLE IF NOT EXISTS razorpay_webhook_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  received_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
