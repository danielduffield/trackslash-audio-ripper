const sendUrlRequest = require('./sendUrlRequest')
const invalidUrlMessage = require('./../renders/invalidUrlMessage')
const { loadRef } = require('./../state/elementRefs')

function createAlbumImage(imageLocation) {
  const albumImage = new Image(512, 288)
  albumImage.src = imageLocation
  return albumImage
}

function handleUrlSubmit($input, socketId) {
  const $invalidUrlMessage = document.querySelector('.alert-danger')
  const $urlFormGroup = loadRef('url-form-col')
  if ($invalidUrlMessage) {
    $urlFormGroup.removeChild($invalidUrlMessage)
  }
  const urlSubmission = {}
  if (validateUrl($input.value)) {
    urlSubmission.url = $input.value
    urlSubmission.youtubeId = getYoutubeId(urlSubmission.url)
    urlSubmission.socketId = socketId
    return sendUrlRequest(urlSubmission).then(keyData => {

      const imageContainerIds = [
        'video-image-tracklist-form',
        'video-image-timecode-form',
        'video-image-tracklist-final'
      ]

      imageContainerIds.forEach(elementId => {
        const $imageContainer = loadRef(elementId)
        $imageContainer.innerHTML = ''
        $imageContainer.classList.remove('hidden')
        $imageContainer.appendChild(createAlbumImage(keyData.videoImage))
      })
      return keyData
    })
  }
  else {
    const $invalid = invalidUrlMessage()
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
