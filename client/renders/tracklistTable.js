const state = require('./../state/state')

const AudioModule = require('./../components/audioModule')

const createElement = require('./../utils/createElement')

const columns = ['Num', 'Name', 'Start', 'End', 'DL']
const $tableColumns = columns.map(col => createElement('th', col))
state.audio = new AudioModule()

const createTracklistTable = () => (
  createElement('row', [
    ['div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'tracklist-download'}, [
      ['div', {id: 'video-image-tracklist-final', class: 'video-image hidden'}],
      ['h3', {id: 'final-album-title'}],
      state.audio.render(),
      ['table', {class: 'table table-bordered'}, [
        ['thead', [
          ['tr', {class: 'thead-row'}, [
            ...$tableColumns
          ]]
        ]],
        ['tbody', {id: 'track-final-container'}]
      ]],
      ['input', {id: 'start-over-button', class: 'form-button', type: 'button', value: 'Start Over'}],

      ['span', {id: 'download-all-container'}, [
        ['form', {id: 'download-all-form', method: 'get'}, [
          ['input', {id: 'download-all-button', class: 'form-button', type: 'submit', value: 'Download All'}]
        ]]
      ]]
    ]]
  ])
)

module.exports = createTracklistTable()
