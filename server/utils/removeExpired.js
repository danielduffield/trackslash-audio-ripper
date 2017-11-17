const fs = require('fs-extra')
const path = require('path')

function removeExpired() {
  const filePath = path.join(__dirname, '../downloaded')
  getBirthtimes(filePath).then(data => {
    console.log(data)
    const minutes = 1000 * 60
    data.forEach(fileTime => {
      console.log((Date.now() - fileTime.birthtimeMs) / minutes)
    })
  })
}

function getBirthtimes(dir) {
  return fs.readdir(dir).then(files => {
    console.log(files)
    return Promise.all(files.map(fileName => {
      const filePath = path.join(__dirname, '../downloaded/', fileName)
      return fs.stat(filePath)
    }))
  })
}

module.exports = removeExpired
