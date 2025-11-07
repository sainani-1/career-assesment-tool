# Vercel deployment

This repository is set up with a GitHub Actions workflow that builds the Vite app and deploys it to Vercel on pushes to `main`.

Required repository secrets (add in GitHub Settings → Secrets → Actions):

- `VERCEL_TOKEN` — a Vercel Personal Token (create at https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` (optional but recommended) — your Vercel organization ID
- `VERCEL_PROJECT_ID` (optional but recommended) — your Vercel project ID

How it works:

1. Push to `main` triggers the workflow in `.github/workflows/vercel-deploy.yml`.
2. The job runs `npm ci` and `npm run build` to produce the `dist/` output.
3. The workflow then calls the Vercel Action to deploy the built output to your Vercel project using the token/secrets above.

Alternative (GUI):

You can also import this GitHub repository directly from the Vercel dashboard (https://vercel.com/import) and Vercel will connect and deploy on pushes automatically.
