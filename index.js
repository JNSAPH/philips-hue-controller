const axios = require('axios');
const colorconv = require('./colorConv')

var config;

module.exports.config = (OBJconfig) => {
    // Check if IP, Key are there
    if (typeof OBJconfig !== "object") throw new Error('Expected an Object! Check the Docs for more Information.')
    if (!OBJconfig.ip) throw new Error('Expected an Object with the IP of your Hue Bridge. Check the Docs for more Information.')
    if (!OBJconfig.key) throw new Error('Expected an Object with a Token for your Hue Bridge. Check the Docs for more Information.')

    // Check if IP Adress resolves

    // set 
    config = OBJconfig;
    return OBJconfig;
}


// Return Promise for Lights, Groups and Sensors
module.exports.getLights = () => {
    if (!config) throw new Error("Expected a configuration. Check the Docs for more Information");
    return axios.get("http://" + config.ip + "/api/" + config.key + "/lights")
}

module.exports.getGroups = () => {
    if (!config) throw new Error("Expected a configuration. Check the Docs for more Information");
    return axios.get("http://" + config.ip + "/api/" + config.key + "/groups")
}

module.exports.getSensors = () => {
    if (!config) throw new Error("Expected a configuration. Check the Docs for more Information");
    return axios.get("http://" + config.ip + "/api/" + config.key + "/sensors")
}

// Change Lamp State
module.exports.changeState = (lamp, state) => {
    if (!lamp || state == undefined) throw new Error("Expected a Lamp and a State Value. Check the Docs for more Information.");
    if (!config) throw new Error("Expected a configuration. Check the Docs for more Information");

    return axios({
        method: 'put',
        url: `http://${config.ip}/api/${config.key}/lights/${lamp}/state`,
        data: {
            "on": state
        }
    })
}

module.exports.changeBrightness = (lamp, bri) => {
    if (!lamp || !bri) throw new Error("Expected a Lamp and a Brightness Value. Check the Docs for more Information.");
    if (!config) throw new Error("Expected a configuration. Check the Docs for more Information");
    if (bri > 255 || bri < 0) throw new Error("Brightness Value must be between 0 and 255");

    return axios({
        method: 'put',
        url: `http://${config.ip}/api/${config.key}/lights/${lamp}/state`,
        data: {
            "bri": bri
        }
    })
}

module.exports.changeColor = (lamp, r, g, b) => {
    if (!lamp) throw new Error("Expected a Lamp and a Brightness Value. Check the Docs for more Information.");
    if (!config) throw new Error("Expected a configuration. Check the Docs for more Information");
    if (r > 255 || r < 0 || !r) throw new Error("Expected a R-Value. R-Value must be between 0 and 255");
    if (g > 255 || g < 0 || !g) throw new Error("Expected a G-Value. R-Value must be between 0 and 255");
    if (b > 255 || b < 0 || !b) throw new Error("Expected a B-Value. R-Value must be between 0 and 255");

    return axios({
        method: 'put',
        url: `http://${config.ip}/api/${config.key}/lights/${lamp}/state`,
        data: { "on": true, "xy": JSON.parse(colorconv.rgbtoxy(r, g, b)), "bri": colorconv.brightness(r, g, b) }
    })
}

