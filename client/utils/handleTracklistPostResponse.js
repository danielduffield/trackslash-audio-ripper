const state = require('./../state/state.js')
const { addLoadRef, setOverwriteRef } = require('./elementRefs')
const { attachOnZipListener } = require('./../listeners/socketListeners')

const handleTracklistPostResponse = response => {
  const $trackFinalContainer = addLoadRef('track-final-container')
  const $audioPlayer = addLoadRef('audio-player')
  const $nowPlaying = addLoadRef('now-playing')

  if (response.status === 202) {
    $trackFinalContainer.addEventListener('click', e => {
      state.selectedTrack = state.tracklist[(parseInt(e.target.dataset.tracknum, 10) - 1)]
      if (!state.selectedTrack) return
      state.audio.selectTrack(state.selectedTrack)
      const $selected = addLoadRef(`track-final-${e.target.dataset.tracknum}`)
      for (let i = 1; i <= state.tracklist.length; i++) {
        const $track = setOverwriteRef(`track-final-${i}`)
        if ($track.classList.value.includes('selected')) $track.classList.remove('selected')
      }
      $selected.setAttribute('class', 'track-final selected')

      $nowPlaying.textContent = state.selectedTrack.trackName
      const trackFileName = state.selectedTrack.trackName.split(' ').join('-')

      const trackPath = '/download/' + state.albumMetadata.videoId + '/tracks/' + state.socketId + '/' + trackFileName + '.mp3'
      $audioPlayer.pause()
      $audioPlayer.src = trackPath
      $audioPlayer.play()
    })
    attachOnZipListener()
  }
  else (console.log('Tracklist request failed.'))
}

module.exports = handleTracklistPostResponse
