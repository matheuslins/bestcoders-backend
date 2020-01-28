const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes')
const http = require('http');
const { setupWebsocket } = require('./websocket');
const dotenv = require('dotenv').config()


const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(dotenv.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(dotenv.PORT || 3000);

