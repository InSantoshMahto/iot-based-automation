let iot = {};

iot.action = (req, res) => {
    // TODO: perform action here
    let deviceName = req.params.deviceName;
    let deviceAction = req.body.deviceAction;
    res.status(200).send(`${deviceName} : ${deviceAction}`);
}

module.exports = iot;