var argv = require('optimist').argv;
var metrics = require('metrics');

// node cpu.js --loop
if (argv.loop) console.log("LOOP MODE");
else console.log("TICK MODE");

var cptr=0;
var total=0;
var meter = new metrics.Meter;

function compute() {
    for (var i = 0; i<10000000; i++) {
        cptr+=1;
        meter.mark();
        total = 87897897/3433+total;
        if (cptr%50000000===0) {
            console.log(meter.meanRate()+"/sec ("+cptr+" since beginning)");
        }
    }
    if (argv.loop) compute();
    else process.nextTick(compute);
}
var http = require('http');

http.createServer(function(req, res) {
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end('Hello World, counter : '+cptr);
}).listen(5000, '127.0.0.1');
console.log("Http server ready on http://localhost:5000");

compute();