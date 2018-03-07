const { addLoadRef } = require('./../utils/elementRefs')
const state = require('./../state/state.js')
const addTrackForm = require('./../utils/addTrackForm.js')

function createResetListeners() {
  const $startOverBtn = addLoadRef('start-over-button')
  const $tracklistError = addLoadRef('tracklist-error-message-container')
  const $trackFormContainer = addLoadRef('track-form-container')
  const $trackFinalContainer = addLoadRef('track-final-container')
  const $resetTracklistBtn = addLoadRef('reset-tracklist-button')

  const attachStartOverBtnListener = () => (
    $startOverBtn.addEventListener('click', () => {
      $tracklistError.textContent = ''
      $trackFormContainer.innerHTML = ''
      $trackFinalContainer.innerHTML = ''
      state.currentTrack = 1
      addTrackForm(state.currentTrack)
      state.currentTrack += 1
      window.location.hash = ''
    })
  )

  const attachResetTracklistListener = () => (
    $resetTracklistBtn.addEventListener('click', () => {
      $tracklistError.textContent = ''
      $trackFormContainer.innerHTML = ''
      state.currentTrack = 1
      addTrackForm(state.currentTrack)
      state.currentTrack += 1
    })
  )

  return { attachStartOverBtnListener, attachResetTracklistListener }
}

module.exports = createResetListeners
