const addTrackForm = require('./utils/addTrackForm.js')
const autoGenerateTracklist = require('./utils/autoGenerateTracklist.js')
const autofillTracklistForms = require('./utils/autofillTracklistForms.js')
const deleteTrack = require('./utils/deleteTrack.js')
const { addLoadRef, generateInitialRefs } = require('./utils/elementRefs')
const state = require('./state/state')
const attachListeners = require('./listeners/index.js')

const $formTable = require('./components/formTable')
const $tracklistTable = require('./components/tracklistTable')
const $timecodeForm = require('./components/timecodeForm')

const HashRouter = require('./utils/hashRouter.js')

document.body.appendChild($formTable)
document.body.appendChild($tracklistTable)
document.body.appendChild($timecodeForm)

const {
  $urlInput,
  $trackFormContainer,
  $demoNotice,
  $tracklistForm,
  $loadTimecodesBtn,
  $tracklistError,
  $timecodeError,
  $submitTimecodesButton,
  $timecodeSubmitBtn,
  $timecodeCancelBtn,
  $timecodeInputBox,
  $audioControls
} = generateInitialRefs()

$urlInput.focus()
const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

router.listen()
router.match(window.location.hash)

$demoNotice.textContent = state.demo ? '*To comply with Heroku policy, file download is disabled in this demonstration.' : ''

state.listeners = attachListeners()

$loadTimecodesBtn.addEventListener('click', () => {
  $trackFormContainer.innerHTML = ''
  state.currentTrack = 1
  addTrackForm(state.currentTrack)
  state.currentTrack += 1
  if (state.albumMetadata.timeCodes.length > 1) {
    const autoTracklist = autoGenerateTracklist(state.albumMetadata.description, state.albumMetadata.videoLengthString)
    state.currentTrack = autoTracklist.length + 1
    autofillTracklistForms(autoTracklist)
  }
  else {
    $tracklistError.textContent = '* No timecodes found in video description. Use "Submit Timecodes."'
  }
})

$submitTimecodesButton.addEventListener('click', () => {
  $tracklistError.textContent = ''
  $timecodeInputBox.value = ''
  const $timecodeTitle = addLoadRef('timecode-video-title')
  $timecodeTitle.textContent = state.albumMetadata.videoTitle + ' [' + state.albumMetadata.videoLengthString + ']'
  window.location.hash = '#submit-timecodes' + '?id=' + state.albumMetadata.videoId
})

$timecodeCancelBtn.addEventListener('click', () => {
  $timecodeError.textContent = ''
  window.location.hash = '#create-tracklist' + '?id=' + state.albumMetadata.videoId
})

$timecodeSubmitBtn.addEventListener('click', () => {
  const descriptionRows = $timecodeInputBox.value.split('\n')
  const timecodedRows = descriptionRows.filter(row => {
    return /\d:\d\d/.test(row)
  })
  if (timecodedRows.length < 2) {
    $timecodeError.textContent = '* Timecodes not found.'
    return false
  }
  $timecodeError.textContent = ''
  $trackFormContainer.innerHTML = ''
  state.currentTrack = 1
  addTrackForm(state.currentTrack)
  window.location.hash = '#create-tracklist' + '?id=' + state.albumMetadata.videoId
  const pastedTracklist = autoGenerateTracklist($timecodeInputBox.value, state.albumMetadata.videoLengthString)
  state.currentTrack += pastedTracklist.length
  autofillTracklistForms(pastedTracklist)
})

$tracklistForm.addEventListener('click', event => {
  if (!event.target.id.includes('track-delete-')) return false
  const firstTrackDigitIndex = 13
  const trackNumber = parseInt(event.target.id.substring(firstTrackDigitIndex, event.target.id.length), 10)
  if (trackNumber && /\d/.test(trackNumber)) {
    const numberOfTracks = state.currentTrack - 1
    deleteTrack(trackNumber, numberOfTracks)
    state.currentTrack -= 1
  }
})

$audioControls.addEventListener('click', event => {
  if (!event.target.classList.value.includes('audio-button')) return
  if (!event.target.classList.value.includes('toggle')) {
    event.target.id === 'forward-skip'
      ? state.audio.skipTrack()
      : state.audio.skipTrack(true)
    return
  }
  if (!event.target.classList.value.includes('active')) {
    event.target.classList.add('active')
    if (event.target.id === 'continuous-play') state.audio.toggleSetting('continuous')
    else {
      state.audio.toggleSetting('shuffle')
    }
  }
  else {
    event.target.classList.remove('active')
    event.target.id === 'continuous-play' ? state.audio.toggleSetting('continuous') : state.audio.toggleSetting('shuffle')
  }
})
