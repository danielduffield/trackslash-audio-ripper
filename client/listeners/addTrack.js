const { loadRef } = require('./../state/elementRefs')
const state = require('./../state/state.js')

function attachAddTrackButtonListener() {
  const $tracklistError = loadRef('tracklist-error-message-container')
  const $addTrackButton = loadRef('track-form-add-button')

  return $addTrackButton.addEventListener('click', () => {
    $tracklistError.textContent = ''
    state.tracklistForm.addTrackForm(state.currentTrack)
    state.currentTrack += 1
  })
}

module.exports = attachAddTrackButtonListener
