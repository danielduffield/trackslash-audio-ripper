const state = require('./../state/state.js')
const { loadRef } = require('./../state/elementRefs')

const autoGenerateTracklist = require('./../utils/autoGenerateTracklist.js')
const autofillTracklistForms = require('./../utils/autofillTracklistForms.js')

function createTimeCodeListeners() {
  const $timecodeError = loadRef('timecode-error-message-container')
  const $submitTimecodesButton = loadRef('submit-timecodes-button')
  const $timecodeSubmitBtn = loadRef('timecode-submit-button')
  const $timecodeCancelBtn = loadRef('timecode-cancel-button')
  const $timecodeInputBox = loadRef('timecode-input-box')
  const $trackFormContainer = loadRef('track-form-container')
  const $tracklistError = loadRef('tracklist-error-message-container')
  const $loadTimecodesBtn = loadRef('load-timecodes-button')

  const attachLoadTimecodesListener = () => $loadTimecodesBtn.addEventListener('click', () => {
    $trackFormContainer.innerHTML = ''
    state.currentTrack = 1
    state.tracklistForm.addTrackForm(state.currentTrack)
    state.currentTrack += 1
    if (state.albumMetadata.timeCodes.length > 1) {
      const autoTracklist = autoGenerateTracklist(state.albumMetadata.description, state.albumMetadata.videoLengthString)
      state.currentTrack = autoTracklist.length + 1
      autofillTracklistForms(autoTracklist)
    }
    else {
      $tracklistError.textContent = '* No timecodes found in video description. Use "Submit Timecodes."'
    }
  })

  const attachSubmitTimecodesListener = () => $submitTimecodesButton.addEventListener('click', () => {
    $tracklistError.textContent = ''
    $timecodeInputBox.value = ''
    const $timecodeTitle = loadRef('timecode-video-title')
    $timecodeTitle.textContent = state.albumMetadata.videoTitle + ' [' + state.albumMetadata.videoLengthString + ']'
    window.location.hash = '#submit-timecodes' + '?id=' + state.albumMetadata.videoId
  })

  const attachCancelTimecodesListener = () => $timecodeCancelBtn.addEventListener('click', () => {
    $timecodeError.textContent = ''
    window.location.hash = '#create-tracklist' + '?id=' + state.albumMetadata.videoId
  })

  const attachManualTimecodesListener = () => $timecodeSubmitBtn.addEventListener('click', () => {
    const descriptionRows = $timecodeInputBox.value.split('\n')
    const timecodedRows = descriptionRows.filter(row => {
      return /\d:\d\d/.test(row)
    })
    if (timecodedRows.length < 2) {
      $timecodeError.textContent = '* Timecodes not found.'
      return false
    }
    $timecodeError.textContent = ''
    $trackFormContainer.innerHTML = ''
    state.currentTrack = 1
    state.tracklistForm.addTrackForm(state.currentTrack)
    window.location.hash = '#create-tracklist' + '?id=' + state.albumMetadata.videoId
    const pastedTracklist = autoGenerateTracklist($timecodeInputBox.value, state.albumMetadata.videoLengthString)
    state.currentTrack += pastedTracklist.length
    autofillTracklistForms(pastedTracklist)
  })

  return {
    attachLoadTimecodesListener,
    attachSubmitTimecodesListener,
    attachCancelTimecodesListener,
    attachManualTimecodesListener
  }
}

module.exports = createTimeCodeListeners
