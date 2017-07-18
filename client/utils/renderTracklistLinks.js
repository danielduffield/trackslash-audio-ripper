function renderTracklistLinks($tracklist) {
  $tracklist.forEach(($trackLink, index) => {
    const $trackForm = document.querySelector('.track-final-' + (index + 1))
    console.log('index: ', index)
    console.log('trackform: ', $trackForm)
    $trackForm.appendChild($trackLink)
  })
}

module.exports = renderTracklistLinks
