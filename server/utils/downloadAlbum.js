const ytdl = require('ytdl-core')
const fs = require('fs-extra')
const path = require('path')

function downloadAlbum(url, keyData) {
  const albumFolder = path.join(__dirname, '/../downloaded/' + keyData.videoId + '/album')
  const tracksFolder = path.join(__dirname, '/../downloaded/' + keyData.videoId + '/tracks')

  fs.ensureDir(albumFolder)
    .then(() => {
      fs.ensureDir(tracksFolder)
    })
    .then(() => {
      ytdl(url, 'audioonly')
        .pipe(fs.createWriteStream(path.join(albumFolder + '/' + keyData.videoId + '-album.mp3')))
    })
    .catch(err => console.log(err))
}

module.exports = downloadAlbum
