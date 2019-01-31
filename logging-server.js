var http = require('http');
var logger = require('./logging').logger
var endOfLine = require('os').EOL;

const msgPath = '/api/data-feed/betgenius/message';

const hosts = [{ hostname: 'localhost', port: 8301 }];

var server = http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end();

    logger.log({ level: 'info', message: request.url });

    if (request.url === msgPath) {
        wholeBody = '';

        request.on('data', chunk => {
            wholeBody += chunk.toString();
        });

        request.on('end', () => {
            logger.log({ level: 'info', message: endOfLine + wholeBody })

            if (wholeBody) {

                hosts.forEach(host => {

                    try {
                        const options = {
                            hostname: host.hostname,
                            port: host.port,
                            path: msgPath,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Content-Length': wholeBody.length,
                                'Authorization': 'Basic token-here!'
                            }
                        };

                        let req = http.request(options, (res) => {
                            console.log(`statusCode: ${res.statusCode}`);
                        });

                        req.write(wholeBody);
                        req.end();

                    } catch(ex) {

                    }
                });
            }
        });
    }
});

var port = 3000;

server.listen(port);

console.log("Server running at http://127.0.0.1:" + port);