var http = require('http');
var logger = require('./logging').logger
var endOfLine = require('os').EOL;

var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end();

    logger.log({level: 'info', message: request.url});

    if(request.url === '/api/data-feed/betgenius/message'){
        wholeBody = '';

        request.on('data', chunk => {
            wholeBody += chunk.toString();
        });

        request.on('end', ()=> {
           logger.log({level: 'info', message: endOfLine + wholeBody})
        });
    }

});

var port = 3000;

server.listen(port);

console.log("Server running at http://127.0.0.1:" + port);