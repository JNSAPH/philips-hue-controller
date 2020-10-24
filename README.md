<p align="center">
      <img src="https://raw.githubusercontent.com/JNSAPH/Hue-Controller/master/assets/Logos/logo.png" width="80">
  <h1 align="center">
    philips-hue-controller
  </h1>
</p>

I wanted to build an Application to controll my Hue Lamps from my PC and got fed up with there not being a good Package to help me build it. Building everything from scratch took forever and i want to save other people from having to do this. 

<br>

## Features
* Set Lamp Colors using RGB instead of XY / Hue
* Use Promises or Async/Await
* Easy to use and setup

<br>

## Getting your Bridges IP and generating a Username
Read the Offical Meethue Developer Documentation for a complete explanation: https://developers.meethue.com/develop/get-started-2/

**IP-Adress:**<br>
Go to https://discovery.meethue.com/ to see your Bridges IP-Adress

**Username:**<br>
Follow the Steps under: https://developers.meethue.com/develop/get-started-2/#so-lets-get-started

<br>

## Installation
```
npm install philips-hue-controller
```

---
<br>


## Examples
### Inital Setup
```js
const hue = require('philips-hue-controller');

hue.config({
    "ip":"YOUR-BRIDGES-IP-ADRESS",
    "key":"YOUR-GENERATED-USERNAME"
});
```

### List of Lamps, Groups and Sensors
```js
const hue = require('philips-hue-controller');

hue.config({
    "ip":"YOUR-BRIDGES-IP-ADRESS",
    "key":"YOUR-GENERATED-USERNAME"
});

// Lamps
hue.getLights().then((resp) => {
    console.log(resp.data) // Returns Object with all Lamps 
})

// Groups
hue.getGroups().then((resp) => {
    console.log(resp.data) // Returns Object with all Lamps 
})

// Sensors
hue.getSensors().then((resp) => {
    console.log(resp.data) // Returns Object with all Lamps 
})
```
<br>

### Change State of individual Lights
```js
const hue = require('philips-hue-controller');

hue.config({
    "ip":"YOUR-BRIDGES-IP-ADRESS",
    "key":"YOUR-GENERATED-USERNAME"
});

// Change State
/*
    [9] -> LampID | ID of the Lamp
    [true] -> State | Can be either true or false. true: on, false: off 
*/
hue.changeState(9, true);



// Change Brightness
/*
    [9] -> LampID | ID of the Lamp
    [125] -> Brightness | An Integer from 0-255 
*/
hue.changeState(9, 125);



// Change Color / Hue using RGB
/*
    [9] -> LampID | ID of the Lamp
     R   [103] -> R-Value | Change the Color of the Lamp.
     G   [227] -> G-Value | Change the Color of the Lamp.
     B   [222] -> B-Value | Change the Color of the Lamp.
    ---
    TThis function will change the Brightness of the Bulb according to the Color provided.

*/
hue.changeColor(9, 103, 227, 222);
```

## Tutorials
If you made a Tutorial on how to use this Package please DM me on [Twitter](https://twitter.com/JNSAPH) to have your Video displayed here.

<br>

## Credits
Philips-Hue-Controller is using [axios](https://www.npmjs.com/package/axios) for API calls.

<br>

## License
This Project is licensed under the [MIT License](https://github.com/JNSAPH/philips-hue-controller/blob/master/LICENSE)