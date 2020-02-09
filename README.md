# Serverless-Websockets-Lambda-NodeJs
An example of a websocket server built on top of serverless AWS Lambda!

## Running Locally

Indeed, the great serverless-offline library that I love for testing serverless REST backends locally  works for websockets too!

Please use node v12
```
nvm use v12
```

Install dependencies:
```
npm i
```

start serverless-offline:
```
npm start
```

then you can connect through the terminal like so:
```
wscat -c ws://localhost:3001
```

Once connected, send a message!
```
{"action": "foo", "data": {"oh":"yeahhhh"}}
```

Deploy:
```
serverless deploy
```