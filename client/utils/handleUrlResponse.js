const state = require('./../state/state')
const { loadRef } = require('./../state/elementRefs')

const buildUrlError = require('./../renders/buildUrlError')

const handleUrlResponse = response => (
  parseResponse(response).then(keyData => {
    window.location.hash = '#create-tracklist' + '?id=' + keyData.videoId

    transitionToTracklistForm(keyData)
    return keyData
  })
)

function parseResponse(response) {
  if (response.status === 400) {
    const $invalid = buildUrlError()
    const $urlFormGroup = loadRef('url-form-col')
    $urlFormGroup.appendChild($invalid)
  }
  if (response.status === 202) return response.json()
}

function transitionToTracklistForm(keyData) {
  const $youtubeVideoTitle = loadRef('youtube-video-title')

  $youtubeVideoTitle.textContent = `${keyData.videoTitle} [${keyData.videoLengthString}]`
  state.tracklistForm.resetTracklist()
}

module.exports = handleUrlResponse
