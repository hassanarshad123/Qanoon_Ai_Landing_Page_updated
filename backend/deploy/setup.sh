#!/usr/bin/env bash
# ============================================================================
# QanoonAI Backend — EC2 First-Time Setup Script
# ============================================================================
#
# Prerequisites:
#   1. Launch an EC2 instance:
#      - AMI: Ubuntu 24.04 LTS (arm64 or amd64)
#      - Instance type: t3.small (2 vCPU, 2 GB RAM) — ~$15/mo
#      - Storage: 20 GB gp3
#      - Security group: open ports 22 (SSH), 80 (HTTP), 443 (HTTPS)
#
#   2. SSH into the instance:
#      ssh -i your-key.pem ubuntu@<public-ip>
#
#   3. Clone/upload the repo:
#      git clone <your-repo-url> /tmp/qanoonai
#
#   4. Run this script:
#      chmod +x /tmp/qanoonai/backend/deploy/setup.sh
#      sudo /tmp/qanoonai/backend/deploy/setup.sh
#
#   5. After the script completes:
#      - Copy .env.example to /home/qanoonai/backend/.env and fill in real values
#      - Start the service: sudo systemctl start qanoonai
#      - Get SSL: sudo certbot --nginx -d api.yourdomain.com
#      - Set FASTAPI_URL=https://api.yourdomain.com in Vercel dashboard
#
# ============================================================================

set -euo pipefail

# --- Color helpers ---
info()  { echo -e "\033[1;34m[INFO]\033[0m  $*"; }
ok()    { echo -e "\033[1;32m[OK]\033[0m    $*"; }
err()   { echo -e "\033[1;31m[ERROR]\033[0m $*" >&2; }

# --- Must run as root ---
if [[ $EUID -ne 0 ]]; then
    err "This script must be run as root (use sudo)."
    exit 1
fi

DEPLOY_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$(dirname "$DEPLOY_DIR")"
APP_HOME="/home/qanoonai"

info "Starting QanoonAI backend setup..."

# ============================================================================
# 1. System packages
# ============================================================================
info "Installing system packages..."
apt-get update -qq
apt-get install -y -qq \
    python3.12 \
    python3.12-venv \
    python3.12-dev \
    nginx \
    certbot \
    python3-certbot-nginx \
    git \
    build-essential

ok "System packages installed."

# ============================================================================
# 2. Create application user
# ============================================================================
if id "qanoonai" &>/dev/null; then
    info "User 'qanoonai' already exists, skipping."
else
    info "Creating system user 'qanoonai'..."
    useradd --system --create-home --shell /usr/sbin/nologin qanoonai
    ok "User 'qanoonai' created."
fi

# ============================================================================
# 3. Copy backend code
# ============================================================================
info "Copying backend code to ${APP_HOME}/backend..."
mkdir -p "${APP_HOME}/backend"
cp -r "${BACKEND_DIR}/app"              "${APP_HOME}/backend/"
cp    "${BACKEND_DIR}/requirements.txt" "${APP_HOME}/backend/"
cp    "${BACKEND_DIR}/gunicorn.conf.py" "${APP_HOME}/backend/"
cp    "${BACKEND_DIR}/.env.example"     "${APP_HOME}/backend/"
chown -R qanoonai:qanoonai "${APP_HOME}"

ok "Backend code copied."

# ============================================================================
# 4. Python virtual environment + dependencies
# ============================================================================
info "Creating Python virtual environment..."
sudo -u qanoonai python3.12 -m venv "${APP_HOME}/backend/venv"

info "Installing Python dependencies..."
sudo -u qanoonai "${APP_HOME}/backend/venv/bin/pip" install --quiet --upgrade pip
sudo -u qanoonai "${APP_HOME}/backend/venv/bin/pip" install --quiet -r "${APP_HOME}/backend/requirements.txt"

ok "Python environment ready."

# ============================================================================
# 5. Nginx configuration
# ============================================================================
info "Configuring nginx..."
cp "${DEPLOY_DIR}/nginx.conf" /etc/nginx/sites-available/qanoonai

# Remove default site if it exists
rm -f /etc/nginx/sites-enabled/default

# Enable our site
ln -sf /etc/nginx/sites-available/qanoonai /etc/nginx/sites-enabled/qanoonai

# Create certbot webroot
mkdir -p /var/www/certbot

# Test nginx config (will warn about missing SSL certs — that's expected pre-certbot)
info "Testing nginx config (SSL warnings are expected before certbot runs)..."
nginx -t 2>&1 || true

ok "Nginx configured."

# ============================================================================
# 6. Systemd service
# ============================================================================
info "Installing systemd service..."
cp "${DEPLOY_DIR}/qanoonai.service" /etc/systemd/system/qanoonai.service
systemctl daemon-reload
systemctl enable qanoonai

ok "Systemd service installed and enabled."

# ============================================================================
# Done
# ============================================================================
echo ""
echo "=============================================="
echo "  QanoonAI backend setup complete!"
echo "=============================================="
echo ""
echo "Next steps:"
echo ""
echo "  1. Create the .env file:"
echo "     sudo cp ${APP_HOME}/backend/.env.example ${APP_HOME}/backend/.env"
echo "     sudo nano ${APP_HOME}/backend/.env"
echo "     sudo chown qanoonai:qanoonai ${APP_HOME}/backend/.env"
echo "     sudo chmod 600 ${APP_HOME}/backend/.env"
echo ""
echo "  2. Update nginx server_name in /etc/nginx/sites-available/qanoonai"
echo "     Replace 'api.yourdomain.com' with your actual domain."
echo ""
echo "  3. Start the service:"
echo "     sudo systemctl start qanoonai"
echo "     sudo systemctl status qanoonai"
echo ""
echo "  4. Get SSL certificate (after DNS points to this server):"
echo "     sudo certbot --nginx -d api.yourdomain.com"
echo ""
echo "  5. Set in Vercel dashboard:"
echo "     FASTAPI_URL=https://api.yourdomain.com"
echo ""
echo "  6. Verify:"
echo "     curl https://api.yourdomain.com/api/v1/health"
echo ""
