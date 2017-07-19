const createElement = require('./createElement')

function createFormTable() {
  const $formTable =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'create-tracklist'}, '', [
      createElement('h3', {id: 'youtube-video-title'}, '', []),
      createElement('form', {id: 'tracklist-form'}, '', [
        createElement('table', {class: 'table table-bordered'}, '', [
          createElement('thead', {}, '', [
            createElement('tr', {class: 'thead-row'}, '', [
              createElement('th', {}, 'Num', []),
              createElement('th', {}, 'Name', []),
              createElement('th', {}, 'Start', []),
              createElement('th', {}, 'End', [])
            ])
          ]),
          createElement('tbody', {id: 'track-form-container'}, '', [])
        ]),
        createElement('input', {id: 'track-form-add-button', class: 'form-button', type: 'button', value: 'Add Track'}, '', []),
        createElement('input', {id: 'track-form-submit-button', class: 'form-button', type: 'submit', value: 'Start Slicing'}, '', [])
      ])
    ])
  ])
  return $formTable
}

module.exports = createFormTable
