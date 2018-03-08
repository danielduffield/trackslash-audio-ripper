const state = require('./../state/state')
const { loadRef } = require('./../state/elementRefs')

const buildUrlError = require('./../renders/buildUrlError')

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
      const $invalid = buildUrlError()
      const $urlFormGroup = loadRef('url-form-col')
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
  const $youtubeVideoTitle = loadRef('youtube-video-title')

  $youtubeVideoTitle.textContent = `${keyData.videoTitle} [${keyData.videoLengthString}]`
  state.tracklistForm.resetTracklist()
}

module.exports = sendUrlPostRequest
