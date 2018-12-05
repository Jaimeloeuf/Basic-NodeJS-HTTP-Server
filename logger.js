'use strict'; // Use strict version of JavaScript

const fs = require('fs'); // Module used to access file system

module.exports = {
	log: function (data, log_to_console) {
		/* Type of activities:
			1. Internal
			2. Request handled
			3. Response Sent
			4. File modified
		*/
		if(log_to_console)
			console.log(data.category + ' (' + data.type + ')\n' + data.description + '\n');

		let file = './logs/' + ((data.type === 'Error') ? 'error.json' : 'activity.json');

		data.time = new Date(); // Add a timestamp to the log, fix this, currently it is greenwich time
		// Add a serial number to the log

		fs.appendFile(file, JSON.stringify(data, null, 4), 'utf8', function(error, fileData) {
			if(error)
				console.log('error with logger');
		});
	}
};
