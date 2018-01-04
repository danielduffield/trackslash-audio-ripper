function playNextTrack($audioPlayer, tracklist, currentTrack) {
  console.log('Audio Player', $audioPlayer)
  console.log(tracklist, currentTrack)
  const trackIndex = tracklist.findIndex(track => track.trackName === currentTrack.trackName)
  if (trackIndex === -1) return
  const nextTrack = tracklist[trackIndex + 1]
  return nextTrack || null
}

module.exports = playNextTrack