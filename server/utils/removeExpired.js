const fs = require('fs-extra')
const path = require('path')

const timeLimit = 10
const filePath = path.join(__dirname, '../downloaded')
const minutes = 1000 * 60

function removeExpired() {
  const expired = findExpired(getBirthtimes(filePath))
  expired.then(dirInfo => {
    console.log(dirInfo)
    /* Promise.all(dirInfo.map(dir => {
      const expiredFilePath = path.join(__dirname, '../downloaded/', dir.fileName)
      return fs.rmdir(expiredFilePath)
    })).then(() => console.log('Expired files removed')) */

  })
}

function findExpired(fileStats) {
  return fileStats.then(dataArr => {
    console.log(dataArr)
    return dataArr.filter(fileData => (Date.now() - fileData.stats.birthtimeMs) / minutes > timeLimit)
  })
}

function getBirthtimes(dir) {
  return fs.readdir(dir).then((files) => {
    console.log(files)
    return Promise.all(files.map(fileName => {
      const filePath = path.join(__dirname, '../downloaded/', fileName)
      return fs.stat(filePath)
    })).then(fileStats => fileStats.map((stats, index) => {
      return { fileName: files[index], stats: Object.assign({}, stats) }
    }))
  })
}

module.exports = removeExpired
