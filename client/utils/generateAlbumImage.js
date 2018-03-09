const { loadRef } = require('./../state/elementRefs')

function createAlbumImage(imageLocation) {
  const albumImage = new Image(512, 288)
  albumImage.src = imageLocation
  return albumImage
}

const generateAlbumImage = keyData => {
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
}

module.exports = generateAlbumImage
