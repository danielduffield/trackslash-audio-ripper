const { addLoadRef } = require('./../utils/elementRefs')
const state = require('./../state/state.js')

const submitTracklist = require('./../utils/submitTracklist')
const sendTracklistPostRequest = require('./../utils/sendTracklistPostRequest')
const handleTracklistPostResponse = require('./../utils/handleTracklistPostResponse')
const deleteTrack = require('./../utils/deleteTrack.js')

function createTracklistFormListeners() {
  const $tracklistForm = addLoadRef('tracklist-form')
  const $tracklistError = addLoadRef('tracklist-error-message-container')
  const $downloadProgress = addLoadRef('album-download-progress')
  const $sliceProgress = addLoadRef('track-slice-progress')

  const attachTracklistFormListener = () => (
    $tracklistForm.addEventListener('submit', event => {
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
  )

  const attachTrackDeleteListener = () => (
    $tracklistForm.addEventListener('click', event => {
      if (!event.target.id.includes('track-delete-')) return false
      const firstTrackDigitIndex = 13
      const trackNumber = parseInt(event.target.id.substring(firstTrackDigitIndex, event.target.id.length), 10)
      if (trackNumber && /\d/.test(trackNumber)) {
        const numberOfTracks = state.currentTrack - 1
        deleteTrack(trackNumber, numberOfTracks)
        state.currentTrack -= 1
      }
    })
  )

  return {
    attachTracklistFormListener,
    attachTrackDeleteListener
  }
}

module.exports = createTracklistFormListeners
