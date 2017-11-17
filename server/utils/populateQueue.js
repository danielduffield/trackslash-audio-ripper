const minutes = 60 * 1000
const timeLimit = 20 * minutes

function populateQueue(active) {
  const queue = {}
  active.forEach(dir => {
    const entry = {}
    entry.expiration = Date.now() + timeLimit
    entry.dl = Promise.resolve(true)
    queue[dir.fileName] = entry
  })
  console.log('QUEUE: ', queue)
  return queue
}

module.exports = populateQueue
