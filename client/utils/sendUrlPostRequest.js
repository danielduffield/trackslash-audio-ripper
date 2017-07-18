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
    console.log(response)
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
    console.log(keyData)
    return keyData
  })
  .catch(err => console.log(err))
}

function transitionToTracklistForm(keyData) {
  const $youtubeVideoTitle = document.getElementById('youtube-video-title')
  $youtubeVideoTitle.textContent = keyData.videoTitle + ' [' + keyData.videoLengthString + ']'
  resetTracklist()
}

function resetTracklist() {
  const $trackFormContainer = document.getElementById('track-form-container')
  let resetIndex = 1
  let $trackForm = document.querySelector('.track-form-' + resetIndex)
  while ($trackForm) {
    $trackFormContainer.removeChild($trackForm)
    resetIndex++
    $trackForm = document.querySelector('.track-form-' + resetIndex)
  }
  const $trackFinalContainer = document.getElementById('track-final-container')
  resetIndex = 1
  let $trackFinal = document.querySelector('.track-final-' + resetIndex)
  while ($trackFinal) {
    $trackFinalContainer.removeChild($trackFinal)
    resetIndex++
    $trackFinal = document.querySelector('.track-final-' + resetIndex)
  }
}

module.exports = sendUrlPostRequest
