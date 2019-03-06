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

