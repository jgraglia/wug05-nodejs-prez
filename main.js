winston = require("winston");

var logger = new (winston.Logger)({
		transports: [
			new winston.transports.File(
				{ 
					filename: './logs/all-logs.log', 
					timestamp: true,
					maxsize: 1000000 
				}
			),
			new winston.transports.Console(
				{
					colorize:  true, 
					timestamp: true, 
					handleExceptions: true
				}
			)
		],
		exceptionHandlers: [
			new winston.transports.File({ filename: './logs/exceptions.log', timestamp: true, maxsize: 1000000 })
		],
	exitOnError: true,
	}
);



logger.log("info", "Bonjour le monde!");

setTimeout( function () {
		nonExistingFunction();
	}, 2000);

setInterval( function () {
		logger.log("info", "Merhaba!");
	}, 1000);

