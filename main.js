//https://github.com/technoweenie/twitter-node
var util = require('util');
var TwitterNode = require('/home/jgr/git/twitter-node').TwitterNode;
var logsystem = require('./libs/logsystem'),
    logger = logsystem.logger,
    expert = require('./libs/expert'),
    connect = require('connect');
    
logger.info('Output folder: '+logsystem.folder);
logger.log('info', 'Bonjour le monde!');

logger.info('compute 4 & 6: '+expert.compute(4, 6));

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('wall'))
  .use(function(req, res){
    res.end('hello world\n');
  })
 .listen(8080);
 
var io = require('socket.io').listen(8081);

var clients = [];
  
logger.info('Running on http://localhost:8080');
io.sockets.on('connection', function (socket) {
  clients.push(socket);
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

var twitConfig = require('./private/config.js');
var twit = new TwitterNode(twitConfig);
twit.track('#radiolondres');
twit.track('#news');

twit.addListener('error', function(error) {
  console.log(error.message);
});

twit
  .addListener('tweet', function(tweet) {
    io.sockets.emit('tweet', { user: tweet.user.screen_name, profile_image_url: tweet.user.profile_image_url, followers_count: tweet.user.followers_count, created_at:tweet.created_at, text:tweet.text});
    //util.puts("@" + tweet.user.screen_name + ": " + tweet.text);
    //logger.info("@" + tweet.user.screen_name + ": " + tweet.text);
  })
   .addListener('limit', function(limit) {
    util.puts("LIMIT: " + util.inspect(limit));
  })

  .addListener('delete', function(del) {
    util.puts("DELETE: " + util.inspect(del));
  })

  .addListener('end', function(resp) {
    util.puts("wave goodbye... " + resp.statusCode);
  })
   .stream();
logger.info("Tweet stream running...");