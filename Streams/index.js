const express = require('express');
const fs = require('fs');
const zlib = require('zlib');
const status = require('express-status-monitor');

const app = express();
const PORT = 5000;

app.use(status());

fs.createReadStream('file.txt', 'utf-8')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('file.zip'));


app.get('/', (req, res) => {
    // fs.readFile('file.txt', (err, data) => {
    //     res.send(data);
    // });

    // const readStream = fs.createReadStream('file.txt', 'utf-8');
    // readStream.on('data', (chunk) => {
    //     res.write(chunk);
    // });
    // readStream.on('end', () => {
    //     res.end();
    // });

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});