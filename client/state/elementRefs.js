const state = require('./state')

const loadRef = elId => {
  console.log('loading ref')
  return state.elementRefs[elId]
}

const setRef = (elId, ref) => {
  console.log('Setting ref at creation')
  state.elementRefs[elId] = ref
}

const setOverwriteRef = elId => {
  console.log('setting overwrite')
  state.elementRefs[elId] = document.getElementById(elId)
  return state.elementRefs[elId]
}

const relabelRef = elId => {
  console.log('relabeling ref')
  const ref = state.elementRefs[elId]
  const split = elId.split('-')
  const newTrackNum = parseInt(split.pop(), 10) - 1
  const newId = [...split, newTrackNum].join('-')
  if (!ref) console.log(elId)
  state.elementRefs[newId] = ref
  return state.elementRefs[newId]
}

module.exports = { loadRef, relabelRef, setOverwriteRef, setRef }
