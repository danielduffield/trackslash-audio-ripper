const minutes = 60 * 1000
const timeLimit = 20 * minutes

function populateQueue(active) {
  return active.then(dirInfo => {
    return dirInfo.map(dir => {
      dir.expiration = dir.stats.birthtimeMs + timeLimit - Date.now()
      dir.dl = new Promise((resolve, reject) => resolve(true))
      return dir
    })
  })
}

module.exports = populateQueue
