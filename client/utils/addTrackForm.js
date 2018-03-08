const { loadRef } = require('./../state/elementRefs')

const createTrackForm = require('./../renders/trackForm')

let $trackFormContainer

function addTrackForm(currentTrack) {
  if (!$trackFormContainer) {
    $trackFormContainer = loadRef('track-form-container')
  }
  $trackFormContainer.appendChild(createTrackForm(currentTrack))
  loadRef(`track-delete-${currentTrack}`)
}

module.exports = addTrackForm
