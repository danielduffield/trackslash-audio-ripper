const attachUrlFormListener = require('./urlSubmitForm')
const attachAddTrackButtonListener = require('./addTrackButton')
const { attachStartOverBtnListener, attachResetTracklistListener } = require('./attachResetListeners')
const attachTracklistFormListener = require('./tracklistForm')
const { attachInitialSocketListeners } = require('./socketListeners')

function attachListeners() {
  attachInitialSocketListeners()
  return {
    addTrackButton: attachAddTrackButtonListener(),
    resetTracklistBtn: attachResetTracklistListener(),
    startOverBtn: attachStartOverBtnListener(),
    tracklistForm: attachTracklistFormListener(),
    urlSubmitForm: attachUrlFormListener()
  }
}

module.exports = attachListeners
