const state = require('./state')

const loadElementRef = elId => {
  return state.elementRefs[elId]
}

const addLoadRef = elId => {
  return Object.keys(state.elementRefs).includes(elId)
    ? loadElementRef(elId)
    : setOverwriteRef(elId)
}

const setOverwriteRef = elId => {
  state.elementRefs[elId] = document.getElementById(elId)
  return state.elementRefs[elId]
}

module.exports = { addLoadRef, setOverwriteRef }
