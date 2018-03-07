const createElement = require('./elementCreation')
const { addLoadRef } = require('./elementRefs')

function buildTracklistFinal(tracklist) {

  const trackFields = [
    { name: 'num', property: 'trackNum' },
    { name: 'name', property: 'trackName' },
    { name: 'start', property: 'trackStart' },
    { name: 'end', property: 'trackEnd' }
  ]

  const $trackFinalContainer = addLoadRef('track-final-container')

  const $tracklistFinal = tracklist.map((track, idx) => {
    const trackIndex = idx + 1
    const $trackFinal = createElement('tr', {
      id: `track-final-${trackIndex}`,
      class: `track-final ${idx === 0 ? 'selected' : ''}`
    })

    const $trackFields = trackFields.map((field, fieldIdx) => (
      createElement('td', { 'data-tracknum': trackIndex }, [
        ['span',
          {
            id: `track-final-${field.name}-${trackIndex}`,
            class: 'track-final-field',
            'data-tracknum': trackIndex
          },
          track[field.property]]
      ])
    ))

    $trackFields.forEach($field => $trackFinal.appendChild($field))
    return $trackFinal
  })

  $tracklistFinal.forEach($track => $trackFinalContainer.appendChild($track))
  return $tracklistFinal
}

module.exports = buildTracklistFinal
