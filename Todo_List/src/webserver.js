const http = require('http');
const fs = require('fs').promises;

const host = 'localhost';
const port = 4711;

const requestListener = function (req, res) {
    res.setHeader('Content-Type', 'text/html');

    function serve(path) {
        fs.readFile(__dirname + path) 
            .then(contents => {
                res.writeHead(200);
                res.end(contents);
            })
    }

    switch(req.url) {
        case '/':
            serve('/Todo.html');
            break;
        case '/Todo.html':
            serve('/Todo.html');
            break;
        case '/New.html':
            serve('/New.html');
            break;
        case '/Edit.html':
            serve('/Edit.html');
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error: 'Resource not found'}));
    }
    
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
