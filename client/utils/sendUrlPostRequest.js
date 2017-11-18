const invalidUrlMessage = require('./invalidUrlMessage.js')

function sendUrlPostRequest(urlSubmission) {
  return fetch('/url-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(urlSubmission)
  })
  .then(response => {
    if (response.status === 400) {
      const $invalid = invalidUrlMessage()
      const $urlFormGroup = document.getElementById('url-form-col')
      $urlFormGroup.appendChild($invalid)
    }

    if (response.status === 202) return response.json()
  })
  .then(keyData => {
    window.location.hash = '#create-tracklist' + '?id=' + keyData.videoId

    transitionToTracklistForm(keyData)
    return keyData
  })
}

function transitionToTracklistForm(keyData) {
  const $youtubeVideoTitle = document.getElementById('youtube-video-title')

  $youtubeVideoTitle.textContent = keyData.videoTitle + ' [' + keyData.videoLengthString + ']'
  resetTracklist()
}

function resetTracklist() {
  const $trackFormContainer = document.getElementById('track-form-container')
  $trackFormContainer.innerHTML = ''

  const $trackFinalContainer = document.getElementById('track-final-container')
  $trackFinalContainer.innerHTML = ''
}

module.exports = sendUrlPostRequest
