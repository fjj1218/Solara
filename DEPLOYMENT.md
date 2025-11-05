# Deploying Solara to Cloudflare Pages

This project is designed to run as a static Cloudflare Pages site with Pages Functions. Follow the steps below to ensure the deployment passes platform checks and exposes the `/health` endpoint for monitoring.

## Cloudflare Pages project settings

When creating or updating the Pages project in the Cloudflare dashboard:

- **Framework preset:** `None`
- **Build command:** `true`
  - A build step is not required; the existing assets are served as-is.
- **Build output directory:** `.`
- **Functions directory:** `functions`

> ⚠️ Do **not** use `wrangler deploy` for this project. All deployments should be triggered via Git commits connected to the Pages project. Using `wrangler deploy` will bypass the expected Pages pipeline and may fail platform checks.

## Health check endpoint

After deployment, Cloudflare Pages will serve `GET /health`, returning:

```json
{ "ok": true, "time": "<ISO timestamp>" }
```

You can use this endpoint to verify that Pages Functions are active and responding. The response is intentionally uncached.

## Local preview

A `wrangler.jsonc` file is included for local development. To preview the site with Pages Functions locally:

```bash
wrangler pages dev
```

Wrangler will serve the static assets from the repository root and mount the functions from the `functions` directory. Visit <http://localhost:8788/health> to test the health check while running locally.

## Troubleshooting

- **404 on `/health`:** Ensure the deployment includes the latest code from this repository and that Pages Functions are enabled for the project.
- **Functions not executing locally:** Confirm you are running `wrangler pages dev` from the repository root so it picks up `wrangler.jsonc`.
- **Unexpected build step executions:** Double-check that the Pages project uses the `true` build command and `.` as the output directory; other settings may cause Cloudflare to expect a build artifact that is not produced.
