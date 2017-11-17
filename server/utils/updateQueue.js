const removeExpired = require('./removeExpired.js')

function updateQueue(queue) {
  const updated = {}
  const toDelete = []
  Object.keys(queue).forEach(download => {
    if (queue[download].expiration < Date.now()) {
      toDelete.push(download)
    }
    else updated[download] = queue[download]
  })
  console.log('UPDATED: ', updated)
  console.log('TO DELETE: ', toDelete)
  removeExpired(toDelete)
  return updated
}

module.exports = updateQueue
