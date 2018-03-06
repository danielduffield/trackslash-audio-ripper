const createElement = require('./../utils/elementCreation')

function createFormTable() {
  const $formTable =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'create-tracklist'}, '', [
      createElement('div', {id: 'video-image-tracklist-form', class: 'video-image hidden'}, '', []),
      createElement('h3', {id: 'youtube-video-title'}, '', []),
      createElement('p', {id: 'album-download-progress'}, 'Album downloading initializing...', []),
      createElement('div', {id: 'tracklist-control-container'}, '', [
        createElement('button', {id: 'load-timecodes-button', class: 'tracklist-control-button', title: 'Load timecodes from YouTube description.'}, 'Load Timecodes', []),
        createElement('button', {id: 'submit-timecodes-button', class: 'tracklist-control-button', title: 'Submit timecodes via copy and paste.'}, 'Submit Timecodes', []),
        createElement('button', {id: 'reset-tracklist-button', class: 'tracklist-control-button', title: 'Delete all tracks.'}, 'Reset Tracklist', []),
        createElement('div', {id: 'tracklist-error-message-container', class: 'error-message'}, '', [])
      ]),
      createElement('form', {id: 'tracklist-form'}, '', [
        createElement('table', {class: 'table table-bordered'}, '', [
          createElement('thead', {}, '', [
            createElement('tr', {class: 'thead-row'}, '', [
              createElement('th', {}, 'Num', []),
              createElement('th', {}, 'Name', []),
              createElement('th', {}, 'Start', []),
              createElement('th', {}, 'End', []),
              createElement('th', {}, 'Delete', [])
            ])
          ]),
          createElement('tbody', {id: 'track-form-container'}, '', [])
        ]),
        createElement('p', { id: 'track-progress-container' }, '', [
          createElement('i', { id: 'spinner', class: 'fa fa-spinner spinner hidden' }, '', []),
          createElement('span', { id: 'track-slice-progress' }, '', [])
        ]),
        createElement('input', {id: 'track-form-add-button', class: 'form-button', type: 'button', value: 'Add Track'}, '', []),
        createElement('input', {id: 'track-form-submit-button', class: 'form-button', type: 'submit', value: 'Start Slicing'}, '', [])
      ])
    ])
  ])
  return $formTable
}

module.exports = createFormTable()
