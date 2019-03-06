<<<<<<< HEAD
const five = require('johnny-five');

let device = {};

device.gpioOut = (pin, (err, ststus)=>{
    // TOD: five task
    let board = new five.Board({
        io: new Raspi()
    });

    board.on("ready", function () {
        let led = new five.Led("P1-13");
        led.blink();
    });
})

module.exports = device;

 
=======
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
>>>>>>> refs/remotes/origin/master
