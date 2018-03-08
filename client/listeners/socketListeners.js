const state = require('./../state/state.js')
const { loadRef } = require('./../state/elementRefs')

const buildTracklistFinal = require('./../renders/buildTracklistFinal')

function attachInitialSocketListeners() {
  const $downloadProgress = loadRef('album-download-progress')
  const $sliceProgress = loadRef('track-slice-progress')

  state.socket.on('connectionId', connectionId => {
    state.socketId = connectionId
  })

  state.socket.on('downloadProgress', progress => {
    $downloadProgress.textContent = `Download Progress: ${progress}%`
    if (progress === 100) {
      setTimeout(() => {
        $downloadProgress.textContent = 'Album Download Complete'
        if (state.slicingInitialized) {
          const $spinner = loadRef('spinner')
          $spinner.setAttribute('class', 'fa fa-spinner spinner')
          $sliceProgress.textContent = 'Track slice initializing...'
          setTimeout(() => {
            $sliceProgress.textContent = `Tracks sliced: 0/${state.tracklist.length}`
          }, 2000)
        }
      }, 3000)
    }
  })

  state.socket.on('sliceProgress', sliced => {
    $sliceProgress.textContent = 'Tracks sliced: ' + sliced
  })
}

function attachOnZipListener() {
  const $trackFinalContainer = loadRef('track-final-container')
  const { $audioPlayer, $nowPlaying } = state.audio.exportPlayerRefs()

  state.socket.on('zipPath', zipPath => {
    $trackFinalContainer.innerHTML = ''
    const $tracklistFinal = buildTracklistFinal(state.tracklist)
    $tracklistFinal.forEach($trackFinal => $trackFinalContainer.appendChild($trackFinal))
    const $downloadAllForm = loadRef('download-all-form')
    const $downloadAllButton = loadRef('download-all-button')
    const $downloadAllContainer = loadRef('download-all-container')
    if (state.demo) {
      $downloadAllContainer.setAttribute('title', 'File download is currently disabled.')
      $downloadAllButton.setAttribute('class', 'form-button disabled')
    }
    else $downloadAllForm.setAttribute('action', zipPath)
    const $finalAlbumTitle = loadRef('final-album-title')
    $finalAlbumTitle.textContent = state.albumMetadata.videoTitle
    const generalPath = `/download/${state.albumMetadata.videoId}/tracks/${state.socketId}/`
    const startPath = `/download/${state.albumMetadata.videoId}/tracks/${state.socketId}/${state.tracklist[0].trackName.split(' ').join('-')}.mp3`
    window.location.hash = `#tracklist-download?id=${state.albumMetadata.videoId}`
    $audioPlayer.src = startPath
    $nowPlaying.textContent = state.tracklist[0].trackName
    state.audio.loadTracklistData(state.tracklist, generalPath)
  })
}

module.exports = {
  attachInitialSocketListeners,
  attachOnZipListener
}
