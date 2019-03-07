const Gpio = require('onoff').Gpio;

let device = {};

device.gpioWrite = (pin, set, callback) => {
    const led = new Gpio(pin, 'out');
    led.write(set, (err) => {
        if (err) throw err;
        console.log(`pin: ${pin}\tset: ${set}`);
    });
    return callback(null, true);
}

module.exports = device;