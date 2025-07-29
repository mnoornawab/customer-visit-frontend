# Customer Visit Management Frontend

A React web app for logging sales rep visits to customers, integrated with a Google Sheets backend via Google Apps Script.

## Features

- Sales rep selection (dropdown)
- Loads assigned customers
- Visit form (brands, units, notes, follow-up)
- Supports adding new customers
- Shows last visit date
- Deployable to GitHub Pages

## Setup

1. Clone this repo.
2. Run `npm install`.
3. Set your backend API URL in `src/api.js` (replace `YOUR_APPS_SCRIPT_WEB_APP_URL`).
4. Run locally: `npm start`.
5. Deploy to GitHub Pages:
   - Build: `npm run build`
   - Push `/build` to your `gh-pages` branch or configure as per [GitHub Pages docs](https://create-react-app.dev/docs/deployment/#github-pages).

## Backend Integration

- The backend should be a Google Apps Script Web App that exposes endpoints for:
  - `getMetaData`
  - `getCustomersByRep`
  - `getCustomerLastVisit`
  - `recordVisit`

---

**Maintained by [YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)**# customer-visit-frontend
