var logsystem = exports; 
logsystem.folder='./logs';
logsystem.logger = new (winston.Logger)({
		transports: [
			new winston.transports.Console(	{colorize:  true, timestamp: true, handleExceptions: true} )
		],
	exitOnError: true
       }
);
