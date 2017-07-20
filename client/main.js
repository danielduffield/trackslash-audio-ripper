const createFormTable = require('./utils/createFormTable.js')
const createTracklistTable = require('./utils/createTracklistTable.js')
const sendTracklistPostRequest = require('./utils/sendTracklistPostRequest.js')
const sendUrlPostRequest = require('./utils/sendUrlPostRequest.js')
const submitTracklist = require('./utils/submitTracklist.js')
const addTrackForm = require('./utils/addTrackForm.js')
const getTracklistLinks = require('./utils/getTracklistLinks.js')
const renderTracklistLinks = require('./utils/renderTracklistLinks.js')
const buildTracklistFinal = require('./utils/buildTracklistFinal.js')
const autoGenerateTracklist = require('./utils/autoGenerateTracklist.js')
const autofillTracklistForms = require('./utils/autofillTracklistForms.js')
const createTimecodeForm = require('./utils/createTimecodeForm.js')

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
      currentTrack = 1
      addTrackForm(currentTrack)
      currentTrack++
    })
  }
})

const $addTrackButton = document.getElementById('track-form-add-button')
$addTrackButton.addEventListener('click', () => {
  addTrackForm(currentTrack)
  currentTrack++
})

const $tracklistForm = document.getElementById('tracklist-form')
$tracklistForm.addEventListener('submit', event => {
  event.preventDefault()

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
  $trackFormContainer.innerHTML = ''
  currentTrack = 1
  addTrackForm(currentTrack)
  currentTrack++
})

const $loadTracklistBtn = document.getElementById('load-timecodes-button')
$loadTracklistBtn.addEventListener('click', () => {
  $trackFormContainer.innerHTML = ''
  currentTrack = 1
  addTrackForm(currentTrack)
  const autoTracklist = autoGenerateTracklist(albumMetadata.description, albumMetadata.videoLengthString)
  console.log(autoTracklist)
  autofillTracklistForms(autoTracklist)
})

const $submitTracklistBtn = document.getElementById('submit-timecodes-button')
$submitTracklistBtn.addEventListener('click', () => {
  const $timecodeTitle = document.getElementById('timecode-video-title')
  $timecodeTitle.textContent = albumMetadata.videoTitle + ' [' + albumMetadata.videoLengthString + ']'
  window.location.hash = '#submit-timecodes' + '?id=' + albumMetadata.videoId
})

const $timecodeCancelBtn = document.getElementById('timecode-cancel-button')
$timecodeCancelBtn.addEventListener('click', () => {
  window.location.hash = '#create-tracklist' + '?id=' + albumMetadata.videoId
})

const $timecodeSubmitBtn = document.getElementById('timecode-submit-button')
const $timecodeInputBox = document.getElementById('timecode-input-box')

$timecodeSubmitBtn.addEventListener('click', () => {
  $trackFormContainer.innerHTML = ''
  currentTrack = 1
  addTrackForm(currentTrack)
  window.location.hash = '#create-tracklist' + '?id=' + albumMetadata.videoId
  const pastedTracklist = autoGenerateTracklist($timecodeInputBox.value, albumMetadata.videoLengthString)
  autofillTracklistForms(pastedTracklist)
})
