const fs = require('fs-extra')
const path = require('path')

function ensureDirs(keyData, socketId) {
  const albumFolder = path.join(__dirname, '/../downloaded/' + keyData.videoId + '/album')
  const tracksFolder = path.join(__dirname, '/../downloaded/' + keyData.videoId + '/tracks/' + socketId)
  const zipFolder = path.join(__dirname, '/../downloaded/' + keyData.videoId + '/zip/' + socketId)
  const downloadFolders = [albumFolder, tracksFolder, zipFolder]
  return Promise.all(downloadFolders.map(dir => fs.ensureDir(dir)))
}

module.exports = ensureDirs
