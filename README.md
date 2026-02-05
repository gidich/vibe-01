# Azure Functions v4 Monorepo (Node 22)

Minimal Azure Functions v4 monorepo with pnpm workspaces, TypeScript project references, ESM, and a single HTTP trigger.

## Prereqs
- Node.js 22
- Corepack (ships with Node)
- Azure Functions Core Tools v4 (global install recommended)
  - Example: `npm i -g azure-functions-core-tools@4 --unsafe-perm true`

## Install
`pnpm install`

## Local Dev
`pnpm dev`

This runs `tsc -b -w` and `func start --script-root packages/core-functions --worker-runtime node` concurrently.

## Commands
- `pnpm test`
- `pnpm biome:check`
- `pnpm knip`
- `pnpm build`

## Build Output
`pnpm build` produces `deploy/` with:
- `host.json`
- `package.json` (type: module)
- `dist/` (bundled ESM)
- `time/function.json`

## Deploy (ZIP)
Example with Azure CLI:

```bash
pnpm build
cd deploy
zip -r ../functionapp.zip .
cd ..

az functionapp deployment source config-zip \
  --resource-group <rg> \
  --name <function-app-name> \
  --src functionapp.zip
```

## HTTP Response
`GET /api/time` returns:

```json
{ "serverTime": "2026-02-05T12:00:00.000Z", "message": "ok" }
```
