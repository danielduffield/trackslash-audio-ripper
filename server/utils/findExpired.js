const fs = require('fs-extra')
const path = require('path')

const minutes = 1000 * 60
const timeLimit = 20 * minutes
const filePath = path.join(__dirname, '../downloaded')

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

module.exports = () => findExpired(getFileStats(filePath))
