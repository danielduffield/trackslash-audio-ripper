const state = require('./state')

const loadRef = elId => {
  return state.elementRefs[elId]
}

const setRef = (elId, ref) => {
  state.elementRefs[elId] = ref
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

module.exports = { loadRef, relabelRef, setOverwriteRef, setRef }
