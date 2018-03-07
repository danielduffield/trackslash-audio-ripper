const { addLoadRef } = require('./../utils/elementRefs')
const state = require('./state/state.js')
const addTrackForm = require('./../utils/addTrackForm.js')

function attachStartOverBtnListener() {
  const $startOverBtn = addLoadRef('start-over-button')
  const $tracklistError = addLoadRef('tracklist-error-message-container')
  const $trackFormContainer = addLoadRef('track-form-container')
  const $trackFinalContainer = addLoadRef('track-final-container')

  $startOverBtn.addEventListener('click', () => {
    $tracklistError.textContent = ''
    $trackFormContainer.innerHTML = ''
    $trackFinalContainer.innerHTML = ''
    state.currentTrack = 1
    addTrackForm(state.currentTrack)
    state.currentTrack += 1
    window.location.hash = ''
  })
}

module.exports = attachStartOverBtnListener
