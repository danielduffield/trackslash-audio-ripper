const updateSelectedTrack = require('./updateSelectedTrack.js')

function playNextTrack($audioPlayer, tracklist, currentTrack, videoId, socketId) {
  let nextTrack
  if (!currentTrack) nextTrack = tracklist[1]
  else {
    const prevIndex = tracklist.findIndex(track => track.trackName === currentTrack.trackName)
    nextTrack = (prevIndex !== -1 && tracklist[prevIndex + 1]
      ? tracklist[prevIndex + 1]
      : null)
  }
  if (!nextTrack) return currentTrack
  updateSelectedTrack(tracklist, nextTrack)
  const trackFileName = nextTrack.trackName.split(' ').join('-')
  const trackPath = '/download/' + videoId + '/tracks/' + socketId + '/' + trackFileName + '.mp3'
  $audioPlayer.pause()
  $audioPlayer.src = trackPath
  $audioPlayer.play()
  return nextTrack
}

module.exports = playNextTrack
