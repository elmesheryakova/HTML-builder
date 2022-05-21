const fs = require('fs');
const path = require('path');
const {readdir} = require('fs/promises');

const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const folderStyles = path.join(__dirname, 'styles');
const writeStream = fs.createWriteStream(bundle);


readdir(folderStyles, {withFileTypes: true})
  .then((result, err) => {
    if (err) throw err;
    result.forEach(el=>{
      const filePath = path.join(folderStyles, el.name);
      const file = path.extname(el.name);
         
      if (el.isFile() && file === '.css') {
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(writeStream);
      }
    });   
  });
