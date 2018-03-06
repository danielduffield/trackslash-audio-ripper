function submitTracklist(form, numOfTracks) {
  const tracklist = []
  const fields = [
    { name: 'num', property: 'trackNum' },
    { name: 'name', property: 'trackName' },
    { name: 'start', property: 'trackStart' },
    { name: 'end', property: 'trackEnd' },
  ]

  for (let i = 1; i < numOfTracks; i++) {
    const track = {}
    fields.forEach(field => {
      track[field.property] = form.get(`track-${field.name}-${i}`)
    })
    tracklist.push(track)
  }

  return tracklist
}

module.exports = submitTracklist
