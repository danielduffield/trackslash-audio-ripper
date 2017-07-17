function submitTracklist(form, numOfTracks) {
  const tracklist = []
  for (let i = 1; i < numOfTracks; i++) {
    const trackNumber = i
    const track = {
      trackNum: form.get('track-num-' + trackNumber),
      trackName: form.get('track-name-' + trackNumber),
      trackStart: form.get('track-start-' + trackNumber),
      trackEnd: form.get('track-end-' + trackNumber)
    }
    tracklist.push(track)
  }
  return tracklist
}

module.exports = submitTracklist
