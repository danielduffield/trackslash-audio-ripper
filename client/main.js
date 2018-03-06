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
const { updateElementRef, generateElementRefs, elementRefs, loadElementRef } = require('./utils/elementRefs')

const demo = true
let selectedTrack = null

let tracklist = null

const $formTable = require('./components/formTable')
const $tracklistTable = require('./components/tracklistTable')
const $timecodeForm = require('./components/timecodeForm')

const HashRouter = require('./utils/hashRouter.js')

let tracklistLength = 0

let slicingInitialized = false

let currentTrack = 2
var albumMetadata = {}

let audio

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
} = generateElementRefs()

$urlInput.focus()
const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

router.listen()
router.match(window.location.hash)

$demoNotice.textContent = demo ? '*To comply with Heroku policy, file download is disabled in this demonstration.' : ''

$urlSubmitForm.addEventListener('submit', event => {
  event.preventDefault()
  handleUrlSubmit($urlInput, socketId).then(keyData => {
    if (keyData) albumMetadata = keyData
  })
})

$addTrackButton.addEventListener('click', () => {
  $tracklistError.textContent = ''
  addTrackForm(currentTrack)
  currentTrack += 1
})

$tracklistForm.addEventListener('submit', event => {
  event.preventDefault()

  $tracklistError.textContent = ''

  const trackData = new FormData($tracklistForm)
  tracklist = submitTracklist(trackData, currentTrack)
  const tracklistPost = {}
  tracklistLength = tracklist.length
  tracklistPost.tracklist = tracklist
  tracklistPost.metaData = albumMetadata
  tracklistPost.socketId = socketId

  slicingInitialized = true
  if ($downloadProgress.textContent !== 'Album Download Complete') {
    $sliceProgress.textContent = 'Slicing will begin after album download.'
  }
  else {
    $sliceProgress.textContent = 'Track slice initializing...'
    const $spinner = updateElementRef('$spinner', 'spinner')
    $spinner.setAttribute('class', 'fa fa-spinner spinner')
    setTimeout(() => {
      $sliceProgress.textContent = 'Tracks sliced: 0/' + tracklistLength
    }, 2000)
  }

  sendTracklistPostRequest(tracklistPost).then(response => {
    const $audioPlayer = updateElementRef('$audioRef', 'audio-player')
    const $nowPlaying = updateElementRef('$nowPlaying', 'now-playing')
    if (response.status === 202) {
      $trackFinalContainer.addEventListener('click', e => {
        selectedTrack = tracklist[(parseInt(e.target.dataset.tracknum, 10) - 1)]
        if (!selectedTrack) return
        audio.selectTrack(selectedTrack)
        const $selected = updateElementRef('$selected', `track-final-${e.target.dataset.tracknum}`)
        for (let i = 1; i <= tracklist.length; i++) {
          const $track = document.getElementById('track-final-' + i)
          if ($track.classList.value.includes('selected')) $track.classList.remove('selected')
        }
        $selected.setAttribute('class', 'track-final selected')

        $nowPlaying.textContent = selectedTrack.trackName
        const trackFileName = selectedTrack.trackName.split(' ').join('-')

        const trackPath = '/download/' + albumMetadata.videoId + '/tracks/' + socketId + '/' + trackFileName + '.mp3'
        $audioPlayer.pause()
        $audioPlayer.src = trackPath
        $audioPlayer.play()
      })
      socket.on('zipPath', zipPath => {
        $trackFinalContainer.innerHTML = ''
        const $tracklistLinks = getTracklistLinks(tracklist, albumMetadata.videoId, socketId)
        buildTracklistFinal(tracklist)
        renderTracklistLinks($tracklistLinks)
        const $downloadAllForm = updateElementRef('$downloadAllForm', 'download-all-form')
        const $downloadAllButton = updateElementRef('$downloadAllButton', 'download-all-button')
        const $downloadAllContainer = updateElementRef('$downloadAllContainer', 'download-all-container')
        if (demo) {
          $downloadAllContainer.setAttribute('title', 'File download is currently disabled.')
          $downloadAllButton.setAttribute('class', 'form-button disabled')
        }
        else $downloadAllForm.setAttribute('action', zipPath)
        const $finalAlbumTitle = updateElementRef('$finalAlbumTitle', 'final-album-title')
        $finalAlbumTitle.textContent = albumMetadata.videoTitle
        const generalPath = '/download/' + albumMetadata.videoId + '/tracks/' + socketId + '/'
        const startPath = '/download/' + albumMetadata.videoId + '/tracks/' + socketId + '/' + tracklist[0].trackName.split(' ').join('-') + '.mp3'
        window.location.hash = '#tracklist-download' + '?id=' + albumMetadata.videoId
        $audioPlayer.src = startPath
        $nowPlaying.textContent = tracklist[0].trackName
        audio = new AudioModule($audioPlayer, $nowPlaying, tracklist, generalPath)
      })
    }
    else (console.log('Tracklist request failed.'))
  })
})

