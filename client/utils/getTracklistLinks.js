const createElement = require('./elementCreation').createElement

const demo = true

function parseTrackName(track) {
  const parsedName = track.trackName.split(' ').join('-')
  return parsedName
}

function createTrackLink(track, index, videoId, socketId) {
  const trackPath = '/download/' + videoId
  const fileName = parseTrackName(track)
  const $linkTD = createElement('td', { title: demo ? 'File download is currently disabled.' : '' }, '', [])
  const $trackLink = createElement('a', {
    class: demo ? 'track-link disabled' : 'track-link',
    id: 'track-link-' + (index + 1),
    href: trackPath + '/tracks/' + socketId + '/' + fileName + '.mp3',
    download: '',
    title: demo ? 'File download is currently disabled.' : ''
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
