# Shan Loray Beauty E-commerce

A modern beauty e-commerce platform built with React, Vite, Supabase, and Stripe.

## Development

To run this application, you need to start both the frontend dev server and the API server:

### Terminal 1: Start the API server
```bash
npm run server
```

### Terminal 2: Start the Vite dev server
```bash
npm run dev
```

The API server runs on `http://localhost:3001` and handles Stripe payment processing.
The Vite dev server runs on `http://localhost:5173` and serves the React application.

## Environment Variables

Make sure your `.env` file contains:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key (for API server)

## Build

```bash
npm run build
```
