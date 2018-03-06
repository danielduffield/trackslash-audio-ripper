const createElement = require('./elementCreation')

const demo = true

const parseTrackName = track => track.trackName.split(' ').join('-')

function createTrackLink(track, index, videoId, socketId) {
  const trackPath = '/download/' + videoId
  const fileName = parseTrackName(track)
  const $linkTD = createElement('td', { title: demo ? 'File download is currently disabled.' : '' }, '', [])
  const $trackLink = createElement('a', {
    class: `track-link ${demo ? 'disabled' : ''}`,
    id: `track-link-${index + 1}`,
    href: demo ? '/' : `${trackpath}/tracks/${socketId}/${fileName}.mp3`,
    download: '',
    title: demo ? 'File download is currently disabled.' : ''
  }, '', [
    createElement('i', { class: 'fa fa-download disabled' }, '', [])
  ])

  $linkTD.appendChild($trackLink)
  return $linkTD
}

const getTracklistLinks = (tracklist, videoId, socketId) => (
  tracklist.map((track, idx) => createTrackLink(track, idx, videoId, socketId)))

module.exports = getTracklistLinks
