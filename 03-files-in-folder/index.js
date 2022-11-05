const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, './secret-folder');

fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
  if(err) throw err;
  else {
    files.forEach( file => {
      if(file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        fs.stat(filePath, (err, stats) => {
          if(err) throw err;
          else {
            console.log(`${path.basename(file.name).split('.', 1)} - ${path.extname(file.name).slice(1)} - ${stats.size / 1000}kb`);
          }
        })
      }
    })
  }
});