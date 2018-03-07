const state = require('./../state/state')

const createElement = require('./../utils/createElement')

const createTrackLink = require('./../renders/trackLink')

function createTracklistFinal(tracklist) {

  const trackFields = [
    { name: 'num', property: 'trackNum' },
    { name: 'name', property: 'trackName' },
    { name: 'start', property: 'trackStart' },
    { name: 'end', property: 'trackEnd' }
  ]

  return tracklist.map((track, idx) => (
    createElement('tr', {
      id: `track-final-${idx + 1}`,
      class: `track-final ${idx === 0 ? 'selected' : ''}`
    }, [
      ...trackFields.map((field, fieldIdx) => (
        createElement('td', { 'data-tracknum': idx + 1 }, [
          ['span',
            {
              id: `track-final-${field.name}-${idx + 1}`,
              class: 'track-final-field',
              'data-tracknum': idx + 1
            },
            track[field.property]
          ]
        ])
      )),
      createTrackLink(track, idx, state.albumMetadata.videoId, state.socketId)
    ])
  ))
}

module.exports = createTracklistFinal
