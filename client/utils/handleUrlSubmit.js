const sendUrlPostRequest = require('./sendUrlPostRequest.js')
const invalidUrlMessage = require('./invalidUrlMessage.js')
const addTrackForm = require('./addTrackForm.js')

function createAlbumImage(imageLocation, elementId) {
  const albumImage = new Image(512, 288)
  ablumImage.src = imageLocation
  return albumImage
}

function handleUrlSubmit($input, socketId) {
  const $invalidUrlMessage = document.querySelector('.alert-danger')
  const $urlFormGroup = document.getElementById('url-form-col')
  if ($invalidUrlMessage) {
    $urlFormGroup.removeChild($invalidUrlMessage)
  }
  const urlSubmission = {}
  if (validateUrl($input.value)) {
    urlSubmission.url = $input.value
    urlSubmission.youtubeId = getYoutubeId(urlSubmission.url)
    urlSubmission.socketId = socketId
    return sendUrlPostRequest(urlSubmission).then(keyData => {

      const albumImages = [
        createAlbumImage(keyData.videoImage, 'video-image-tracklist-form'),
        createAlbumImage(keyData.videoImage, 'video-image-timecode-form'),
        createAlbumImage(keyData.videoImage, 'video-image-tracklist-final'),
      ]

      const $imageContainer = document.getElementById(elementId)
      $imageContainer.innerHTML = ''
      $imageContainer.classList.remove('hidden')
      albumImages.forEach(image => $imageContainer.appendChild(image))

      const currentTrack = 1
      addTrackForm(currentTrack)
      return keyData
    })
  }
  else {
    const $invalid = invalidUrlMessage()
    const $urlFormGroup = document.getElementById('url-form-col')
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
