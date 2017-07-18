const createElement = require('./createElement')

function renderTracklistLinks($tracklist) {
  const $theadRow = document.querySelector('.thead-row')
  const $downloadTH = createElement('th', {}, 'DL', [])
  $theadRow.appendChild($downloadTH)

  $tracklist.forEach(($trackLink, index) => {
    const $trackForm = document.querySelector('.track-form-' + (index + 1))
    console.log('index: ', index)
    console.log('trackform: ', $trackForm)
    $trackForm.appendChild($trackLink)
  })
}

module.exports = renderTracklistLinks
