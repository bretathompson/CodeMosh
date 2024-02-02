const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
   const firstCatch = (message) => {
   console.log(message);
   }

   const secondCatch = (message) => {
    console.log(message);
    }

   cosnt thirdCatch = (message) => {
    console.log(message);
    }
}

module.exports = Logger;



// A2-1_logger.js

// 1. Include a class named 'Logger' which utilizes the Node events module. The purpose of the class is to log a message to the 
//     console indicating which event is being listened to and to fire the corresponding event
//     A. Inside the Logger class, include 3 new modules named 'firstCatch', 'secondCatch', and 'thirdCatch'. Each module will 
//         have a parameter named 'message'. Each module will log the message parameter to the console. The message parameter will 
//         be populated in app.js to log to the console which listener is being called.
//     B. Each module in the class will fire an event. The events will also be named 'firstCatch', 'secondCatch', and 'thirdCatch' 
//         and correspond to the correct module
// 2. Don't forget to export the Logger class so it can be used in the A2-1_app.js file
// 
// When finished your CMD assignment should look like this:
// Calling First Listener...
// First Listener Called!

// Calling Second Listener...
// Second Listener Called!

// Calling Third Listener...
// Third Listener Called!
