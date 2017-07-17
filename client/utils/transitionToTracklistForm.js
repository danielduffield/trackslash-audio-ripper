const addTrackForm = require('./addTrackForm.js')

function transitionToTracklistForm(keyData) {
  const $youtubeVideoTitle = document.getElementById('youtube-video-title')
  $youtubeVideoTitle.textContent = keyData.videoTitle + ' [' + keyData.videoLengthString + ']'
  const $oldTrackForm = document.querySelector('.track-form-1')
  if (!$oldTrackForm) {
    addTrackForm(1)
  }
}

module.exports = transitionToTracklistForm
