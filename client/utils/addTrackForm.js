const { addLoadRef } = require('./../state/elementRefs')

const createTrackForm = require('./../renders/trackForm')

let $trackFormContainer

function addTrackForm(currentTrack) {
  if (!$trackFormContainer) {
    $trackFormContainer = addLoadRef('track-form-container')
  }
  $trackFormContainer.appendChild(createTrackForm(currentTrack))
  addLoadRef(`track-delete-${currentTrack}`)
}

module.exports = addTrackForm
