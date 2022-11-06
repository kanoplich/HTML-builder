const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, './styles');
const folderBundlePath = path.join(__dirname, './project-dist/bundle.css');

fs.writeFile(folderBundlePath, '', err => { if(err) throw err });

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if(err) throw err;
  else {
    files.forEach( file => {
      if(path.extname(file.name) === '.css') {
        fs.readFile(path.join(folderPath, file.name), (err, data) => {
          if(err) throw err;
          else {
            fs.appendFile(folderBundlePath, data, err => { if(err) throw err });
          }
        })
      }
    })
  }
});