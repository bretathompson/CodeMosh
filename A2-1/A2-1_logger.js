const EventEmitter = require('events');

class Logger extends EventEmitter {
   firstCatch(message) {
   console.log(message);
   this.emit('firstCatch', message);
   }

   secondCatch(message) {
    console.log(message);
    this.emit('secondCatch', message);
    }

   thirdCatch(message) {
    console.log(message);
    this.emit('thirdCatch', message);
    }
}

module.exports = Logger;
