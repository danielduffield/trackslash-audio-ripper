const ytdl = require('ytdl-core')

function getMetadata(url) {
  return ytdl.getInfo(url)
}

module.exports = getMetadata
