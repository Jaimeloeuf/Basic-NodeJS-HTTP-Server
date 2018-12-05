'use strict'; // Use strict version of JavaScript

const http = require('http'); // Module used to build http servers
const router = require('./router.js');
const l = require('./logger.js');

const HTTP_port = process.env.PORT || 8080;

// create HTTP server object and set port to listen to
const server = http.createServer(router.handleRequest).listen(HTTP_port, function(error) {
	if(error){
		let details = {type: 'Error', category: 'Internal', description: 'Error binding server to port: ' + port};
		if(error.code === 'EADDRINUSE')
			details.description = 'port address: ' + HTTP_port + ' is already in use';
		l.log(details, true); // Log error to file and console
	}
	else
		l.log({type: 'Activity', category: 'port-binding', description: 'Node Server listening to port: ' + HTTP_port}, true); // Log activity to file and console
});
// if there is an error, a major irreversible internal error, then call server.close(), before restarting the server