function removeNonTimeChars(timecode) {
  const unfiltered = timecode.split('')
  const filteredTime = unfiltered
    .filter(char => {
      return (!isNaN(char) || char === ':')
    })
    .join('')
  return filteredTime
}

function conformTimecode(timecode) {
  const onlyTime = removeNonTimeChars(timecode)
  const splitTime = onlyTime.split(':')
  switch (splitTime.length) {
    case 2:
      if (splitTime[0].length < 2) {
        splitTime[0] = '0' + splitTime[0]
      }
      splitTime.unshift('00')
      break
    case 3:
      if (splitTime[0].length < 2) {
        splitTime[0] = '0' + splitTime[0]
      }
      break
  }
  return splitTime.join(':')
}

module.exports = conformTimecode
