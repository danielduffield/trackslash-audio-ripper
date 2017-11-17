const fs = require('fs')
const archiver = require('archiver')
const path = require('path')

function compressTracklist(youtubeId, socketId) {
  console.log('Beginning compression')
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(path.join(__dirname, '../downloaded/' + youtubeId + '/zip/' + socketId + '/' + youtubeId + '-tracklist.zip'))
    const archive = archiver('zip', {
      zlib: {level: 9}
    })

    output.on('close', () => {
      console.log(archive.pointer() + ' total bytes')
      console.log('archiver has been finalized and the output file descriptor has closed.')
      resolve('/download/' + youtubeId + '/zip/' + socketId + '/' + youtubeId + '-tracklist.zip')
    })

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        console.log('WARNING ERROR: ', err)
      }
      else {
        reject(err)
      }
    })

    archive.on('error', function (err) {
      console.log('ERROR ERROR: ', err)
      reject(err)
    })

    archive.pipe(output)
    archive.directory(path.join(__dirname, '/../downloaded/' + youtubeId + '/tracks/' + socketId), 'tracks')
    archive.finalize()
  })
}

module.exports = compressTracklist
