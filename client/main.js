const sendTracklistPostRequest = require('./utils/sendTracklistPostRequest.js')
const submitTracklist = require('./utils/submitTracklist.js')
const addTrackForm = require('./utils/addTrackForm.js')
const getTracklistLinks = require('./utils/getTracklistLinks.js')
const renderTracklistLinks = require('./utils/renderTracklistLinks.js')
const buildTracklistFinal = require('./utils/buildTracklistFinal.js')
const autoGenerateTracklist = require('./utils/autoGenerateTracklist.js')
const autofillTracklistForms = require('./utils/autofillTracklistForms.js')
const deleteTrack = require('./utils/deleteTrack.js')
const socket = require('./utils/socketConnection')
const handleUrlSubmit = require('./utils/handleUrlSubmit.js')
const AudioModule = require('./utils/audioModule.js')
const { addLoadRef, generateInitialRefs, loadElementRef, setOverwriteRef } = require('./utils/elementRefs')

const state = {
  demo: true,
  selectedTrack: null,
  tracklist: null,
  slicingInitialized: false,
  currentTrack: 2,
  albumMetadata: {},
  audio: null,
  socketId: null,
}

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
  $trackFinalContainer,
  $demoNotice,
  $urlSubmitForm,
  $addTrackButton,
  $tracklistForm,
  $startOverBtn,
  $resetTracklistBtn,
  $loadTimecodesBtn,
  $tracklistError,
  $timecodeError,
  $submitTimecodesButton,
  $timecodeSubmitBtn,
  $timecodeCancelBtn,
  $timecodeInputBox,
  $audioControls,
  $downloadProgress,
  $sliceProgress,
} = generateInitialRefs()

$urlInput.focus()
const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

router.listen()
router.match(window.location.hash)

$demoNotice.textContent = state.demo ? '*To comply with Heroku policy, file download is disabled in this demonstration.' : ''

$urlSubmitForm.addEventListener('submit', event => {
  event.preventDefault()
  handleUrlSubmit($urlInput, state.socketId).then(keyData => {
    if (keyData) state.albumMetadata = keyData
  })
})

$addTrackButton.addEventListener('click', () => {
  $tracklistError.textContent = ''
  addTrackForm(state.currentTrack)
  state.currentTrack += 1
})

$tracklistForm.addEventListener('submit', event => {
  event.preventDefault()

  $tracklistError.textContent = ''

  const trackData = new FormData($tracklistForm)
  state.tracklist = submitTracklist(trackData, state.currentTrack)
  const tracklistPost = {}

  tracklistPost.tracklist = state.tracklist
  tracklistPost.metaData = state.albumMetadata
  tracklistPost.socketId = state.socketId

  state.slicingInitialized = true
  if ($downloadProgress.textContent !== 'Album Download Complete') {
    $sliceProgress.textContent = 'Slicing will begin after album download.'
  }
  else {
    $sliceProgress.textContent = 'Track slice initializing...'
    const $spinner = addLoadRef('spinner')
    $spinner.setAttribute('class', 'fa fa-spinner spinner')
    setTimeout(() => {
      $sliceProgress.textContent = 'Tracks sliced: 0/' + state.tracklist.length
    }, 2000)
  }

  sendTracklistPostRequest(tracklistPost).then(response => {
    const $audioPlayer = addLoadRef('audio-player')
    const $nowPlaying = addLoadRef('now-playing')
    if (response.status === 202) {
      $trackFinalContainer.addEventListener('click', e => {
        state.selectedTrack = state.tracklist[(parseInt(e.target.dataset.tracknum, 10) - 1)]
        if (!state.selectedTrack) return
        state.audio.selectTrack(state.selectedTrack)
        const $selected = addLoadRef(`track-final-${e.target.dataset.tracknum}`)
        for (let i = 1; i <= state.tracklist.length; i++) {
          const $track = setOverwriteRef(`track-final-${i}`)
          if ($track.classList.value.includes('selected')) $track.classList.remove('selected')
        }
        $selected.setAttribute('class', 'track-final selected')

        $nowPlaying.textContent = state.selectedTrack.trackName
        const trackFileName = state.selectedTrack.trackName.split(' ').join('-')

        const trackPath = '/download/' + state.albumMetadata.videoId + '/tracks/' + state.socketId + '/' + trackFileName + '.mp3'
        $audioPlayer.pause()
        $audioPlayer.src = trackPath
        $audioPlayer.play()
      })
      socket.on('zipPath', zipPath => {
        $trackFinalContainer.innerHTML = ''
        const $tracklistLinks = getTracklistLinks(state.tracklist, state.albumMetadata.videoId, state.socketId)
        buildTracklistFinal(state.tracklist)
        renderTracklistLinks($tracklistLinks)
        const $downloadAllForm = addLoadRef('download-all-form')
        const $downloadAllButton = addLoadRef('download-all-button')
        const $downloadAllContainer = addLoadRef('download-all-container')
        if (state.demo) {
          $downloadAllContainer.setAttribute('title', 'File download is currently disabled.')
          $downloadAllButton.setAttribute('class', 'form-button disabled')
        }
        else $downloadAllForm.setAttribute('action', zipPath)
        const $finalAlbumTitle = addLoadRef('final-album-title')
        $finalAlbumTitle.textContent = state.albumMetadata.videoTitle
        const generalPath = '/download/' + state.albumMetadata.videoId + '/tracks/' + state.socketId + '/'
        const startPath = '/download/' + state.albumMetadata.videoId + '/tracks/' + state.socketId + '/' + state.tracklist[0].trackName.split(' ').join('-') + '.mp3'
        window.location.hash = '#tracklist-download' + '?id=' + state.albumMetadata.videoId
        $audioPlayer.src = startPath
        $nowPlaying.textContent = state.tracklist[0].trackName
        state.audio = new AudioModule($audioPlayer, $nowPlaying, state.tracklist, generalPath)
      })
    }
    else (console.log('Tracklist request failed.'))
  })
})

$startOverBtn.addEventListener('click', () => {
  $tracklistError.textContent = ''
  $trackFormContainer.innerHTML = ''
  $trackFinalContainer.innerHTML = ''
  state.currentTrack = 1
  addTrackForm(state.currentTrack)
  state.currentTrack += 1
  window.location.hash = ''
})

$resetTracklistBtn.addEventListener('click', () => {
  $tracklistError.textContent = ''
  $trackFormContainer.innerHTML = ''
  state.currentTrack = 1
  addTrackForm(state.currentTrack)
  state.currentTrack += 1
})

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
  $timecodeTitle.textContent = albumMetadata.videoTitle + ' [' + state.albumMetadata.videoLengthString + ']'
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

socket.on('connectionId', connectionId => {
  state.socketId = connectionId
})

socket.on('downloadProgress', progress => {
  $downloadProgress.textContent = 'Download Progress: ' + progress + '%'
  if (progress === 100) {
    setTimeout(() => {
      $downloadProgress.textContent = 'Album Download Complete'
      if (state.slicingInitialized) {
        const $spinner = addLoadRef('spinner')
        $spinner.setAttribute('class', 'fa fa-spinner spinner')
        $sliceProgress.textContent = 'Track slice initializing...'
        setTimeout(() => {
          $sliceProgress.textContent = 'Tracks sliced: 0/' + state.tracklist.length
        }, 2000)
      }
    }, 3000)
  }
})

socket.on('sliceProgress', sliced => {
  $sliceProgress.textContent = 'Tracks sliced: ' + sliced
})
