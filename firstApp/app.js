
// function sayHello(name) {
//     console.log('hello + name');
// }
// sayHello('Mosh');



// const log = require('./logger');
// log('message');




// const path = require('path');
// var pathObj = path.parse(_filename);
// console.log(pathObj);



// const os = require('os');
// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();
// // console.log('Total Memory: ' + totalMemory);
// console.log(`Total Memory: ${totalMemory}`);
// console.log(`Free Memory: ${freeMemory}`);



// const fs = require('fs');
// // const files = fs.readdirSync('./');
// // console.log(files);

// fs.readdir('./', function(err, files) {
//     if(err) console.log('Error', err);
//     else console.log('Result', files);
// });



// const EventEmitter = require('events');

// const Logger = require('./logger');
// const Logger = new Logger();

// // register a listener
// logger.on('messageLogged', (arg) => {
//     console.log('Listener Called', arg);
// });

// logger.log('message');



const http = require('http');
const server = http.createServer((req, res)  => {
    if(req.url === '/') {
        res.write('Hello World');
        res.end();
    }
    if(req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});
server.listen(3000);

console.log('Listening on port 3000...');

