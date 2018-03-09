const sendPostRequest = require('./sendPostRequest')
const generateAlbumImage = require('./generateAlbumImage')
const buildUrlError = require('./../renders/buildUrlError')
const { loadRef } = require('./../state/elementRefs')

function handleUrlSubmit($input, socketId) {
  const $buildUrlError = document.querySelector('.alert-danger')
  const $urlFormGroup = loadRef('url-form-col')
  if ($buildUrlError) {
    $urlFormGroup.removeChild($buildUrlError)
  }
  const urlSubmission = {}
  if (validateUrl($input.value)) {
    urlSubmission.url = $input.value
    urlSubmission.youtubeId = getYoutubeId(urlSubmission.url)
    urlSubmission.socketId = socketId
    return sendPostRequest('/url-request', urlSubmission).then(generateAlbumImage)
  }
  else {
    const $invalid = buildUrlError()
    $urlFormGroup.appendChild($invalid)
    return Promise.resolve(null)
  }
}

function validateUrl(url) {
  return url.includes('https://www.youtube.com/')
}

function getYoutubeId(url) {
  const youtubeId = url.slice(24, url.length)
  return youtubeId
}

module.exports = handleUrlSubmit
