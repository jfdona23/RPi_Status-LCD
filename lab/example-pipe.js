const http = require('http');

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/echo') {
    /*
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      response.setHeader('x-url-requested', request.url)
      response.end(body);
    });
    */
    request.pipe(response); // all of the above can be repalced with this line.
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);