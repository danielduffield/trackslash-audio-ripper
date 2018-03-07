const { attachOnZipListener } = require('./../listeners/socketListeners')
const attachTracklistFinalListener = require('./../listeners/tracklistFinal')
const addListener = require('./../listeners/addListener.js')

const handleTracklistResponse = response => {
  if (response.status === 202) {
    addListener('tracklistFinal', attachTracklistFinalListener)
    addListener('socketOnZip', attachOnZipListener)
  }
  else (console.log('Tracklist request failed.'))
}

module.exports = handleTracklistResponse
