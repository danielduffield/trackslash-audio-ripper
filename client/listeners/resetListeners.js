const { addLoadRef } = require('./../state/elementRefs')
const state = require('./../state/state.js')
const addTrackForm = require('./../utils/addTrackForm.js')

function resetTracklist() {
  const $tracklistError = addLoadRef('tracklist-error-message-container')
  const $trackFormContainer = addLoadRef('track-form-container')

  $tracklistError.textContent = ''
  $trackFormContainer.innerHTML = ''
  state.currentTrack = 1
  addTrackForm(state.currentTrack)
  state.currentTrack += 1
}

function startOver() {
  const $trackFinalContainer = addLoadRef('track-final-container')

  $trackFinalContainer.innerHTML = ''
  window.location.hash = ''
}

function createResetListeners() {
  const $startOverBtn = addLoadRef('start-over-button')
  const $resetTracklistBtn = addLoadRef('reset-tracklist-button')

  const attachStartOverBtnListener = () => (
    $startOverBtn.addEventListener('click', () => {
      resetTracklist()
      startOver()
    })
  )

  const attachResetTracklistListener = () => (
    $resetTracklistBtn.addEventListener('click', () => resetTracklist())
  )

  return { attachStartOverBtnListener, attachResetTracklistListener }
}

module.exports = createResetListeners
