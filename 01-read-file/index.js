const fs = require('fs');
const path = require('path');
const txt = path.resolve(__dirname, 'text.txt');
const readableStream = fs.createReadStream(txt, 'utf-8');
readableStream.on('data', chunk => console.log(chunk));


