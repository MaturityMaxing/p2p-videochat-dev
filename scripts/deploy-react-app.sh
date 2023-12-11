pnpm i && \
  scp server/nginx.conf vender-ec2:/etc/nginx/conf.d/vender.conf && \
  ssh vender-ec2 "sudo service nginx restart" && \
  cd react-app && \
  yarn build && \
  mv build vender && \
  zip -vr vender.zip vender && \
  scp vender.zip vender-ec2:/var/www && \
  rm -rf vender* && \
  ssh vender-ec2 "
    cd /var/www &&
    rm -rf vender &&
    unzip vender.zip &&
    rm -f vender.zip &&
    sudo service nginx restart
  ";
