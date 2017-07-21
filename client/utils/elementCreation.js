function createElement(tagName, attributes, content, $children) {
  const $element = document.createElement(tagName)
  $element.textContent = content
  for (const key in attributes) {
    $element.setAttribute(key, attributes[key])
  }
  $children.forEach($child => {
    $element.appendChild($child)
  })
  return $element
}

function createFormTable() {
  const $formTable =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'create-tracklist'}, '', [
      createElement('div', {id: 'video-image-tracklist-form', class: 'video-image'}, '', []),
      createElement('h3', {id: 'youtube-video-title'}, '', []),
      createElement('div', {id: 'tracklist-control-container'}, '', [
        createElement('button', {id: 'load-timecodes-button', class: 'tracklist-control-button'}, 'Load Timecodes', []),
        createElement('button', {id: 'submit-timecodes-button', class: 'tracklist-control-button'}, 'Submit Timecodes', []),
        createElement('button', {id: 'reset-tracklist-button', class: 'tracklist-control-button'}, 'Reset Tracklist', [])
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
        createElement('input', {id: 'track-form-add-button', class: 'form-button', type: 'button', value: 'Add Track'}, '', []),
        createElement('input', {id: 'track-form-submit-button', class: 'form-button', type: 'submit', value: 'Start Slicing'}, '', [])
      ])
    ])
  ])
  return $formTable
}

function createTracklistTable() {
  const $formTable =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'tracklist-download'}, '', [
      createElement('div', {id: 'video-image-tracklist-final', class: 'video-image'}, '', []),
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

function createTimecodeForm(videoTitle) {
  const $timecodeForm =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'submit-timecodes'}, '', [
      createElement('div', {id: 'video-image-timecode-form', class: 'video-image'}, '', []),
      createElement('h3', {id: 'timecode-video-title'}, videoTitle, []),
      createElement('div', {class: 'timecode-submit-input'}, '', [
        createElement('h5', {id: 'timecode-subtitle', class: 'subtitle'}, 'Copy and Paste Timecodes', []),
        createElement('textarea', {id: 'timecode-input-box', name: 'timecodes-textarea', cols: '70', rows: '10'}, '', []),
        createElement('br', {}, '', []),
        createElement('button', {id: 'timecode-submit-button', class: 'form-button'}, 'Submit', []),
        createElement('button', {id: 'timecode-cancel-button', class: 'form-button'}, 'Cancel', [])
      ])
    ])
  ])
  return $timecodeForm
}

module.exports = {
  createElement: createElement,
  createFormTable: createFormTable,
  createTracklistTable: createTracklistTable,
  createTimecodeForm: createTimecodeForm
}