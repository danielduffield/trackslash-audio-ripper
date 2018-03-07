const { attachInitialSocketListeners } = require('./socketListeners')

const attachUrlFormListener = require('./urlSubmitForm')
const attachAddTrackButtonListener = require('./addTrackButton')
const attachAudioControlListener = require('./audioControls')

const createTracklistFormListeners = require('./tracklistForm')
const createResetListeners = require('./resetListeners')
const createTimeCodeListeners = require('./timecodeListeners')

function attachListeners() {
  attachInitialSocketListeners()
  const { attachStartOverBtnListener, attachResetTracklistListener } = createResetListeners()
  const { attachTracklistFormListener, attachTrackDeleteListener } = createTracklistFormListeners()
  const {
    attachLoadTimecodesListener,
    attachSubmitTimecodesListener,
    attachCancelTimecodesListener,
    attachManualTimecodesListener
  } = createTimeCodeListeners()

  return {
    addTrack: attachAddTrackButtonListener(),
    deleteTrack: attachTrackDeleteListener(),
    resetTracklistBtn: attachResetTracklistListener(),
    startOverBtn: attachStartOverBtnListener(),
    tracklistForm: attachTracklistFormListener(),
    urlSubmitForm: attachUrlFormListener(),
    audioControls: attachAudioControlListener(),
    loadTimecodes: attachLoadTimecodesListener(),
    submitTimecodes: attachSubmitTimecodesListener(),
    cancelTimecodes: attachCancelTimecodesListener(),
    manualTimecodes: attachManualTimecodesListener()
  }
}

module.exports = attachListeners
