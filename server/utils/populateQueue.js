const minutes = 60 * 1000
const timeLimit = 20 * minutes

function populateQueue(active) {
  active.then(dirInfo => {
    return dirInfo.map(dir => {
      dir.expiration = dir.stats.birthtimeMs + timeLimit - Date.now()
      return dir
    })
  }).then(withEx => console.log('Populated queue with... ', withEx))
}

module.exports = populateQueue
