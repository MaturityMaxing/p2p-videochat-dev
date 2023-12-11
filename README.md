### Vender

##### Install nodejs

```sh
# first follow instruction in this link to install nvm
# https://github.com/nvm-sh/nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

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

# start coturn using pm2
pm2 start --name=turn "turnserver -a -v -n --no-dtls --no-tls -u USERNAME:PASSWORD -r 000"

# restart coturn if already started using pm2
pm2 restart turn
```

##### Run the nodejs server (socket io code in this repository)

```sh
# clone the repository if not yet
cd /var/www
git clone https://github.com/giveNZtake/Vender.git

# start the socket io server using pm2
cd /var/www/Vender/server
pm2 start --name=vender .

# restart the socket io server if already started using pm2
pm2 restart vender
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
