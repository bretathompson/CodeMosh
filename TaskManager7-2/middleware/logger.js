const eventEmitter = require('events');

class TestApplication extends eventEmitter {
    logApplication(message) {
        setTimeout(() => { 
            this.emit('logApplication', message);
            console.log(message);
        }, 500);
    }
}

module.exports = new TestApplication();
