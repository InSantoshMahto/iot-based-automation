let device = require('./device');

let iot = {};

iot.action = (req, res) => {
    let deviceName = req.params.deviceName;
    let deviceAction = req.body.deviceAction;
    let deviceType = req.body.deviceType;

    deviceName = deviceName != "undefined" && deviceName == 'deviceOne' || deviceName == 'deviceTwo' ? deviceName == 'deviceOne' ? 21 : 20 : 'other';
    deviceType = deviceType != "undefined" && deviceType == 'activeHigh' || deviceType == 'activeLow' ? deviceType : 'other';
    
    if (deviceType == 'activeHigh') {
        deviceAction = deviceAction != 'undefined' && deviceAction == 'on' || deviceAction == 'off' ? deviceAction == 'on'? 1 : 0 : 'other';
    } else {
        deviceAction = deviceAction != 'undefined' && deviceAction == 'on' || deviceAction == 'off' ? deviceAction == 'on'? 0 : 1 : 'other';
    } 

    console.log(`deviceType: ${deviceType}\tdeviceName: ${deviceName}\tdeviceAction: ${deviceAction}`);
    
    if (deviceName == 'other' || deviceAction == 'other' || deviceType == 'other') {
        res.status(400).send({status: {type: 'error', code: 400, msg: 'Bad request'}, msg: 'try again'});
    } else {
        device.gpio(deviceName, deviceAction,(err, status)=>{
            if (err) throw err;
            res.status(200).send({status: {type: 'success', code: 200, msg: 'ok'}, msg: 'enjoy'});
        });
    }
}

module.exports = iot;