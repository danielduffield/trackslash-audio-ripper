const createElement = require('./../utils/createElement')

const demo = true

const parseTrackName = track => track.trackName.split(' ').join('-')

const createTrackLink = (track, index, videoId, socketId) => (
  createElement('td', { title: demo ? 'File download is currently disabled.' : '' }, [
    ['a', {
      class: `track-link ${demo ? 'disabled' : ''}`,
      id: `track-link-${index + 1}`,
      href: demo ? '/' : `${`/download/${videoId}`}/tracks/${socketId}/${parseTrackName(track)}.mp3`,
      download: '',
      title: demo ? 'File download is currently disabled.' : ''
    }, [
      ['i', { class: `fa fa-download ${demo ? 'disabled' : ''}` }]
    ]]
  ])
)

module.exports = createTrackLink