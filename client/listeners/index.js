const state = require('./../state/state')

const { attachInitialSocketListeners } = require('./socketListeners')

const attachUrlFormListener = require('./urlSubmitForm')
const attachAddTrackButtonListener = require('./addTrack')
const attachAudioControlListener = require('./audioControls')

const createTracklistFormListeners = require('./tracklistForm')
const createTimeCodeListeners = require('./timecodeListeners')

const { attachStartOverBtnListener, attachResetTracklistListener } = require('./resetListeners')

let listeners = {}

function attachInitialListeners() {
  attachInitialSocketListeners()
  const { attachTracklistFormListener, attachTrackDeleteListener } = createTracklistFormListeners()
  const {
    attachLoadTimecodesListener,
    attachSubmitTimecodesListener,
    attachCancelTimecodesListener,
    attachManualTimecodesListener
  } = createTimeCodeListeners()

  const toAttach = [
    { addTrack: attachAddTrackButtonListener },
    { deleteTrack: attachTrackDeleteListener },
    { resetTracklistBtn: attachResetTracklistListener },
    { startOverBtn: attachStartOverBtnListener },
    { tracklistForm: attachTracklistFormListener },
    { urlSubmitForm: attachUrlFormListener },
    { audioControls: attachAudioControlListener },
    { loadTimecodes: attachLoadTimecodesListener },
    { submitTimecodes: attachSubmitTimecodesListener },
    { cancelTimecodes: attachCancelTimecodesListener },
    { manualTimecodes: attachManualTimecodesListener }
  ]

  Object.keys(listeners).forEach(key => {
    addListener(key, toAttach[key])
  })

  return listeners
}

const addListener = (name, listener) => {
  listener()
  state.listeners[name] = true
}

module.exports = { attachInitialListeners, addListener }
