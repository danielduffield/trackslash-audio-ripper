const createElement = require('./../utils/elementCreation')

const columns = ['Num', 'Name', 'Start', 'End', 'DL']
const $tableColumns = columns.map(col => createElement('th', col))

const createFormTable = () => (
  createElement('row', [
    ['div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'create-tracklist'}, [
      ['div', {id: 'video-image-tracklist-form', class: 'video-image hidden'}],
      ['h3', {id: 'youtube-video-title'}],
      ['p', {id: 'album-download-progress'}, 'Album downloading initializing...'],
      ['div', {id: 'tracklist-control-container'}, [
        ['button', {id: 'load-timecodes-button', class: 'tracklist-control-button', title: 'Load timecodes from YouTube description.'}, 'Load Timecodes'],
        ['button', {id: 'submit-timecodes-button', class: 'tracklist-control-button', title: 'Submit timecodes via copy and paste.'}, 'Submit Timecodes'],
        ['button', {id: 'reset-tracklist-button', class: 'tracklist-control-button', title: 'Delete all tracks.'}, 'Reset Tracklist'],
        ['div', {id: 'tracklist-error-message-container', class: 'error-message'}]
      ]],
      ['form', {id: 'tracklist-form'}, [
        ['table', {class: 'table table-bordered'}, [
          ['thead', [
            ['tr', {class: 'thead-row'}, [
              ...$tableColumns
            ]]
          ]],
          ['tbody', {id: 'track-form-container'}]
        ]],
        ['p', { id: 'track-progress-container' }, [
          ['i', { id: 'spinner', class: 'fa fa-spinner spinner hidden' }],
          ['span', { id: 'track-slice-progress' }]
        ]],
        ['input', {id: 'track-form-add-button', class: 'form-button', type: 'button', value: 'Add Track'}],
        ['input', {id: 'track-form-submit-button', class: 'form-button', type: 'submit', value: 'Start Slicing'}]
      ]]
    ]]
  ])
)

module.exports = createFormTable()
