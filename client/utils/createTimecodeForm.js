const createElement = require('./createElement.js')

function createTimecodeForm() {
  const $timecodeForm =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'create-tracklist'}, '', [
      createElement('h3', {id: 'timecode-video-title'}, '', []),
      createElement('div', {class: 'timecode-submit-input'}, '', [
        createElement('h5', {id: 'timecode-subtitle', class: 'subtitle'}, 'Copy and Paste Timecodes', []),
        createElement('textarea', {id: 'timecode-input-box', name: 'timecodes-textarea', cols: '70', rows: '10'}, '', []),
        createElement('br', {}, '', []),
        createElement('button', {id: 'timecode-submit-btn', class: 'form-button'}, 'Submit', []),
        createElement('button', {id: 'timecode-cancel-btn', class: 'form-button'}, 'Cancel', [])
      ])
    ])
  ])
  return $timecodeForm
}

module.exports = createTimecodeForm
