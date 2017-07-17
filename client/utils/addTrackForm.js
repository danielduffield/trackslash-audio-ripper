const createTrackForm = require('./createTrackForm.js')

function addTrackForm(currentTrack) {
  const $trackFormContainer = document.getElementById('track-form-container')
  $trackFormContainer.appendChild(createTrackForm(currentTrack))
}

module.exports = addTrackForm
