//https://github.com/technoweenie/twitter-node
var util = require('util');

var logsystem = require('./libs/logsystem'),
    logger = logsystem.logger,
    redis = require('redis');
    
logger.info("Redis!");

var client = redis.createClient();

client.on("error", function(err) {
    logger.error("REDIS :: Error "+ err);
});

client.on("message", function(channel, message) {
    logger.info("REDIS :: message received on "+channel+": "+message);
    /*
     * clients.forEach(function(client) { console.log("client"+client); // Send
     * response to all connected clients client.emit('news', { hello: 'world',
     * date:new Date() }); })
     */;
});

client.subscribe("wug");

