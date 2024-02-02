
const http = require('http');
const server = http.createServer((req, res)  => {
    if(req.url === '/') {
        res.write('Calling First Listener...  (/n) First Listener Called!');
        res.end();
    }
    if(req.url === '/') {
        res.write('Calling Second Listener...  (/n) Second Listener Called!');
        res.end();
    }
    if(req.url === '/') {
        res.write('Calling Third Listener...  (/n) Third Listener Called!');
        res.end();
    }
});
server.listen(3000);

console.log('Listening on port 3000...');



// A2-1_app.js:

// 1. Include the Node events module and the Logger class
// 2. Include a new instance of the Logger class named 'logger'
// 3. Include three Node event listeners that will listen for the three events created in the A2-1_logger.js file
//     A. Each listener will log to the console that the listener was called. Example: First Listener Called!
//     A1. Include a newline character (\n) at the end of each console log to create separation between each listener
// 4. Below the listeners, use the new instance to include a call to each module created in A2-1_logger.js
//     A. The message for each call will indicate that the listener is being called. Example: Calling First Listener...

// When finished your CMD assignment should look like this:
// Calling First Listener...
// First Listener Called!

// Calling Second Listener...
// Second Listener Called!

// Calling Third Listener...
// Third Listener Called!