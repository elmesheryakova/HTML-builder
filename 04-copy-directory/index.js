const fs = require('fs');
const path = require('path');
const pathCopy = path.join(__dirname, 'files-copy');
const pathFiles= path.join(__dirname,'files');

const copyDir = (pathFiles,pathCopy) => {
  fs.mkdir(pathCopy,{recursive:true}, err => {
    if (err) throw err;
  });
  fs.readdir(pathFiles, { withFileTypes: true }, (err,files)=> {
    if (err) throw err;
    else {
      files.forEach(file=> {
        if (file.isFile()) {
          fs.copyFile(path.join(pathFiles, file.name), path.join(pathCopy, file.name), err => {
            if (err) throw err;
          }); 
        }else {
          copyDir(path.join(pathFiles, file.name),path.join(pathCopy, file.name));
        }
      });
    } 
  });
};
copyDir(pathFiles, pathCopy);
