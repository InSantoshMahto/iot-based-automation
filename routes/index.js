const express = require('express');

let routes = express.Router();

let iot = require('../iot');

// for domain
let url = "";

// router middleware
routes.use((req, res, next) => {
    // to get domain 
    let host = req.hostname;
    let protocol = req.protocol;
    url = protocol + "://" + host;
    next();
});

// dashboard
routes.get('/', (req, res) => {
    console.log(`${url}`);
    res.send(url);
});

// ping
routes.get('/ping', (req, res) => {
    res.status(200).json({});
});

routes.post('/action/:deviceName', (req, res) => {
    iot.action(req, res);
});

// error 404
routes.all('/*', (req, res) => {
    console.log(`incoming data are:\t${req}`);
    res.status(404).json({
        status: {
            type: 'error',
            code: 404,
            msg: 'file not found'
        },
        msg: 'try again'
    });
});

module.exports = routes;