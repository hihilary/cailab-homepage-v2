var gm = require('gm');
var fs = require('fs');
var dir = './static/labPics'
fs.readdir(dir, (err, files) => {
  if (err) {
    console.log(err)
  } else {
    files = files.filter(fileName => /.*\.jpg$/.test(fileName))
    
    for (let fileName of files) {
      gm(dir+'/'+fileName)
      .resize(96, 64)
      .autoOrient()
      .write(dir + '/thumbs/' + fileName, function (err) {
        if (err) console.log(err);
      });
      console.log(fileName)
    }
  }
})

