let device = require('./device');

let iot = {};

iot.action = (req, res) => {
    // TODO: perform action here
    let deviceName = req.params.deviceName;
    let deviceAction = req.body.deviceAction;
    device.gpioOut(21, 0,(err, status)=>{
        if (err) throw err;
        res.status(200).send(`${deviceName} : ${deviceAction}`);
    })
}

module.exports = iot;