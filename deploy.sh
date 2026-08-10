#!/usr/bin/env bash
set -euo pipefail

# ============================================================
#  SNUC Orientation - VPS deployment script
#
#  Deploys the app to the server. Videos are served from
#  Cloudinary, so nothing large is synced.
#
#  Usage:
#    SERVER_HOST=user@your-server PORT=3000 ADMIN_PASSWORD=secret ./deploy.sh
#
#  Required env vars:
#    ADMIN_PASSWORD  Admin dashboard password (written to server .env)
#
#  Optional env vars:
#    SERVER_HOST     ssh target, e.g. user@1.2.3.4  (default: root@YOUR_IP)
#    SERVER_DIR      deploy path on the server (default: /opt/snuc-orientation)
#    PORT            server port (default: 3000)
# ============================================================

SERVER_HOST="${SERVER_HOST:-root@YOUR_SERVER_IP}"
SERVER_DIR="${SERVER_DIR:-/opt/snuc-orientation}"
PORT="${PORT:-3000}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:?Set ADMIN_PASSWORD env var}"

cd "$(dirname "$0")"

echo "==> Verifying local frontend build"
(cd frontend && npm install && npm run build)

echo "==> Creating deploy dir on server"
ssh "$SERVER_HOST" "mkdir -p '$SERVER_DIR'"

echo "==> Syncing code to server (node_modules/dist/db excluded)"
rsync -az --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'frontend/dist' \
  --exclude 'server/app.db' \
  --exclude 'server/app.db-shm' \
  --exclude 'server/app.db-wal' \
  --exclude 'server/.env' \
  ./ "$SERVER_HOST:$SERVER_DIR/"

echo "==> Installing deps, building, and writing env on server"
ssh "$SERVER_HOST" bash -s <<EOF
set -euo pipefail
cd "$SERVER_DIR"
(cd frontend && npm install --omit=dev && npm run build)
(cd server && npm install --omit=dev)
printf 'ADMIN_PASSWORD=%s\nPORT=%s\nCLOUDINARY_CLOUD_NAME=%s\n' "$ADMIN_PASSWORD" "$PORT" "${CLOUDINARY_CLOUD_NAME:-}" > server/.env
EOF

echo
echo "==========================================================="
echo " Deployed to $SERVER_HOST:$SERVER_DIR"
echo
echo " Start the server (once) and keep it running with pm2:"
echo "   ssh $SERVER_HOST"
echo "   cd $SERVER_DIR/server"
echo "   npm install -g pm2"
echo "   pm2 start server.js --name snuc-orientation"
echo "   pm2 save"
echo "   pm2 startup"
echo
echo " App:      http://<SERVER_IP>:$PORT"
echo " Admin:    http://<SERVER_IP>:$PORT/admin?password=\$ADMIN_PASSWORD"
echo "==========================================================="
