const state = require('./../state/state')

const addListener = (name, listener) => {
  listener()
  state.listeners[name] = true
}

module.exports = addListener
