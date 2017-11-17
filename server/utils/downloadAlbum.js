const ytdl = require('ytdl-core')
const fs = require('fs-extra')
const path = require('path')
const { io } = require('./serverApp')

function downloadAlbum(url, keyData, socketId) {
  const albumFolder = path.join(__dirname, '/../downloaded/' + keyData.videoId + '/album')
  const tracksFolder = path.join(__dirname, '/../downloaded/' + keyData.videoId + '/tracks/' + socketId)

  return new Promise((resolve, reject) => {
    fs.ensureDir(albumFolder)
      .then(() => {
        fs.ensureDir(tracksFolder)
      })
      .then(() => {
        console.log('starting download')
        const album = ytdl(url, 'audioonly')

        album.pipe(fs.createWriteStream(path.join(albumFolder + '/' + keyData.videoId + '-album.mp3')))

        let previous = null
        album.on('progress', (chunkLength, downloaded, total) => {
          console.log(downloaded / total * 100)
          if (Math.floor(downloaded / total * 100) !== previous) {
            io.to(socketId).emit('downloadProgress', Math.floor(downloaded / total * 100))
          }
          previous = Math.floor(downloaded / total * 100)
        })

        album.on('end', () => {
          console.log('Album done downloading')
          resolve()
        })
        return true
      })
      .catch(err => console.log(err))
  })
}

module.exports = downloadAlbum
