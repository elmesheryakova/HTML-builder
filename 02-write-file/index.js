const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit} = process;
const textFile = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(textFile);

stdout.write('Привет! Готов ко второму стейджу?\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit'){
    exit();
  } else{
    writeStream.write(data.toString());
  }
});

process.on('exit', () => stdout.write('Успехов в учебе)'));
process.on('SIGINT', exit);