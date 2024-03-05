// Create web server
// Run the server
// Open the browser and go to http://localhost:3000
// You should see the message "Hello, World!"

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');

// Configure our HTTP server to respond with Hello, World! to all requests.
var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('Hello, World!');
            response.end();
            break;
        case '/comments':
            fs.readFile(__dirname + path + '.json', function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write('opps this doesn\'t exist - 404');
                    response.end();
                } else {
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write('opps this doesn\'t exist - 404');
            response.end();
            break;
    }
});

// Listen on port 3000, IP defaults to