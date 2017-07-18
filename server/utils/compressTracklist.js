const fs = require('fs')
const archiver = require('archiver')
const path = require('path')

function compressTracklist(youtubeId) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(path.join(__dirname, '/album.zip'))
    const archive = archiver('zip', {
      zlib: {level: 9}
    })

    output.on('close', () => {
      console.log(archive.pointer() + ' total bytes')
      console.log('archiver has been finalized and the output file descriptor has closed.')
    })

    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        console.log(err)
      }
      else {
        throw err
      }
    })

    archive.on('error', function (err) {
      return reject(err)
    })

    archive.pipe(output)
    archive.directory('../downloaded/' + youtubeId + '/tracks/', 'tracks')
    archive.finalize()

    return resolve(archive)
  })
}

module.exports = compressTracklist
