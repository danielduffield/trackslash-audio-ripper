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

const $audioPlayer = createElement('audio', { id: 'audio-player', controls: '', controlsList: 'nodownload', src: '' }, '', [])
$audioPlayer.addEventListener('contextmenu', e => e.preventDefault())
const $audioModule = createElement('div', { id: 'audio-module' }, '', [
  createElement('div', { id: 'now-playing-container' }, ' ', [
    createElement('span', { id: 'now-playing' }, '', [])
  ]),
  $audioPlayer,
  createElement('div', { id: 'audio-controls' }, '', [
    createElement('i', { class: 'fa fa-refresh' }, '', [])
  ])
])

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

function createTracklistTable() {
  const $formTable =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'tracklist-download'}, '', [
      createElement('div', {id: 'video-image-tracklist-final', class: 'video-image hidden'}, '', []),
      createElement('h3', {id: 'final-album-title'}, '', []),
      $audioModule,
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

      createElement('span', {id: 'download-all-container'}, '', [
        createElement('form', {id: 'download-all-form', method: 'get'}, '', [
          createElement('input', {id: 'download-all-button', class: 'form-button', type: 'submit', value: 'Download All'}, '', [])
        ])
      ])
    ])
  ])
  return $formTable
}

function createTimecodeForm(videoTitle) {
  const $timecodeForm =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'submit-timecodes'}, '', [
      createElement('div', {id: 'video-image-timecode-form', class: 'video-image hidden'}, '', []),
      createElement('h3', {id: 'timecode-video-title'}, videoTitle, []),
      createElement('div', {class: 'timecode-submit-input'}, '', [
        createElement('h5', {id: 'timecode-subtitle', class: 'subtitle'}, 'Copy and Paste Timecodes', []),
        createElement('div', {id: 'timecode-error-message-container', class: 'error-message'}, '', []),
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
