const state = require('./../state/state')

const { attachInitialSocketListeners } = require('./socketListeners')

const attachUrlFormListener = require('./urlSubmitForm')
const attachAddTrackButtonListener = require('./addTrack')
const attachAudioControlListener = require('./audioControls')

const createTracklistFormListeners = require('./tracklistForm')
const createTimeCodeListeners = require('./timecodeListeners')

const { attachStartOverBtnListener, attachResetTracklistListener } = require('./resetListeners')

const addListener = (name, listener) => {
  listener()
  state.listeners[name] = true
}

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
    { name: 'addTrack', listener: attachAddTrackButtonListener },
    { name: 'deleteTrack', listener: attachTrackDeleteListener },
    { name: 'resetTracklistBtn', listener: attachResetTracklistListener },
    { name: 'startOverBtn', listener: attachStartOverBtnListener },
    { name: 'tracklistForm', listener: attachTracklistFormListener },
    { name: 'urlSubmitForm', listener: attachUrlFormListener },
    { name: 'audioControls', listener: attachAudioControlListener },
    { name: 'loadTimecodes', listener: attachLoadTimecodesListener },
    { name: 'submitTimecodes', listener: attachSubmitTimecodesListener },
    { name: 'cancelTimecodes', listener: attachCancelTimecodesListener },
    { name: 'manualTimecodes', listener: attachManualTimecodesListener }
  ]

  toAttach.forEach(obj => {
    addListener(obj.name, obj.listener)
  })
}

module.exports = { attachInitialListeners, addListener }
