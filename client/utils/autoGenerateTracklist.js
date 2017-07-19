const conformTimecode = require('./conformTimecode.js')

function setAutoEndTimes(tracklist, videoLength) {
  tracklist.reverse()
  tracklist[0].trackEnd = videoLength

  for (let i = 1; i < tracklist.length; i++) {
    tracklist[i].trackEnd = tracklist[i - 1].trackStart
  }
  tracklist.reverse()
  return tracklist
}

function removeTrackNumFromName(trackName) {
  const split = trackName.split(' ')
  if (/\d[.]/.test(split[0])) {
    split.shift()
  }
  return split.join(' ')
}

function autoGenerateTracklist(description, videoDuration) {
  console.log('description: ', description)
  const descriptionRows = description.split('\n')
  const timecodedRows = descriptionRows.filter(row => {
    return /\d:\d\d/.test(row)
  })
  const tracklist = []
  timecodedRows.forEach((row, index) => {
    const autoTrack = {}
    const rowFragments = row.split(' ')

    autoTrack.trackNum = index + 1

    const nameFragments = rowFragments
      .filter(rowFragment => !/\d:\d\d/.test(rowFragment) && rowFragment !== '-')
    const rowName = nameFragments.join(' ')
    const finalName = removeTrackNumFromName(rowName)
    autoTrack.trackName = finalName

    const rowTimecodes = rowFragments.filter(rowFragment => /\d:\d\d/.test(rowFragment))
    const conformed = conformTimecode(rowTimecodes[0])

    autoTrack.trackStart = conformed

    tracklist.push(autoTrack)
  })
  const conformedDuration = conformTimecode(videoDuration)
  const completeTracklist = setAutoEndTimes(tracklist, conformedDuration)
  return completeTracklist
}

module.exports = autoGenerateTracklist
