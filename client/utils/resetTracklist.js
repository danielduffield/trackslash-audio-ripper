const { loadRef } = require('./../state/elementRefs')
const state = require('./../state/state.js')
const addTrackForm = require('./../utils/addTrackForm.js')

function resetTracklist() {
  const $tracklistError = loadRef('tracklist-error-message-container')
  const $trackFormContainer = loadRef('track-form-container')
  const $trackFinalContainer = loadRef('track-final-container')

  $tracklistError.textContent = ''
  $trackFormContainer.innerHTML = ''
  state.currentTrack = 1
  addTrackForm(state.currentTrack)
  state.currentTrack += 1
  $trackFinalContainer.innerHTML = ''
}

module.exports = resetTracklist
