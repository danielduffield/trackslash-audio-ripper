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

const relabelRef = elId => {
  const ref = state.elementRefs[elId]
  const split = elId.split('-')
  const newTrackNum = parseInt(split.pop(), 10) - 1
  const newId = [...split, newTrackNum].join('-')
  if (!ref) console.log(elId)
  state.elementRefs[newId] = ref
  return state.elementRefs[newId]
}

module.exports = { addLoadRef, relabelRef, setOverwriteRef }
