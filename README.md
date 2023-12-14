## Vender

Welcome to vender.training development repository!

#### Setup and deployment

Below is a proof of concept how to set the project up and running on a Ubuntu instance. This can be modified to a better solution using docker and k8s in the future based on those commands.

##### Install nginx and certbot

```sh
sudo apt-get -y install nginx

# install certbot and get free ssl certificate
sudo apt-get -y install certbot
sudo service nginx stop
sudo certbot certonly --standalone -d vender.training
sudo service nginx start

# install unzip to quickly upload zip and unzip on the cloud
sudo apt-get -y install unzip

# set permission to deploy on some dirs
sudo chmod -R a+rwX /etc/letsencrypt
sudo chmod -R a+rwX /etc/nginx
sudo chmod -R a+rwX /var/www
```

##### Deploy frontend code and nginx config

```sh
bash scripts/deploy-react-app.sh
```

##### Install nodejs on

```sh
# first follow instruction in this link to install nvm
# https://github.com/nvm-sh/nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# install nodejs v16.18.1
# we can install newer versions, but need to test that version first on our local
nvm install v16.18.1

# install pnpm and pm2
npm i -g pnpm pm2
```

##### Run the TURN server

```sh
# install coturn
sudo apt-get -y update
sudo apt-get install coturn -y

# stop the default coturn service and start ours using pm2
sudo service coturn stop
pm2 start --name=turn "turnserver -a -v -n --no-dtls --no-tls -u USERNAME:PASSWORD -r 000"
pm2 save

# restart coturn if already started using pm2
pm2 restart turn
```

##### Run the nodejs server (socket io code in this repository)

```sh
# clone the repository if not yet
cd /var/www
git clone https://github.com/giveNZtake/Vender.git vender_source_code

# install dependencies and start the socket io server using pm2
cd /var/www/vender_source_code/server
pnpm i
pm2 start --name=vender .
pm2 save

# restart the socket io server if already started using pm2
pm2 restart vender
```

##### Resurrect pm2 in case the server restarted

```sh
sudo service coturn stop
pm2 resurrect
```

##### Debug and view log

```sh
pm2 list
# if the above setup correctly, you should see something like this
# ┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
# │ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
# ├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
# │ 0  │ turn               │ fork     │ 0    │ online    │ 0%       │ 11.3mb   │
# │ 1  │ vender             │ fork     │ 22   │ online    │ 0%       │ 174.6mb  │
# └────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘

# then to view log:
pm2 log vender
```

##### User action, event flow, logic

Initialize and prepare to join queue:

```
press button open webcam
-> call getUserMedia to get the webcam feed
-> start web socket
-> emit event "setInfo"
-> receive event "setInfoSuccess"
-> press button join queue
-> emit event "queue"
-> now in the queue on the server and user will be put in waiting
```

When the queue find match for 2 users:

```
receive event "match"
-> the first one will create a RTCPeerConnection and emit event "offer"
-> the second one receive that event "offer" then also create a RTCPeerConnection then emit event "answer"
-> during the exchange to initialize the peer to peer connection, there will be events "icecandidate" send back and forth, this is called ICE signaling
-> stream added to the handler and display on the UI
-> set connection status as success
```
