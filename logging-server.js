var http = require('http');

var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end();

    if(request.url === '/api/data-feed/betgenius/message'){
        allData = '';

        request.on('data', chunk => {
            // console.log(chunk.toString('utf-8'));
            allData += chunk.toString();
        });

        request.on('end', ()=> {
           console.log(allData);
        });


    }

});

var port = 3000;

server.listen(port);

console.log("Server running at http://127.0.0.1:" + port);