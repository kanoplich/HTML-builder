const fs = require('fs');
const path = require('path');
const { copyFile } = require('fs/promises');


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

fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, file) => {
  if(err) throw err;

  let content = file;
  fs.readdir(path.join(__dirname, 'components'), 'utf-8',(err, data) => {
    if(err) throw err;
    let arr = [];

    data.forEach( file => {
      arr.push(file)
    });

    for(let i = 0; i < arr.length; i++) {
      fs.readFile(path.join(__dirname, 'components', arr[i]), 'utf-8', (err, fileDate) => {
        if(err) throw err;
        content = content.replace(`{{${path.basename(arr[i]).split('.', 1)}}}`, fileDate);
        fs.writeFile(path.join(__dirname, 'project-dist/index.html'), content, err => { if(err) throw err });
      })
    }
  })
});