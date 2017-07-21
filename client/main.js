const sendTracklistPostRequest = require('./utils/sendTracklistPostRequest.js')
const sendUrlPostRequest = require('./utils/sendUrlPostRequest.js')
const submitTracklist = require('./utils/submitTracklist.js')
const addTrackForm = require('./utils/addTrackForm.js')
const getTracklistLinks = require('./utils/getTracklistLinks.js')
const renderTracklistLinks = require('./utils/renderTracklistLinks.js')
const buildTracklistFinal = require('./utils/buildTracklistFinal.js')
const autoGenerateTracklist = require('./utils/autoGenerateTracklist.js')
const autofillTracklistForms = require('./utils/autofillTracklistForms.js')
const deleteTrack = require('./utils/deleteTrack.js')
const createAlbumImage = require('./utils/createAlbumImage.js')

const {createFormTable, createTracklistTable, createTimecodeForm} = require('./utils/elementCreation')

const HashRouter = require('./utils/hashRouter.js')

function validateUrl(url) {
  return url.includes('https://www.youtube.com/')
}

function getYoutubeId(url) {
  const youtubeId = url.slice(24, url.length)
  return youtubeId
}

let currentTrack = 1
var albumMetadata = {}

document.body.appendChild(createFormTable())
document.body.appendChild(createTracklistTable())
document.body.appendChild(createTimecodeForm())

const $urlInput = document.getElementById('url-submit-form')
const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)

const $trackFormContainer = document.getElementById('track-form-container')

router.listen()
router.match(window.location.hash)

const $submitButton = document.getElementById('url-submit-btn')
$submitButton.addEventListener('click', () => {
  const urlSubmission = {}
  if (validateUrl($urlInput.value)) {
    urlSubmission.url = $urlInput.value
    urlSubmission.youtubeId = getYoutubeId(urlSubmission.url)
    sendUrlPostRequest(urlSubmission).then(keyData => {
      albumMetadata = keyData

      createAlbumImage(albumMetadata.videoImage, 'video-image-tracklist-form')
      createAlbumImage(albumMetadata.videoImage, 'video-image-timecode-form')
      createAlbumImage(albumMetadata.videoImage, 'video-image-tracklist-final')

      currentTrack = 1
      addTrackForm(currentTrack)
      currentTrack++
    })
  }
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
  console.log(tracklist)
  const tracklistPost = {}

  tracklistPost.tracklist = tracklist
  tracklistPost.metaData = albumMetadata

  sendTracklistPostRequest(tracklistPost).then(zipPath => {
    const $tracklistLinks = getTracklistLinks(tracklist, albumMetadata.videoId)
    buildTracklistFinal(tracklist)
    renderTracklistLinks($tracklistLinks)
    const $downloadAllForm = document.getElementById('download-all-form')
    $downloadAllForm.setAttribute('action', zipPath)
    const $finalAlbumTitle = document.getElementById('final-album-title')
    $finalAlbumTitle.textContent = albumMetadata.videoTitle
    window.location.hash = '#tracklist-download' + '?id=' + albumMetadata.videoId
  })
})

const $startOverBtn = document.getElementById('start-over-button')
$startOverBtn.addEventListener('click', () => {
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
  window.location.hash = '#create-tracklist' + '?id=' + albumMetadata.videoId
})

$timecodeSubmitBtn.addEventListener('click', () => {
  const descriptionRows = $timecodeInputBox.value.split('\n')
  const timecodedRows = descriptionRows.filter(row => {
    return /\d:\d\d/.test(row)
  })
  if (timecodedRows.length < 2) return false
  $trackFormContainer.innerHTML = ''
  currentTrack = 1
  addTrackForm(currentTrack)
  window.location.hash = '#create-tracklist' + '?id=' + albumMetadata.videoId
  const pastedTracklist = autoGenerateTracklist($timecodeInputBox.value, albumMetadata.videoLengthString)
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
