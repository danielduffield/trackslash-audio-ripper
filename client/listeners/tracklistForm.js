const { addLoadRef, setOverwriteRef } = require('./../utils/elementRefs')
const state = require('./state/state.js')
const socket = require('./utils/socketConnection')
const submitTracklist = require('./utils/submitTracklist.js')
const getTracklistLinks = require('./utils/getTracklistLinks.js')
const renderTracklistLinks = require('./utils/renderTracklistLinks.js')
const buildTracklistFinal = require('./utils/buildTracklistFinal.js')
const sendTracklistPostRequest = require('./utils/sendTracklistPostRequest.js')
const AudioModule = require('./utils/audioModule.js')

function attachTracklistFormListener() {
  const $tracklistForm = addLoadRef('tracklist-form')
  const $tracklistError = addLoadRef('tracklist-error-message-container')
  const $trackFinalContainer = addLoadRef('track-final-container')
  const $downloadProgress = addLoadRef('album-download-progress')
  const $sliceProgress = addLoadRef('track-slice-progress')

  return $tracklistForm.addEventListener('submit', event => {
    event.preventDefault()

    $tracklistError.textContent = ''

    const trackData = new FormData($tracklistForm)
    state.tracklist = submitTracklist(trackData, state.currentTrack)
    const tracklistPost = {}

    tracklistPost.tracklist = state.tracklist
    tracklistPost.metaData = state.albumMetadata
    tracklistPost.socketId = state.socketId

    state.slicingInitialized = true
    if ($downloadProgress.textContent !== 'Album Download Complete') {
      $sliceProgress.textContent = 'Slicing will begin after album download.'
    }
    else {
      $sliceProgress.textContent = 'Track slice initializing...'
      const $spinner = addLoadRef('spinner')
      $spinner.setAttribute('class', 'fa fa-spinner spinner')
      setTimeout(() => {
        $sliceProgress.textContent = 'Tracks sliced: 0/' + state.tracklist.length
      }, 2000)
    }

    sendTracklistPostRequest(tracklistPost).then(response => {
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
        socket.on('zipPath', zipPath => {
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
      else (console.log('Tracklist request failed.'))
    })
  })
}

module.exports = attachTracklistFormListener
