const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const socketIO = require('socket.io-client');
const io = socketIO('http://192.168.43.111');
const cors = require('cors');
const path = require('path');

let root = require('./routes');
let socket = require('./socket');

const app = express();

const PORT = process.env.PORT || 80;

/**
 * middleware
 */

//logger i.e, morgan
app.use(logger('dev'));

// cors 
app.use(cors());

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

// serve static file
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));

// Routes
app.use('/', root);

// listen port
app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);

    // socket
    socket.init(io, (err) => {
        if (err) throw err;
        console.log(`socket started.`);
    })
});