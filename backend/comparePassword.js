var crypto = require('crypto')
var secret = require('./secret.json')

module.exports = function comparePassword (password) {
  var sha = crypto.createHash(secret.hashMethod)
  sha.update(password + secret.salt)
  var d = sha.digest('hex')
  console.log(d)
  return new Promise((resolve, reject) => {
    if (d === secret.savedPassword) {
      resolve(null)
    } else {
      reject('wrong password')
    }
  })
}
