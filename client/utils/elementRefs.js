const elementRefs = {}

const loadElementRef = elId => elementRefs[elId]

const addLoadRef = elId => (
  Object.keys(elementRefs).includes(elId)
    ? loadElementRef(elId)
    : setOverwriteRef(elId)
)

const setOverwriteRef = elId => {
  elementRefs[elId] = document.getElementById(elId)
  return elementRefs[elId]
}

module.exports = { addLoadRef, setOverwriteRef }
