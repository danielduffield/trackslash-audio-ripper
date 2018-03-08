const { loadRef } = require('./../state/elementRefs')

const resetTracklist = require('./../utils/resetTracklist')

function startOver() {
  resetTracklist()
  window.location.hash = ''
}

const attachStartOverBtnListener = () => {
  const $startOverBtn = loadRef('start-over-button')
  $startOverBtn.addEventListener('click', () => startOver())
}

const attachResetTracklistListener = () => {
  const $resetTracklistBtn = loadRef('reset-tracklist-button')
  $resetTracklistBtn.addEventListener('click', () => resetTracklist())
}

module.exports = { attachStartOverBtnListener, attachResetTracklistListener }
