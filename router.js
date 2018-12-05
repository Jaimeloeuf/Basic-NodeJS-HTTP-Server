'use strict'; // Use strict version of JavaScript

const url = require('url'); // Module used for parsing URLs
const fs = require('fs'); // Module used to access file system
const l = require('./logger.js');

function renderHTML(path, response) {  // Function reads and respond with a HTML file ONLY
	// Edit this function so that the html file is only read if it has been changed. else just send the cached copy

	fs.readFile(path, 'utf8', function(error, htmlFile) {
		if(error){
			let details = {type: 'Error', category: '404 Unavail Resource called', description: 'Cannot open file, reasons unknown'};
			if (error.code === 'ENOENT')
				details.description = 'File requested does not exist';
			response.writeHead(404);
			response.end('File not found! Invalid request!'); // Respond to and end the transaction
			l.log(details, true); // Log error to file and console
			console.trace('Error: ' + error.stack + '\n\n'); // Print error to Stderr
		}
		else
			response.end(htmlFile); // Respond to client with html file and end the response
	}); // End of fs.readFile
}

module.exports = {
	handleRequest: function(request, response) {
		/*
			Add a timeout functionality to the requestHandler
		*/

		var query = url.parse(request.url, true); // Parse the request
		l.log({type: 'Activity', category: 'New Client Request',
			description: 'Resource requested: ' + ' Host: ' + query.host + // returns 'localhost:8080'
			' Pathname: ' + query.pathname + ' Query: ' + query.search}, // returns '/index.htm' and '?year=2017&month=february'
			true);

		// Reply with a HTTP ok and a JSON Object with name/value pair for content type
		response.writeHead(200, {'Content-Type': 'text/html'});

		// use request.method to get the request method as a string before deciding what to do for the response
		switch(url.parse(request.url).pathname){ // Read and switch the path/route requested
			case '/':
				renderHTML('./index.html', response);
				break;
			case '/about':
				renderHTML('./about.html', response);
				break;
			default:
				renderHTML('./html/404/4.html', response);
				l.log({type: 'Error', category: '404 Unavail Resource called', description: 'invalid route'}, true);
		}
	}
};