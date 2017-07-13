const ytdl = require('ytdl-core')
const fs = require('fs-extra')
const path = require('path')

function downloadAlbum(url, keyData) {
  const albumFolder = path.join(__dirname, '/downloaded/' + keyData.videoId)
  fs.ensureDir(albumFolder)
    .then(() => {
      ytdl(url, 'audioonly')
        .pipe(fs.createWriteStream(path.join(__dirname, '/downloaded/' + keyData.videoId + '/' + keyData.videoId + '-album.mp3')))
    })
    .catch(err => console.log(err))
}

module.exports = downloadAlbum
