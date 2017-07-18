
function renderTracklistLinks($tracklist) {
  $tracklist.forEach(($trackLink, index) => {
    const $trackForm = document.getElementById('track-form-' + (index + 1))
    $trackForm.appendChild($trackLink)
  })
}

module.exports = renderTracklistLinks
