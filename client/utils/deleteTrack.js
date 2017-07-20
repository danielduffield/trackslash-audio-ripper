function deleteTrack(trackNumber, totalTracks) {
  const $container = document.getElementById('track-form-container')
  const $toBeDeleted = document.querySelector('.track-form-' + trackNumber)
  $container.removeChild($toBeDeleted)

  const formFields = ['num', 'name', 'start', 'end', 'delete']
  for (let i = trackNumber + 1; i <= totalTracks; i++) {
    const $relabelForm = document.querySelector('.track-form-' + i)
    $relabelForm.setAttribute('class', 'track-form-' + i)

    formFields.forEach((field, fieldIndex) => {
      const $form = document.getElementById('track-' + field + '-' + i)
      $form.setAttribute('id', 'track-' + field + '-' + (i - 1))
      $form.setAttribute('name', 'track-' + field + '-' + (i - 1))
    })
  }
}

module.exports = deleteTrack
