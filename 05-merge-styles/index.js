const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');


const bundle = path.resolve(__dirname, 'project-dist', 'bundle.css');
const folderStyles = path.resolve(__dirname, 'styles');
const writeStream = fs.createWriteStream(bundle);

async function bundleCSS() {
  try{
    const files = await fsPromise.readdir(folderStyles, {withFileTypes: true});
    files.forEach(el => {
      if(el.isFile()) {
        const filePath = path.resolve(folderStyles, el.name);
        if (path.extname(filePath) === '.css') {
          const readStream = fs.createReadStream(filePath);
          readStream.pipe(writeStream, {end: false});
        }
      }
    });
  } catch(err){
    console.log(err);
  }

}
bundleCSS();