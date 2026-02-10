import http from 'http';
import fs from 'fs';
import url from 'url';


const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {return res.end(); }
    // console.log(`Received request for ${req.url}`);
    const log = `${Date.now()}: ${req.url}: ${req.method} request received\n`;
    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    fs.appendFile('log.txt', log, (err, data) => {
        switch(parsedUrl.pathname) {
            case '/':
                res.end('Home page');
                break;
            case '/about':
                res.end('About page for ' + parsedUrl.query.name);
                break;
            default:
                res.end('404 Page not found!');
        }
    });
});


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});