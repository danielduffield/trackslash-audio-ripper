const { addLoadRef, setOverwriteRef } = require('./../state/elementRefs')

let $container

function deleteTrack(trackNumber, totalTracks) {
  if (!$container) {
    $container = addLoadRef('track-form-container')
  }
  const $toBeDeleted = document.querySelector('.track-form-' + trackNumber)
  $container.removeChild($toBeDeleted)

  adjustTrackNums(trackNumber, totalTracks)
}

function adjustTrackNums(deletedIndex, tracklistLength) {
  const formFields = ['num', 'name', 'start', 'end', 'delete']

  for (let i = deletedIndex + 1; i <= tracklistLength; i++) {
    const $relabelForm = document.querySelector(`.track-form-${i}`)
    $relabelForm.setAttribute('class', `track-form-${i - 1}`)

    formFields.forEach((field, fieldIndex) => {
      const $form = setOverwriteRef(`track-${field}-${i}`)
      $form.setAttribute('id', `track-${field}-${i - 1}`)
      $form.setAttribute('name', `track-${field}-${i - 1}`)
    })
  }
}

module.exports = deleteTrack
