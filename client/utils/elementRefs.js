const elementRefs = {}

const loadElementRef = elId => {
  console.log('Loading ref: ', elId)
  return elementRefs[elId]
}

const addLoadRef = elId => (
  Object.keys(elementRefs).includes(elId)
    ? loadElementRef(elId)
    : setOverwriteRef(elId)
)

const setOverwriteRef = elId => {
  console.log('Setting ref: ', elId)
  elementRefs[elId] = document.getElementById(elId)
  return elementRefs[elId]
}

module.exports = { addLoadRef, setOverwriteRef }
