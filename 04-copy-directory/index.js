const fs = require('fs');
const path = require('path');
const {copyFile} = require('fs/promises');

const folderPath = path.join(__dirname, 'files');
const newFolderPath = path.join(__dirname, 'files-copy');


async function copyDirectory() {

  fs.mkdir(newFolderPath, { recursive: true }, err => { if(err) throw err });

  await fs.readdir(newFolderPath, { withFileTypes: true }, (err, files) => {
    if(err) throw err;
    else {
      files.forEach( file => {
        fs.unlink(path.join(newFolderPath, file.name), err => { if(err) throw err });
      })
    }
  });

  fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if(err) throw err;
    else {
      files.forEach( file => {
        copyFile(path.join(folderPath, file.name), path.join(newFolderPath, file.name));
      })
    }
  });

}

copyDirectory();