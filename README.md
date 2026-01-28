

A simple Pastebin-like application built with Next.js.

## Features
- Create and share text pastes
- Optional time-to-live (TTL)
- Optional view limits
- Safe rendering
- Deterministic expiry testing

## Tech Stack
- Next.js (App Router)
- Node.js
- Vercel KV (Redis)

## Persistence Layer
Vercel KV is used for persistence to ensure data survives across serverless requests and supports atomic updates.

## Running Locally

```bash
npm install
npm run dev
