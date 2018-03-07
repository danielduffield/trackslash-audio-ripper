const createElement = require('./../utils/elementCreation')

const createTimecodeForm = videoTitle => (
  createElement('row', [
    ['div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'submit-timecodes'}, [
      ['div', {id: 'video-image-timecode-form', class: 'video-image hidden'}],
      ['h3', {id: 'timecode-video-title'}, videoTitle],
      ['div', {class: 'timecode-submit-input'}, [
        ['h5', {id: 'timecode-subtitle', class: 'subtitle'}, 'Copy and Paste Timecodes'],
        ['div', {id: 'timecode-error-message-container', class: 'error-message'}],
        ['textarea', {id: 'timecode-input-box', name: 'timecodes-textarea', cols: '70', rows: '10'}],
        ['br'],
        ['button', {id: 'timecode-submit-button', class: 'form-button'}, 'Submit'],
        ['button', {id: 'timecode-cancel-button', class: 'form-button'}, 'Cancel']
      ]]
    ]]
  ])
)

module.exports = createTimecodeForm()
