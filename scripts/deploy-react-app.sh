pnpm i && \
  scp server/nginx.conf vender.training:/etc/nginx/conf.d/vender.conf && \
  ssh vender.training "sudo service nginx restart" && \
  cd react-app && \
  yarn build && \
  mv build vender_react_app && \
  zip -vr vender_react_app.zip vender_react_app && \
  scp vender_react_app.zip vender.training:/var/www && \
  rm -rf vender_react_app* && \
  ssh vender.training "
    cd /var/www &&
    rm -rf vender_react_app &&
    unzip vender_react_app.zip &&
    rm -f vender_react_app.zip &&
    sudo service nginx restart
  ";
