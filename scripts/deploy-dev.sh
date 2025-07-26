#!/usr/bin/env bash
set -e
REMOTE=root@152.42.172.207
APP_DIR=/var/www/vender_source_code

echo "🚀 Deploying to DEV..."
pnpm install
cd react-app && DISABLE_ESLINT_PLUGIN=true pnpm build && cd ..
rm -rf vender_react_app
mv react-app/build vender_react_app
zip -qr vender_react_app.zip vender_react_app

scp -q vender_react_app.zip "$REMOTE":/var/www
ssh "$REMOTE" "
  cd $APP_DIR && git pull origin main && cd server && pnpm i && pm2 restart vender || \
  { pm2 start index.js --name vender; pm2 save; }
  cd /var/www && rm -rf vender_react_app && unzip -q vender_react_app.zip && rm vender_react_app.zip
  systemctl restart nginx
"
rm -rf vender_react_app vender_react_app.zip
echo '✅ DEV deployment complete!  https://dev.maturitymaxing.xyz'
