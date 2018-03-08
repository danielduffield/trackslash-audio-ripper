const { addLoadRef } = require('./../state/elementRefs')

const resetTracklist = require('./../utils/resetTracklist')

function startOver() {
  resetTracklist()
  window.location.hash = ''
}

const attachStartOverBtnListener = () => {
  const $startOverBtn = addLoadRef('start-over-button')
  $startOverBtn.addEventListener('click', () => startOver())
}

const attachResetTracklistListener = () => {
  const $resetTracklistBtn = addLoadRef('reset-tracklist-button')
  $resetTracklistBtn.addEventListener('click', () => resetTracklist())
}

module.exports = { attachStartOverBtnListener, attachResetTracklistListener }
