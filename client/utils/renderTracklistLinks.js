function renderTracklistLinks($tracklistLinks) {
  $tracklistLinks.forEach(($trackLink, index) => {
    const $trackForm = document.querySelector('.track-final-' + (index + 1))

    $trackForm.appendChild($trackLink)
  })
}

module.exports = renderTracklistLinks
