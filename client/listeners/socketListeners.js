const state = require('./../state/state.js')
const { addLoadRef } = require('./../utils/elementRefs')

const getTracklistLinks = require('./../utils/getTracklistLinks.js')
const renderTracklistLinks = require('./../utils/renderTracklistLinks.js')
const buildTracklistFinal = require('./../utils/buildTracklistFinal.js')
const AudioModule = require('./../utils/audioModule.js')

function attachInitialSocketListeners() {
  const $downloadProgress = addLoadRef('album-download-progress')
  const $sliceProgress = addLoadRef('track-slice-progress')

  state.socket.on('connectionId', connectionId => {
    state.socketId = connectionId
  })

  state.socket.on('downloadProgress', progress => {
    $downloadProgress.textContent = 'Download Progress: ' + progress + '%'
    if (progress === 100) {
      setTimeout(() => {
        $downloadProgress.textContent = 'Album Download Complete'
        if (state.slicingInitialized) {
          const $spinner = addLoadRef('spinner')
          $spinner.setAttribute('class', 'fa fa-spinner spinner')
          $sliceProgress.textContent = 'Track slice initializing...'
          setTimeout(() => {
            $sliceProgress.textContent = 'Tracks sliced: 0/' + state.tracklist.length
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
  const $trackFinalContainer = addLoadRef('track-final-container')
  const $audioPlayer = addLoadRef('audio-player')
  const $nowPlaying = addLoadRef('now-playing')

  state.socket.on('zipPath', zipPath => {
    $trackFinalContainer.innerHTML = ''
    const $tracklistLinks = getTracklistLinks(state.tracklist, state.albumMetadata.videoId, state.socketId)
    buildTracklistFinal(state.tracklist)
    renderTracklistLinks($tracklistLinks)
    const $downloadAllForm = addLoadRef('download-all-form')
    const $downloadAllButton = addLoadRef('download-all-button')
    const $downloadAllContainer = addLoadRef('download-all-container')
    if (state.demo) {
      $downloadAllContainer.setAttribute('title', 'File download is currently disabled.')
      $downloadAllButton.setAttribute('class', 'form-button disabled')
    }
    else $downloadAllForm.setAttribute('action', zipPath)
    const $finalAlbumTitle = addLoadRef('final-album-title')
    $finalAlbumTitle.textContent = state.albumMetadata.videoTitle
    const generalPath = '/download/' + state.albumMetadata.videoId + '/tracks/' + state.socketId + '/'
    const startPath = '/download/' + state.albumMetadata.videoId + '/tracks/' + state.socketId + '/' + state.tracklist[0].trackName.split(' ').join('-') + '.mp3'
    window.location.hash = '#tracklist-download' + '?id=' + state.albumMetadata.videoId
    $audioPlayer.src = startPath
    $nowPlaying.textContent = state.tracklist[0].trackName
    state.audio = new AudioModule($audioPlayer, $nowPlaying, state.tracklist, generalPath)
  })
}

module.exports = {
  attachInitialSocketListeners,
  attachOnZipListener
}
