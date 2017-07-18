const createElement = require('./createElement')

function buildTracklistFinal(tracklist) {
  let trackIndex = 1
  const trackFields = ['num', 'name', 'start', 'end']
  const trackProperties = ['trackNum', 'trackName', 'trackStart', 'trackEnd']
  const $trackFinalContainer = document.getElementById('track-final-container')
  tracklist.forEach(track => {
    const $trackFinal = createElement('tr', {class: 'track-final-' + trackIndex}, '', [])
    trackFields.forEach((field, index) => {
      const $tableCell = createElement('td', {}, '', [])
      const $trackFinalField = createElement('span', {
        id: 'track-final-' + trackFields[index] + '-' + trackIndex,
        class: 'track-final-field'
      }, track[trackProperties[index]], [])
      $tableCell.appendChild($trackFinalField)
      $trackFinal.appendChild($tableCell)
    })
    $trackFinalContainer.appendChild($trackFinal)
    trackIndex++
  })
}

module.exports = buildTracklistFinal
