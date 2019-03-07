let iot = require('../iot');

let socket = {};

socket.init = (io, callback)=>{
    // connected
    io.on('connect', ()=>{
        console.log(`connected from server.`);
    });

    // action
    io.on('action', (data) => {
        // TODO: action task
        let tested = JSON.stringify(data);
        console.log(`data: ${tested}`);

        iot.action.device(data.device_key, data.deviceType, data.deviceName, data.deviceAction, (err, clientMsg)=>{
            if (err) throw err;
            console.log(`msg emited`);
            io.emit('actionStatus', clientMsg)
        });
    });

    // disconnected
    io.on('disconnect', (reason) => {
        console.log(`disconnected from server. reason: ${reason}`);
    });
    
    return callback(false);
} 

module.exports = socket;