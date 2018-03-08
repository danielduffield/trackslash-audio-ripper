const { addLoadRef } = require('./../state/elementRefs')
const state = require('./../state/state.js')
const addTrackForm = require('./../utils/addTrackForm.js')

function resetTracklist() {
  const $tracklistError = addLoadRef('tracklist-error-message-container')
  const $trackFormContainer = addLoadRef('track-form-container')
  const $trackFinalContainer = addLoadRef('track-final-container')

  $tracklistError.textContent = ''
  $trackFormContainer.innerHTML = ''
  state.currentTrack = 1
  addTrackForm(state.currentTrack)
  state.currentTrack += 1
  $trackFinalContainer.innerHTML = ''
}

module.exports = resetTracklist
