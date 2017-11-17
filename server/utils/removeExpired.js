const fs = require('fs-extra')
const path = require('path')

function removeExpired(entries) {
  let filesDeleted = 0
  return Promise.all(entries.map(dirName => {
    const expiredFilePath = path.join(__dirname, '../downloaded/', dirName)
    filesDeleted++
    fs.remove(expiredFilePath)
  })).then(() => {
    console.log(filesDeleted + ' expired directories deleted.')
  }).catch(err => console.log(err))
}

module.exports = removeExpired
