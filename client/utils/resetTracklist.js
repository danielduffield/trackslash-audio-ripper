function resetTracklist() {
  console.log('Resetting')
  const $trackFormContainer = document.getElementById('track-form-container')
  console.log('track form container: ', $trackFormContainer)
  let resetIndex = 1
  let $trackForm = document.querySelector('.track-form-' + resetIndex)
  console.log('first track: ', $trackForm)
  while ($trackForm) {
    console.log('trackform to be removed: ', $trackForm)
    $trackFormContainer.removeChild($trackForm)
    resetIndex++
    console.log('reset index: ', resetIndex)
    $trackForm = document.querySelector('.track-form-' + resetIndex)
    console.log('next trackform to remove: ', $trackForm)
  }
}

module.exports = resetTracklist
