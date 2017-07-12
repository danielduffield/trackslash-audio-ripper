const moment = require('moment')

function processMetadata(data) {
  const keyData = {}
  const timeCodeLines = findTimeCodes(data.description)
  keyData.videoTitle = data.title
  keyData.videoId = data.video_id
  keyData.videoImage = 'https://img.youtube.com/vi/' + data.video_id + '/maxresdefault.jpg'
  keyData.timeCodes = extractTimeCodes(timeCodeLines)
  keyData.videoLength = secondsToHours(data.length_seconds)
  keyData.description = data.description
  return keyData
}

function extractTimeCodes(parsedDescription) {
  const timeCodes = []
  parsedDescription.forEach(row => {
    row.forEach(string => {
      if (string.includes(':')) {
        timeCodes.push(string)
      }
    })
  })
  return timeCodes
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
    return (row.includes(' - ') && row.includes(':'))
  })
  const reversed = newlineSplit.slice()
  reversed.reverse()
  const lastLine = reversed.findIndex(row => {
    return (row.includes(' - ') && row.includes(':'))
  })
  const endIndex = (newlineSplit.length - 1) - lastLine
  const timestampedRows = newlineSplit.splice(startIndex, (endIndex - startIndex))
  const parsed = []
  timestampedRows.forEach(row => {
    parsed.push(row.split(' '))
  })
  return parsed
}
