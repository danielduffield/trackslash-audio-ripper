const attachUrlFormListener = require('./urlSubmitForm')
const attachAddTrackButtonListener = require('./addTrackButton')
const createResetListeners = require('./resetListeners')
const attachTracklistFormListener = require('./tracklistForm')
const { attachInitialSocketListeners } = require('./socketListeners')

function attachListeners() {
  attachInitialSocketListeners()
  const { attachStartOverBtnListener, attachResetTracklistListener } = createResetListeners()
  return {
    addTrackButton: attachAddTrackButtonListener(),
    resetTracklistBtn: attachResetTracklistListener(),
    startOverBtn: attachStartOverBtnListener(),
    tracklistForm: attachTracklistFormListener(),
    urlSubmitForm: attachUrlFormListener()
  }
}

module.exports = attachListeners
