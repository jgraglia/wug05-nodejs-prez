var logsystem = exports; 

winston = require('winston');

logsystem.folder='./logs';
logsystem.logger = new (winston.Logger)({
		transports: [
			new winston.transports.Console(	{colorize:  true, timestamp: true, handleExceptions: false} )
		],
	exitOnError: true
       }
);
