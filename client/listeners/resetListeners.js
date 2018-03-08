const state = require('./../state/state')
const { loadRef } = require('./../state/elementRefs')

function startOver() {
  state.tracklistForm.resetTracklist()
  window.location.hash = ''
}

const attachStartOverBtnListener = () => {
  const $startOverBtn = loadRef('start-over-button')
  $startOverBtn.addEventListener('click', () => startOver())
}

const attachResetTracklistListener = () => {
  const $resetTracklistBtn = loadRef('reset-tracklist-button')
  $resetTracklistBtn.addEventListener('click', () => state.tracklistForm.resetTracklist())
}

module.exports = { attachStartOverBtnListener, attachResetTracklistListener }
