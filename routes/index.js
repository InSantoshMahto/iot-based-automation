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
    res.send("<h1 style='text-align:center;'><a style='text-decoration: none;'o href='https://github.com/insantoshmahto/iot-based-automation' target='_blank'>InSantoshMahto</a></h1>");
});

// ping
routes.get('/ping', (req, res) => {
    res.status(200).json({
        status: {
            type: 'success',
            code: 200,
            msg: 'ok'
        },
        msg: 'rocks'
    });
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
            msg: 'not found'
        },
        msg: 'you are trying to access the file tha is not present. make sure you are asking for right file and try again.'
    });
});

module.exports = routes;