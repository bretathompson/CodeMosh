const fs = require('fs');
const TestApplication = require('./logger');

const testapplication = new TestApplication();

testapplication.on('loadApplication', (message) => {
    fs.appendFile('logger.txt', message, (err) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('Finished!');
        }
    });
});

testapplication.loadApplication('Application is loading...');
