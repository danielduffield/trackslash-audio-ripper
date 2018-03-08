const state = require('./../state/state')

const Audio = require('./../components/audio')

const createElement = require('./../utils/createElement')

const { loadRef, relabelRef } = require('./../state/elementRefs')

const createTrackForm = require('./../renders/trackForm')

const columns = ['Num', 'Name', 'Start', 'End', 'DL']
const $tableColumns = columns.map(col => createElement('th', col))
state.audio = new Audio()

class TracklistForm {
  constructor() {
    this.tracklist = null
  }

  addTrackForm(currentTrack) {
    const $trackFormContainer = loadRef('track-form-container')
    $trackFormContainer.appendChild(createTrackForm(currentTrack))
    loadRef(`track-delete-${currentTrack}`)
  }

  deleteTrack(trackNumber, totalTracks) {
    const $container = loadRef('track-form-container')
    const $toBeDeleted = document.querySelector('.track-form-' + trackNumber)
    $container.removeChild($toBeDeleted)

    this.adjustTrackNums(trackNumber, totalTracks)
  }

  adjustTrackNums(deletedIndex, tracklistLength) {
    const formFields = ['num', 'name', 'start', 'end', 'delete']

    for (let i = deletedIndex + 1; i <= tracklistLength; i++) {
      const $relabelForm = document.querySelector(`.track-form-${i}`)
      $relabelForm.setAttribute('class', `track-form-${i - 1}`)

      formFields.forEach((field, fieldIndex) => {
        const $form = relabelRef(`track-${field}-${i}`)
        $form.setAttribute('id', `track-${field}-${i - 1}`)
        $form.setAttribute('name', `track-${field}-${i - 1}`)
      })
    }
  }

  resetTracklist() {
    const $tracklistError = loadRef('tracklist-error-message-container')
    const $trackFormContainer = loadRef('track-form-container')
    const $trackFinalContainer = loadRef('track-final-container')

    $tracklistError.textContent = ''
    $trackFormContainer.innerHTML = ''
    state.currentTrack = 1
    this.addTrackForm(state.currentTrack)
    state.currentTrack += 1
    $trackFinalContainer.innerHTML = ''
  }

  render() {
    return (
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
  }
}

module.exports = TracklistForm
