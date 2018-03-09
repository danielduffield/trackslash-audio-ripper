const sendPostRequest = require('./sendPostRequest')
const generateAlbumImage = require('./generateAlbumImage')
const handleUrlResponse = require('./handleUrlResponse')
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
    return sendPostRequest('/url-request', urlSubmission)
      .then(handleUrlResponse)
      .then(generateAlbumImage)
  }
  else {
    $urlFormGroup.appendChild(buildUrlError())
    return Promise.resolve(null)
  }
}

const validateUrl = url => url.includes('https://www.youtube.com/')

const getYoutubeId = url => url.slice(24, url.length)

module.exports = handleUrlSubmit
