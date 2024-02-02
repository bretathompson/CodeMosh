const EventEmitter = require('events');
const fs = require('fs');

class TestApplication extends EventEmitter {
    loadApplication(message) {
        console.log(message);
        this.emit('loadApplication', message);
    }
}

module.exports = TestApplication;

