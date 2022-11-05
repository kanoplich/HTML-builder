const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const filePath = path.join(__dirname, 'text.txt');
const rl = readline.createInterface({ input, output });

fs.writeFile(filePath, '', err => {
  if(err) throw err;
  else { 
    console.log('Enter text:');
    rl.on('line', input => {
      if(input === 'exit') rl.close();
      else {
        fs.appendFile(filePath, `${input}\n`, err => {
          if(err) throw err;
        })
      }
    })
  }  
});

rl.on('close', () => console.log('Good buy!'));
