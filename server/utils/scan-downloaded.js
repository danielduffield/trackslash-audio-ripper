const fs = require('fs-extra')
const path = require('path')

function scanDownloaded() {
  readDownloaded().then(data => console.log(data))
}

function readDownloaded() {
  return getDirectoryNames().then(files => {
    console.log(files)
    return Promise.all(files.map(fileName => {
      const filePath = path.join(__dirname, '../downloaded/', fileName)
      return fs.stat(filePath)
    }))
  })
}

function getDirectoryNames() {
  console.log('Scanning start')
  const filePath = path.join(__dirname, '../downloaded')
  console.log(filePath)
  return fs.readdir(filePath)
}

module.exports = scanDownloaded
