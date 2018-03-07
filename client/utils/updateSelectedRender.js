const { addLoadRef } = require('./../state/elementRefs')

function updateSelectedRender(tracklist, selected) {
  const selectedIndex = tracklist.findIndex(track => track.trackName === selected.trackName)
  if (selectedIndex === -1) return
  resetSelected(tracklist.length)
  const $selected = addLoadRef(`track-final-${selectedIndex + 1}`)
  $selected.classList.add('selected')
}

function resetSelected(tracklistLength) {
  for (let i = 1; i <= tracklistLength; i++) {
    const $track = addLoadRef(`track-final-${i}`)
    if ($track.classList.value.includes('selected')) $track.classList.remove('selected')
  }
}

module.exports = updateSelectedRender
