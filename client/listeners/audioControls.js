const state = require('./../state/state.js')
const { addLoadRef } = require('./../utils/elementRefs')

function attachAudioControlListener() {
  const $audioControls = addLoadRef('audio-controls')
  return $audioControls.addEventListener('click', event => {
    if (!event.target.classList.value.includes('audio-button')) return
    if (!event.target.classList.value.includes('toggle')) {
      event.target.id === 'forward-skip'
        ? state.audio.skipTrack()
        : state.audio.skipTrack(true)
      return
    }
    if (!event.target.classList.value.includes('active')) {
      event.target.classList.add('active')
      if (event.target.id === 'continuous-play') state.audio.toggleSetting('continuous')
      else {
        state.audio.toggleSetting('shuffle')
      }
    }
    else {
      event.target.classList.remove('active')
      event.target.id === 'continuous-play' ? state.audio.toggleSetting('continuous') : state.audio.toggleSetting('shuffle')
    }
  })
}

module.exports = attachAudioControlListener
