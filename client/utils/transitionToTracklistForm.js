const resetTracklist = require('./resetTracklist.js')

function transitionToTracklistForm(keyData) {
  const $youtubeVideoTitle = document.getElementById('youtube-video-title')
  $youtubeVideoTitle.textContent = keyData.videoTitle + ' [' + keyData.videoLengthString + ']'
  resetTracklist()
}

module.exports = transitionToTracklistForm
