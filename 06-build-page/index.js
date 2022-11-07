const fs = require('fs');
const path = require('path');
const {copyFile} = require('fs/promises');


fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => { if(err) throw err });
fs.mkdir(path.join(__dirname, 'project-dist/assets'), { recursive: true }, err => { if(err) throw err });

fs.writeFile(path.join(__dirname, 'project-dist/style.css'), '', err => { if(err) throw err });

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
  if(err) throw err;
  else {
    files.forEach( file => {
      if(path.extname(file.name) === '.css') {
        fs.readFile(path.join(__dirname, 'styles', file.name), (err, data) => {
          if(err) throw err;
          else {
            fs.appendFile(path.join(__dirname, 'project-dist/style.css'), data, err => { if(err) throw err });
          }
        })
      }
    })
  }
});

fs.readdir(path.join(__dirname, 'assets'), { recursive: true }, (err, directory) => {
  if(err) throw err;
  else {
    directory.forEach( dir => {
      const dirPath = path.join(__dirname, 'assets', dir);
      const dirCopyPath = path.join(__dirname, 'project-dist/assets', dir);
      fs.mkdir(dirCopyPath, { recursive: true }, err => { if(err) throw err });
      fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if(err) throw err;
        else {
          files.forEach( file => {
            copyFile(path.join(dirPath, file.name), path.join(dirCopyPath, file.name));
          })
        }
      })
    })
  }
});

const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist/index.html'), { withFileTypes: true });
const readStream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
readStream.on('data', chunk => {
  let str = chunk;
  
  fs.readdir(path.join(__dirname, 'components'), (err, data) => {
    if(err) throw err;
    else {
      let arr = [];
      data.forEach( file => {
        arr.push(file)
      });

      for(let i = 0; i < arr.length; i++) {
        let name = path.basename(arr[i]).split('.', 1).join('');
        fs.readFile(path.join(__dirname, 'components', arr[i]), { withFileTypes: true }, (err, fileDate) => {
          if(err) throw err;
          else {
            str = str.replace(`{{${name}}}`, fileDate.toString());
            if(i == arr.length - 1) {
              writeStream.write(str);
            }
          }
        })
      }
    }
  })
});
