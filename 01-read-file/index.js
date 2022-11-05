const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
let stream = new fs.ReadStream(filePath, 'utf-8');

stream.on('data', data => console.log(data));