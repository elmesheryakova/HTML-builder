const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');


const folderPath = path.join(__dirname, 'project-dist');
const folderStyles = path.join(__dirname, 'styles');
const fileStyles = path.join(folderPath, 'style.css');
const folderAssets = path.join(__dirname, 'assets');
const folderAssetsCopy = path.join(folderPath, 'assets');
const folderComponents = path.join(__dirname, 'components');
const fileHtml = path.join(__dirname, 'template.html');
const fileHtmlCopy = path.join(folderPath, 'index.html');

async function bundleCSS() {
  try{
    const writeStream = fs.createWriteStream(fileStyles);
    const files = await fsPromise.readdir(folderStyles, {withFileTypes: true});
    for(const el of files){
      if(el.isFile()) {
        const filePath = path.resolve(folderStyles, el.name);
        if (path.extname(filePath) === '.css') {
          let styles = await fsPromise.readFile(filePath, 'utf-8');
          styles = `${styles.trim()}\n\n`;
          writeStream.write(styles);
        }
      }
    }
  } catch(err){
    console.log(err);
  }

}
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

async function bundleHtml() {
  await fsPromise.copyFile(fileHtml, fileHtmlCopy);
  let html = await fsPromise.readFile(fileHtmlCopy, 'utf-8');
  const writeStream = fs.createWriteStream(fileHtmlCopy);
  const files = await fsPromise.readdir(folderComponents, { withFileTypes: true });
  for (const el of files) {
    if(el.isFile()) {
      const filePath = path.join(folderComponents, el.name);
      if (path.extname(filePath) === '.html') {
        const sourceFileName = path.parse(filePath).name;
        const htmlContent = await fsPromise.readFile(filePath,'utf-8');
        html = html.replace(`{{${sourceFileName}}}`, htmlContent);
      }
    }
  }
  writeStream.write(html);
}

(async () => {
  try {
    await fsPromise.rm(folderPath, { recursive: true, force: true });
    await fsPromise.mkdir(folderPath, { recursive: true });
    await bundleCSS();
    await copyDir(folderAssets, folderAssetsCopy);
    await bundleHtml();
  } catch (err) {
    console.log(err);
  }
})();