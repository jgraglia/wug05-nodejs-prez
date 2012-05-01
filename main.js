
logsystem = require('./libs/logsystem'),
    logger = logsystem.logger,
    expert = require('./libs/expert');  
    
logger.info('Output folder: '+logsystem.folder);
logger.log('info', 'Bonjour le monde!');

logger.info('compute 4 & 6: '+expert.compute(4, 6));

setTimeout( function () {
		nonExistingFunction();
	}, 2000);

setInterval( function () {
		logger.log("info", "Merhaba!");
	}, 1000);

