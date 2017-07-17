function resetTracklist() {
  const $trackFormContainer = document.getElementById('trackFormContainer')
  let resetIndex = 1
  let $trackForm = document.getElementById('track-form-' + resetIndex)
  while ($trackForm) {
    $trackFormContainer.removeChild($trackForm)
    resetIndex++
    $trackForm = document.getElementById('track-form-' + resetIndex)
  }
}

module.exports = resetTracklist