$startOverBtn.addEventListener('click', () => {
  $tracklistError.textContent = ''
  $trackFormContainer.innerHTML = ''
  $trackFinalContainer.innerHTML = ''
  tracklistLength = 0
  currentTrack = 1
  addTrackForm(currentTrack)
  currentTrack += 1
  window.location.hash = ''
})

$resetTracklistBtn.addEventListener('click', () => {
  $tracklistError.textContent = ''
  $trackFormContainer.innerHTML = ''
  currentTrack = 1
  addTrackForm(currentTrack)
  currentTrack += 1
})

$loadTimecodesBtn.addEventListener('click', () => {
  $trackFormContainer.innerHTML = ''
  currentTrack = 1
  addTrackForm(currentTrack)
  currentTrack += 1
  if (albumMetadata.timeCodes.length > 1) {
    const autoTracklist = autoGenerateTracklist(albumMetadata.description, albumMetadata.videoLengthString)
    currentTrack = autoTracklist.length + 1
    autofillTracklistForms(autoTracklist)
  }
  else {
    $tracklistError.textContent = '* No timecodes found in video description. Use "Submit Timecodes."'
  }
})

$submitTimecodesButton.addEventListener('click', () => {
  $tracklistError.textContent = ''
  $timecodeInputBox.value = ''
  const $timecodeTitle = updateElementRef('$timecodeTitle', 'timecode-video-title')
  $timecodeTitle.textContent = albumMetadata.videoTitle + ' [' + albumMetadata.videoLengthString + ']'
  window.location.hash = '#submit-timecodes' + '?id=' + albumMetadata.videoId
})

$timecodeCancelBtn.addEventListener('click', () => {
  $timecodeError.textContent = ''
  window.location.hash = '#create-tracklist' + '?id=' + albumMetadata.videoId
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
  currentTrack = 1
  addTrackForm(currentTrack)
  window.location.hash = '#create-tracklist' + '?id=' + albumMetadata.videoId
  const pastedTracklist = autoGenerateTracklist($timecodeInputBox.value, albumMetadata.videoLengthString)
  currentTrack += pastedTracklist.length
  autofillTracklistForms(pastedTracklist)
})

$tracklistForm.addEventListener('click', event => {
  if (!event.target.id.includes('track-delete-')) return false
  const firstTrackDigitIndex = 13
  const trackNumber = parseInt(event.target.id.substring(firstTrackDigitIndex, event.target.id.length), 10)
  if (trackNumber && /\d/.test(trackNumber)) {
    const numberOfTracks = currentTrack - 1
    deleteTrack(trackNumber, numberOfTracks)
    currentTrack -= 1
  }
})

$audioControls.addEventListener('click', event => {
  if (!event.target.classList.value.includes('audio-button')) return
  if (!event.target.classList.value.includes('toggle')) {
    event.target.id === 'forward-skip'
      ? audio.skipTrack()
      : audio.skipTrack(true)
    return
  }
  if (!event.target.classList.value.includes('active')) {
    event.target.classList.add('active')
    if (event.target.id === 'continuous-play') audio.toggleSetting('continuous')
    else {
      audio.toggleSetting('shuffle')
    }
  }
  else {
    event.target.classList.remove('active')
    event.target.id === 'continuous-play' ? audio.toggleSetting('continuous') : audio.toggleSetting('shuffle')
  }
})

let socketId = null

socket.on('connectionId', connectionId => {
  socketId = connectionId
})

socket.on('downloadProgress', progress => {
  $downloadProgress.textContent = 'Download Progress: ' + progress + '%'
  if (progress === 100) {
    setTimeout(() => {
      $downloadProgress.textContent = 'Album Download Complete'
      if (slicingInitialized) {
        const $spinner = updateElementRef('$spinner', 'spinner')
        $spinner.setAttribute('class', 'fa fa-spinner spinner')
        $sliceProgress.textContent = 'Track slice initializing...'
        setTimeout(() => {
          $sliceProgress.textContent = 'Tracks sliced: 0/' + tracklistLength
        }, 2000)
      }
    }, 3000)
  }
})

socket.on('sliceProgress', sliced => {
  $sliceProgress.textContent = 'Tracks sliced: ' + sliced
})
