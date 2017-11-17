const createElement = require('./elementCreation').createElement

function parseTrackName(track) {
  const parsedName = track.trackName.split(' ').join('-')
  return parsedName
}

function createTrackLink(track, index, videoId, socketId) {
  const trackPath = '/download/' + videoId
  const fileName = parseTrackName(track)
  const $linkTD = createElement('td', {}, '', [])
  const $trackLink = createElement('a', {
    class: 'track-link',
    id: 'track-link-' + (index + 1),
    href: trackPath + '/tracks/' + socketId + '/' + fileName + '.mp3',
    download: ''
  }, '+', [])

  $linkTD.appendChild($trackLink)
  return $linkTD
}

function getTracklistLinks(tracklist, videoId, socketId) {
  const $tracklistLinks = []

  tracklist.forEach((track, index) => {
    $tracklistLinks.push(createTrackLink(track, index, videoId, socketId))
  })

  return $tracklistLinks
}

module.exports = getTracklistLinks
