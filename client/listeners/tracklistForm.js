const { addLoadRef } = require('./../utils/elementRefs')
const state = require('./../state/state.js')

const submitTracklist = require('./../utils/submitTracklist')
const sendTracklistPostRequest = require('./../utils/sendTracklistPostRequest')
const handleTracklistPostResponse = require('./../utils/handleTracklistPostResponse')

function attachTracklistFormListener() {
  const $tracklistForm = addLoadRef('tracklist-form')
  const $tracklistError = addLoadRef('tracklist-error-message-container')
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

    sendTracklistPostRequest(tracklistPost).then(handleTracklistPostResponse)
  })
}

module.exports = attachTracklistFormListener
