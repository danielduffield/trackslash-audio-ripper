function createAlbumImage(imageLocation, elementId) {
  const $imageContainer = document.getElementById(elementId)
  $imageContainer.innerHTML = ''

  const myImage = new Image(512, 288)
  myImage.src = imageLocation
  $imageContainer.classList.remove('hidden')
  $imageContainer.appendChild(myImage)
}

module.exports = createAlbumImage
