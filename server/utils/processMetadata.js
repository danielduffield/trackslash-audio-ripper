const moment = require('moment')

function processMetadata(data) {
  const keyData = {}
  const timeCodeRows = findTimeCodes(data.description)

  keyData.videoTitle = data.title
  keyData.videoId = data.video_id
  keyData.videoImage = 'https://img.youtube.com/vi/' + data.video_id + '/hqdefault.jpg'
  keyData.timeCodes = extractTimeCodes(timeCodeRows)
  keyData.videoLength = secondsToTimeObject(data.length_seconds)
  keyData.videoLengthString = secondsToTimeString(data.length_seconds)
  keyData.description = data.description
  return keyData
}

function secondsToTimeObject(seconds) {
  const tempTime = moment.duration(seconds * 1000)
  const time = {}

  time.hours = tempTime.hours()
  time.minutes = tempTime.minutes()
  time.seconds = tempTime.seconds()

  return time
}

function secondsToTimeString(seconds) {
  const tempTime = moment.duration(seconds * 1000)
  const time = {}

  time.hours = tempTime.hours()
  time.minutes = tempTime.minutes()
  time.seconds = tempTime.seconds()

  if (time.minutes < 10) {
    time.minutes = '0' + time.minutes.toString()
  }
  if (time.seconds < 10) {
    time.seconds = '0' + time.seconds.toString()
  }

  const timeString = time.hours + ':' + time.minutes + ':' + time.seconds
  return timeString
}

function findTimeCodes(description) {
  const newlineSplit = description.split('\n')
  const startIndex = newlineSplit.findIndex(row => {
    return /\d:\d\d/.test(row)
  })
  const reversed = newlineSplit.slice()
  reversed.reverse()
  const lastLine = reversed.findIndex(row => {
    return /\d:\d\d/.test(row)
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

module.exports = processMetadata
