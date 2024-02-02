
const Logger = require('./A2-1_logger.js');

const logger = new Logger();

logger.on('firstCatch', (message) => {
    console.log('First Listener Called!\n');
    console.log(message);
});
logger.on('secondCatch', (message) => {
    console.log('Second Listener Called!\n');
    console.log(message);
});
logger.on('thirdCatch', (message) => {
    console.log('Third Listener Called!\n');
    console.log(message);
});

logger.firstCatch('Calling First Listener...');
logger.secondCatch('Calling First Listener...');
logger.thirdCatch('Calling First Listener...');
