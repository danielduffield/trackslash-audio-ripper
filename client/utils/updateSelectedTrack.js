function updateSelectedTrack(tracklist, selected) {
  console.log('UPDATING TRACK')
  const selectedIndex = tracklist.findIndex(track => track.trackName === selected.trackName)
  if (selectedIndex === -1) return
  resetSelected(tracklist.length)
  const $selected = document.getElementById('track-final-' + (selectedIndex + 1))
  $selected.classList.add('selected')
}

function resetSelected(tracklistLength) {
  for (let i = 1; i <= tracklistLength; i++) {
    const $track = document.getElementById('track-final-' + i)
    console.log($track)
    console.log($track.classList)
    console.log($track.classList.value)
    console.log($track.classList.value.includes('selected'))
    if ($track.classList.value.includes('selected')) $track.classList.remove('selected')
  }
}

module.exports = updateSelectedTrack
