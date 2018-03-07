const state = require('./../state/state.js')
const { addLoadRef } = require('./../state/elementRefs')

const addTrackForm = require('./../utils/addTrackForm.js')
const autoGenerateTracklist = require('./../utils/autoGenerateTracklist.js')
const autofillTracklistForms = require('./../utils/autofillTracklistForms.js')

function createTimeCodeListeners() {
  const $timecodeError = addLoadRef('timecode-error-message-container')
  const $submitTimecodesButton = addLoadRef('submit-timecodes-button')
  const $timecodeSubmitBtn = addLoadRef('timecode-submit-button')
  const $timecodeCancelBtn = addLoadRef('timecode-cancel-button')
  const $timecodeInputBox = addLoadRef('timecode-input-box')
  const $trackFormContainer = addLoadRef('track-form-container')
  const $tracklistError = addLoadRef('tracklist-error-message-container')
  const $loadTimecodesBtn = addLoadRef('load-timecodes-button')

  const attachLoadTimecodesListener = () => $loadTimecodesBtn.addEventListener('click', () => {
    $trackFormContainer.innerHTML = ''
    state.currentTrack = 1
    addTrackForm(state.currentTrack)
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
    const $timecodeTitle = addLoadRef('timecode-video-title')
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
    addTrackForm(state.currentTrack)
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
