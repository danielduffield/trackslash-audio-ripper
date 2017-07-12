const moment = require('moment')

function processMetadata(data) {
  const keyData = {}
  const timeCodeRows = findTimeCodes(data.description)
  keyData.videoTitle = data.title
  keyData.videoId = data.video_id
  keyData.videoImage = 'https://img.youtube.com/vi/' + data.video_id + '/maxresdefault.jpg'
  keyData.timeCodes = extractTimeCodes(timeCodeRows)
  keyData.videoLength = secondsToHours(data.length_seconds)
  keyData.description = data.description
  return keyData
}

function secondsToHours(seconds) {
  const tempTime = moment.duration(seconds * 1000)
  const time = {}
  time.hours = tempTime.hours()
  time.minutes = tempTime.minutes()
  time.seconds = tempTime.seconds()
  return time
}

module.exports = processMetadata

function findTimeCodes(description) {
  const newlineSplit = description.split('\n')
  const startIndex = newlineSplit.findIndex(row => {
    return (row.includes(':') && !row.includes('Tracks') && !row.includes('tracks'))
  })
  const reversed = newlineSplit.slice()
  reversed.reverse()
  const lastLine = reversed.findIndex(row => {
    return (row.includes(':') && !row.includes('Tracks') && !row.includes('tracks'))
  })
  const endIndex = (newlineSplit.length - 1) - lastLine
  const timeStampedRows = newlineSplit.splice(startIndex, (endIndex - startIndex))
  return timeStampedRows
}

function extractTimeCodes(rowsWithCodes) {
  const timeCodes = []
  rowsWithCodes.forEach(row => {
    const spaceSplit = row.split(' ')
    spaceSplit.forEach(string => {
      if (string.includes(':')) {
        timeCodes.push(string)
      }
    })
  })
  return timeCodes
}
