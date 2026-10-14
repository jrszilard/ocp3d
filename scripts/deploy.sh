#!/usr/bin/env bash
# Deploy the site as committed (HEAD) to Cloudflare, built from a clean export of the repo, never
# from the working tree: a working-tree build also ships untracked pages' assets (2026-10-13, a
# local-only studio demo's script and stylesheet reached the test address that way).
#   scripts/deploy.sh             the site Worker (ocp3d)
#   scripts/deploy.sh redirects   the redirect Worker for the old hostnames (takes their DNS over)
set -euo pipefail
repo=$(git -C "$(dirname "$0")/.." rev-parse --show-toplevel)
out=$(mktemp -d)
trap 'rm -rf "$out"' EXIT
echo "deploying $(git -C "$repo" log --oneline -1 HEAD)"
git -C "$repo" archive HEAD | tar -x -C "$out"
cd "$out"
# With a system libvips installed (this workstation has one), sharp tries to compile itself
# against it instead of using its prebuilt binary, and the install fails.
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm ci --no-audit --no-fund
if [ "${1:-site}" = redirects ]; then
  npx wrangler deploy --config workers/redirects/wrangler.jsonc
else
  npm run build
  npx wrangler deploy
fi
