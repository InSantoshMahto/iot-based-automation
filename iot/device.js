const Gpio = require('onoff').Gpio;

let device = {};

device.gpioOut = (pin, set, callback) =>{
    const led = new Gpio(pin, 'out');
    led.write(set, (err)=>{
        if (err) throw err;
        console.log('object');
    });
    return callback(null, true);
}

module.exports = device;o
