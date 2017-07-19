const createElement = require('./createElement')

function createTracklistTable() {
  const $formTable =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'tracklist-download'}, '', [
      createElement('h3', {id: 'final-album-title'}, '', []),
      createElement('table', {class: 'table table-bordered'}, '', [
        createElement('thead', {}, '', [
          createElement('tr', {class: 'thead-row'}, '', [
            createElement('th', {}, 'Num', []),
            createElement('th', {}, 'Name', []),
            createElement('th', {}, 'Start', []),
            createElement('th', {}, 'End', []),
            createElement('th', {}, 'DL', [])
          ])
        ]),
        createElement('tbody', {id: 'track-final-container'}, '', [])
      ]),
      createElement('input', {id: 'start-over-button', class: 'form-button', type: 'button', value: 'Start Over'}, '', []),
      createElement('form', {id: 'download-all-form', method: 'get'}, '', [
        createElement('input', {id: 'download-all-button', class: 'form-button', type: 'submit', value: 'Download All'}, '', [])
      ])
    ])
  ])
  return $formTable
}

module.exports = createTracklistTable
