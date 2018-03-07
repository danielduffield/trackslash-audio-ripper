const { addLoadRef } = require('./../state/elementRefs')

const resetTracklist = require('./../utils/resetTracklist')

function startOver() {
  resetTracklist()
  window.location.hash = ''
}

function createResetListeners() {
  const $startOverBtn = addLoadRef('start-over-button')
  const $resetTracklistBtn = addLoadRef('reset-tracklist-button')

  const attachStartOverBtnListener = () => (
    $startOverBtn.addEventListener('click', () => {
      startOver()
    })
  )

  const attachResetTracklistListener = () => (
    $resetTracklistBtn.addEventListener('click', () => resetTracklist())
  )

  return { attachStartOverBtnListener, attachResetTracklistListener }
}

module.exports = createResetListeners
