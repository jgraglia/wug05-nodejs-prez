
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
 
var io = require('socket.io').listen(8081, {

});
  
logger.info('Running on http://localhost:8080');
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  setInterval(function() {
      socket.emit('news', { hello: 'server time is: '+new Date() });
  }, 1000);
});