const fs = require('fs');
const path = require('path');
const {readdir} = require('fs/promises');

const folderPath = path.join(__dirname, 'secret-folder');

readdir(folderPath, {withFileTypes: true})
  .then(result => {
    result.forEach(el=>{
      if (el.isFile()) {
        const filePath = path.join(folderPath, el.name);
        const file = path.extname(el.name);

        fs.stat(filePath, (err, stats) => {
          if (err) throw err;
          const size = stats.size/1024;
          console.log(`${el.name.split('.')[0]} - ${file.slice(1)} - ${size}kb`);
        });
      }
    });
  });
