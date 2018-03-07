const state = require('./state')

const loadElementRef = elId => {
  console.log(state)
  return state.elementRefs[elId]
}

const addLoadRef = elId => (
  Object.keys(state.elementRefs).includes(elId)
    ? loadElementRef(elId)
    : setOverwriteRef(elId)
)

const setOverwriteRef = elId => {
  state.elementRefs[elId] = document.getElementById(elId)
  return state.elementRefs[elId]
}

module.exports = { addLoadRef, setOverwriteRef }
