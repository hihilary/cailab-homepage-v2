var gm = require('gm');
var fs = require('fs');

dir = './src/assets/portraits'
fs.readdir(dir, (err, files) => {
  if (err) {
    console.log(err)
  } else {
    files = files.filter(fileName => /.*\.jpg$/.test(fileName))

    for (let fileName of files) {
      var size = 200;
      if(fileName === 'Patrick.jpg') {
        size = 250
      }
      gm(dir+'/'+fileName)
      .resize(size, size)
      .autoOrient()
      .write(dir + '/thumbs/' + fileName, function (err) {
        if (err) console.log(err);
      });
      console.log(fileName)
    }
  }
})
