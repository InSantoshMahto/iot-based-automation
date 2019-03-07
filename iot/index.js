let device = require('./device');

const AUTH_KEY = '7788006653';

let iot = {}; 

// local api action
iot.action = (req, res) => {
    // validating headers 
    let device_key = req.headers.device_key;
    device_key = typeof (device_key) != 'undefined' ? device_key : false;

    // validating sender
    if (!device_key || device_key != AUTH_KEY) {
        res.status(401).send({
            status: {
                type: 'error',
                code: 401,
                msg: 'unauthorized'
            },
            msg: 'access is denied due to invalid credentials.'
        });
    } else {

        // collecting the data
        let deviceName = req.params.deviceName;
        let deviceAction = req.body.deviceAction;
        let deviceType = req.body.deviceType;
        iot.formate(device_key, deviceType, deviceName, deviceAction, (deviceType, deviceName, deviceAction, clientMsg) => {

            if (deviceName == 'other' || deviceAction == 'other' || deviceType == 'other') {
                // error response
                res.status(400).send({
                    status: {
                        type: 'error',
                        code: 400,
                        msg: 'Bad Request'
                    },
                    msg: clientMsg
                });
            } else {
                device.gpioWrite(deviceName, deviceAction, (err, status) => {
                    if (err) throw err;
                    res.status(200).send({
                        status: {
                            type: 'success',
                            code: 200,
                            msg: 'Ok'
                        },
                        msg: clientMsg
                    });
                });
            }
        })
    }
}

// io action
iot.action.device = (device_key, deviceType, deviceName, deviceAction, callback) => {
    device_key = typeof (device_key) != 'undefined' ? device_key : false;
	console.log(device_key);   
 if (!device_key || device_key != AUTH_KEY) {
	console.log('tested');
        return callback(false, `access is denied due to invalid credentials.`);
    } else {
        iot.formate(device_key, deviceType, deviceName, deviceAction, (deviceType, deviceName, deviceAction, clientMsg) => {
            if (deviceName == 'other' || deviceAction == 'other' || deviceType == 'other') {
                // error response
		console.log(error);
                return callback(false, clientMsg)
            } else {
                console.log(working);
                device.gpioWrite(deviceName, deviceAction, (err, status) => {
                    if (err) throw err;
                    return callback(false, clientMsg)
                });
            }
        })
    }
}

// formate
iot.formate = (device_key, deviceType, deviceName, deviceAction, callback) => {
    // formating the data
    deviceName = typeof (deviceName) != 'undefined' && deviceName == 'deviceOne' || deviceName == 'deviceTwo' ? deviceName == 'deviceOne' ? 21 : 20 : 'other';
    deviceType = typeof (deviceType) != 'undefined' && deviceType == 'activeHigh' || deviceType == 'activeLow' ? deviceType : 'other';

    // setting the IO value according to device type.
    if (deviceType == 'activeHigh') {
        deviceAction = typeof (deviceAction) != 'undefined' && deviceAction == 'on' || deviceAction == 'off' ? deviceAction == 'on' ? 1 : 0 : 'other';
    } else {
        deviceAction = typeof (deviceAction) != 'undefined' && deviceAction == 'on' || deviceAction == 'off' ? deviceAction == 'on' ? 0 : 1 : 'other';
    }

    // dynamic msg according to user data.
    let clientMsg = deviceType == 'activeHigh' || deviceType == 'activeLow' ? (deviceType == 'activeHigh' && deviceAction == 1) || (deviceType == 'activeLow' && deviceAction == 0) ? 'device is tern on' : 'device is tern off' : 'try again';
    // debugging
    console.log(`deviceKey: ${device_key}\tdeviceType: ${deviceType}\tdeviceName: ${deviceName}\tdeviceAction: ${deviceAction}`);

    return callback(deviceType, deviceName, deviceAction, clientMsg);
}

module.exports = iot;
