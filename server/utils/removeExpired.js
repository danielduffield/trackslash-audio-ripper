const fs = require('fs-extra')
const path = require('path')

const filePath = path.join(__dirname, '../downloaded')
const minutes = 1000 * 60
const timeLimit = 20 * minutes

function removeExpired() {
  const results = findExpired(getFileStats(filePath))
  let filesDeleted = 0
  return results.then(dirInfo => {
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

function findExpired(fileStats) {
  return fileStats.then(dataArr => {
    return {
      expired: dataArr.filter(fileData => (Date.now() - fileData.stats.birthtimeMs) > timeLimit),
      active: dataArr.filter(fileData => (Date.now() - fileData.stats.birthtimeMs) < timeLimit)
    }
  })
}

function getFileStats(dir) {
  return fs.readdir(dir).then((files) => {
    return Promise.all(files.map(fileName => {
      const filePath = path.join(__dirname, '../downloaded/', fileName)
      return fs.stat(filePath)
    })).then(fileStats => fileStats.map((stats, index) => {
      return { fileName: files[index], stats: Object.assign({}, stats) }
    }))
  })
}

module.exports = removeExpired
