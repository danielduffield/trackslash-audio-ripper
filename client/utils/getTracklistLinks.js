const createElement = require('./createElement.js')
const path = require('path')

function parseTrackName(track) {
  const parsedName = track.trackName.split(' ').join('-')
  return parsedName
}

function createTrackLink(track, index, videoId) {
  const trackPath = path.join(__dirname, '/../../server/downloaded/' + videoId)
  const fileName = parseTrackName(track)
  const $trackLink = createElement('a', {
    class: 'track-link',
    id: 'track-link-' + (index + 1),
    href: trackPath + '/' + fileName + '.mp3'
  }, '+', [])
  return $trackLink
}

function getTracklistLinks(tracklist, videoId) {
  const $tracklistLinks = []
  tracklist.forEach((track, index) => {
    $tracklistLinks.push(createTrackLink(track, index, videoId))
  })
  return $tracklistLinks
}

module.exports = getTracklistLinks
