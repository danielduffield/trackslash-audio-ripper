const createElement = require('./elementCreation').createElement

function addTrackForm(currentTrack) {
  const $trackFormContainer = document.getElementById('track-form-container')
  $trackFormContainer.appendChild(createTrackForm(currentTrack))
  appendDeleteButton(currentTrack)
}

function createTrackForm(currentTrack) {
  const trackFormFields = ['num', 'name', 'start', 'end']
  const $trackForm = createElement('tr', {class: 'track-form-' + currentTrack}, '', [])

  for (let i = 0; i < trackFormFields.length; i++) {
    const $tableCell = createElement('td', {}, '', [])
    const $trackFormField = createElement('input', {
      id: 'track-' + trackFormFields[i] + '-' + currentTrack,
      name: 'track-' + trackFormFields[i] + '-' + currentTrack
    }, '', [])

    $tableCell.appendChild($trackFormField)
    $trackForm.appendChild($tableCell)
  }
  return $trackForm
}

function appendDeleteButton(currentTrack) {
  const $trackForm = document.querySelector('.track-form-' + currentTrack)
  const $deleteButton = createElement('td', {}, '', [
    createElement('button', {id: 'track-delete-' + currentTrack, class: 'delete-button', type: 'button'}, 'X', [])
  ])

  $trackForm.appendChild($deleteButton)
}

module.exports = addTrackForm
