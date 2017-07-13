const createFormTable = require('./utils/createFormTable.js')
const invalidUrlMessage = require('./utils/invalidUrlMessage.js')
const sendTracklistPostRequest = require('./sendTracklistPostRequest.js')
const submitTracklist = require('./utils/submitTracklist.js')
const transitionToTracklistForm = require('./utils/transitionToTracklistForm.js')

const HashRouter = require('./utils/hashRouter.js')

function sendUrlPostRequest(urlSubmission) {
  fetch('/url-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(urlSubmission)
  })
  .then(response => {
    console.log(response)
    if (response.status === 400) {
      const $invalid = invalidUrlMessage()
      const $urlFormGroup = document.getElementById('url-form-col')
      $urlFormGroup.appendChild($invalid)
    }
    if (response.status === 202) return response.json()
  })
  .then(keyData => {
    window.location.hash = '#create-tracklist' + '?id=' + keyData.videoId
    transitionToTracklistForm(keyData)
    console.log(keyData)
    albumMetadata = keyData
  })
  .catch(err => console.log(err))
}

function validateUrl(url) {
  return url.includes('https://www.youtube.com/')
}

function getYoutubeId(url) {
  const youtubeId = url.slice(24, url.length)
  return youtubeId
}

const currentTrack = 1
var albumMetadata = {}

document.body.appendChild(createFormTable())
const $urlInput = document.getElementById('url-submit-form')

const $views = document.querySelectorAll('.view')
const router = new HashRouter($views)
router.listen()
router.match(window.location.hash)

const $submitButton = document.getElementById('url-submit-btn')
$submitButton.addEventListener('click', () => {
  const urlSubmission = {}
  if (validateUrl($urlInput.value)) {
    urlSubmission.url = $urlInput.value
    urlSubmission.youtubeId = getYoutubeId(urlSubmission.url)
    sendUrlPostRequest(urlSubmission)
  }
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
  sendTracklistPostRequest(tracklistPost)
})