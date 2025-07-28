#!/usr/bin/env bash
set -e
REMOTE=root@128.199.120.243
APP_DIR=/var/www/vender_source_code

echo "🚀 Starting deployment to maturitymaxing.xyz..."

# 1. Build frontend locally
echo "📦 Building React app..."
pnpm install
cd react-app && pnpm build && cd ..
rm -rf vender_react_app
mv react-app/build vender_react_app
zip -qr vender_react_app.zip vender_react_app

# 2. Ship code & assets
echo "🚢 Deploying to server..."
scp -q vender_react_app.zip "$REMOTE":/var/www
ssh "$REMOTE" "
  cd $APP_DIR && git pull origin main && cd server && pnpm i && pm2 restart vender || \
  { pm2 start index.js --name vender; pm2 save; }
  cd /var/www && rm -rf vender_react_app && unzip -q vender_react_app.zip && rm vender_react_app.zip
  systemctl restart nginx
"

# 3. Cleanup
rm -rf vender_react_app vender_react_app.zip

echo '✅ Deployment complete! Check https://maturitymaxing.xyz' 