const addTrackForm = require('./addTrackForm.js')
const resetTracklist = require('./resetTracklist.js')

function transitionToTracklistForm(keyData) {
  const $youtubeVideoTitle = document.getElementById('youtube-video-title')
  $youtubeVideoTitle.textContent = keyData.videoTitle + ' [' + keyData.videoLengthString + ']'
  resetTracklist()
  addTrackForm(1)
}

module.exports = transitionToTracklistForm
