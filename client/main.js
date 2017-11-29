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

const demo = true

const {createFormTable, createTracklistTable, createTimecodeForm} = require('./utils/elementCreation')

const HashRouter = require('./utils/hashRouter.js')

let tracklistLength = 0

let slicingInitialized = false

let currentTrack = 2
var albumMetadata = {}

document.body.appendChild(createFormTable())
document.body.appendChild(createTracklistTable())
document.body.appendChild(createTimecodeForm())

const $urlInput = document.getElementById('url-submit-input')
$urlInput.focus()
const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

const $trackFormContainer = document.getElementById('track-form-container')
const $trackFinalContainer = document.getElementById('track-final-container')

router.listen()
router.match(window.location.hash)

const $urlSubmitForm = document.getElementById('url-submit-form')
$urlSubmitForm.addEventListener('submit', event => {
  event.preventDefault()
  handleUrlSubmit($urlInput, socketId).then(keyData => {
    if (keyData) albumMetadata = keyData
  })
})

const $addTrackButton = document.getElementById('track-form-add-button')
$addTrackButton.addEventListener('click', () => {
  $tracklistError.textContent = ''
  addTrackForm(currentTrack)
  currentTrack++
})

const $tracklistForm = document.getElementById('tracklist-form')
$tracklistForm.addEventListener('submit', event => {
  event.preventDefault()

  $tracklistError.textContent = ''

  const trackData = new FormData($tracklistForm)
  const tracklist = submitTracklist(trackData, currentTrack)
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
    setTimeout(() => {
      $sliceProgress.textContent = 'Tracks sliced: 0/' + tracklistLength
    }, 2000)
  }

  sendTracklistPostRequest(tracklistPost).then(response => {
    let $previouslySelected = null
    const $audioPlayer = document.getElementById('audio-player')
    const $nowPlaying = document.getElementById('now-playing')
    if (response.status === 202) {
      $trackFinalContainer.addEventListener('click', e => {
        const selectedTrack = tracklist[(parseInt(e.target.dataset.tracknum, 10) - 1)]
        if (!selectedTrack) return
        if ($previouslySelected) $previouslySelected.setAttribute('class', 'track-final')
        const $selected = document.getElementById('track-final-' + e.target.dataset.tracknum)
        $selected.setAttribute('class', 'track-final selected')
        $previouslySelected = $selected

        $nowPlaying.textContent = selectedTrack.trackName
        const trackFileName = selectedTrack.trackName.split(' ').join('-')

        const trackPath = '/download/' + albumMetadata.videoId + '/tracks/' + socketId + '/' + trackFileName + '.mp3'
        $audioPlayer.src = trackPath
        $audioPlayer.play()
      })
      socket.on('zipPath', zipPath => {
        $trackFinalContainer.innerHTML = ''
        const $tracklistLinks = getTracklistLinks(tracklist, albumMetadata.videoId, socketId)
        buildTracklistFinal(tracklist)
        renderTracklistLinks($tracklistLinks)
        const $downloadAllForm = document.getElementById('download-all-form')
        const $downloadAllButton = document.getElementById('download-all-button')
        const $downloadAllContainer = document.getElementById('download-all-container')
        if (demo) {
          $downloadAllContainer.setAttribute('title', 'File download is currently disabled.')
          $downloadAllButton.setAttribute('class', 'form-button disabled')
        }
        else $downloadAllForm.setAttribute('action', zipPath)
        const $finalAlbumTitle = document.getElementById('final-album-title')
        $finalAlbumTitle.textContent = albumMetadata.videoTitle
        const startPath = '/download/' + albumMetadata.videoId + '/tracks/' + socketId + '/' + tracklist[0].trackName.split(' ').join('-') + '.mp3'
        window.location.hash = '#tracklist-download' + '?id=' + albumMetadata.videoId
        $audioPlayer.src = startPath
        $nowPlaying.textContent = tracklist[0].trackName
        $previouslySelected = document.getElementById('track-final-1')
      })
    }
    else (console.log('Tracklist request failed.'))
  })
})

const $startOverBtn = document.getElementById('start-over-button')
$startOverBtn.addEventListener('click', () => {
  $tracklistError.textContent = ''
  $trackFormContainer.innerHTML = ''
  $trackFinalContainer.innerHTML = ''
  tracklistLength = 0
  currentTrack = 1
  addTrackForm(currentTrack)
  currentTrack++
  window.location.hash = ''
})

const $resetTracklistBtn = document.getElementById('reset-tracklist-button')
$resetTracklistBtn.addEventListener('click', () => {
  $tracklistError.textContent = ''
  $trackFormContainer.innerHTML = ''
  currentTrack = 1
  addTrackForm(currentTrack)
  currentTrack++
})

const $loadTimecodesBtn = document.getElementById('load-timecodes-button')
$loadTimecodesBtn.addEventListener('click', () => {
  $trackFormContainer.innerHTML = ''
  currentTrack = 1
  addTrackForm(currentTrack)
  currentTrack++
  if (albumMetadata.timeCodes.length > 1) {
    const autoTracklist = autoGenerateTracklist(albumMetadata.description, albumMetadata.videoLengthString)
    currentTrack = autoTracklist.length + 1
    autofillTracklistForms(autoTracklist)
  }
  else {
    $tracklistError.textContent = '* No timecodes found in video description. Use "Submit Timecodes."'
  }
})

const $tracklistError = document.getElementById('tracklist-error-message-container')
const $timecodeError = document.getElementById('timecode-error-message-container')

const $submitTimecodesButton = document.getElementById('submit-timecodes-button')
const $timecodeSubmitBtn = document.getElementById('timecode-submit-button')
const $timecodeCancelBtn = document.getElementById('timecode-cancel-button')
const $timecodeInputBox = document.getElementById('timecode-input-box')

$submitTimecodesButton.addEventListener('click', () => {
  $tracklistError.textContent = ''
  $timecodeInputBox.value = ''
  const $timecodeTitle = document.getElementById('timecode-video-title')
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
    currentTrack--
  }
})

let socketId = null

socket.on('connectionId', connectionId => {
  socketId = connectionId
})

const $downloadProgress = document.getElementById('album-download-progress')
const $sliceProgress = document.getElementById('track-slice-progress')

socket.on('downloadProgress', progress => {
  $downloadProgress.textContent = 'Download Progress: ' + progress + '%'
  if (progress === 100) {
    setTimeout(() => {
      $downloadProgress.textContent = 'Album Download Complete'
      if (slicingInitialized) {
        $sliceProgress.textContent = 'Track slice initializing...'
        setTimeout(() => {
          $sliceProgress.textContent = 'Tracks sliced: 0/' + tracklistLength
        }, 2000)
      }
    }, 3000)
  }
})

socket.on('sliceProgress', sliced => {
  $sliceProgress.textContent = 'Tracks Sliced: ' + sliced
})
