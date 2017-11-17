const fs = require('fs-extra')
const path = require('path')

function removeExpired(directories) {
  let filesDeleted = 0
  return directories.then(dirInfo => {
    return Promise.all(dirInfo.expired.map(dir => {
      const expiredFilePath = path.join(__dirname, '../downloaded/', dir.fileName)
      console.log('DELETING FILE: ', expiredFilePath)
      filesDeleted++
      fs.remove(expiredFilePath)
    })).then(() => {
      console.log(filesDeleted + ' expired directories deleted.')
      return dirInfo.active
    })
  })
}

module.exports = removeExpired
