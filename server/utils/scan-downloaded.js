const fs = require('fs-extra')
const path = require('path')

function scanDownloaded() {
  readDownloaded().then(files => console.log(files))
}

function readDownloaded() {
  console.log('Scanning start')
  const filePath = path.join(__dirname, '../downloaded')
  console.log(filePath)
  return fs.readdir(filePath)
}

module.exports = scanDownloaded
