(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const createElement = require('./utils/createElement.js')
const createFormTable = require('./utils/createFormTable.js')
const createTrackForm = require('./utils/createTrackForm.js')
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

function sendTracklistPostRequest(tracklistWithData) {
  fetch('/tracklist-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(tracklistWithData)
  })
  .then(response => console.log(response))
}

function validateUrl(url) {
  return url.includes('https://www.youtube.com/')
}

function getYoutubeId(url) {
  const youtubeId = url.slice(24, url.length)
  return youtubeId
}

function invalidUrlMessage() {
  const $invalidUrl = createElement('div', {class: 'alert alert-danger', role: 'alert'}, 'Enter a valid Youtube URL', [
    createElement('span', {class: 'glyphicon glyphicon-exclamation-sign', 'aria-hidden': 'true'}, '', []),
    createElement('span', {class: 'sr-only'}, 'Error:', [])
  ])
  return $invalidUrl
}

function submitTracks(form, numOfTracks) {
  const tracklist = []
  for (let i = 0; i < numOfTracks; i++) {
    const trackNumber = i + 1
    const track = {
      trackNum: form.get('track-num-' + trackNumber),
      trackName: form.get('track-name-' + trackNumber),
      trackStart: form.get('track-start-' + trackNumber),
      trackEnd: form.get('track-end-' + trackNumber)
    }
    tracklist.push(track)
  }
  return tracklist
}

function addTrackForm() {
  const $trackFormContainer = document.getElementById('track-form-container')
  $trackFormContainer.appendChild(createTrackForm(currentTrack))
}

function transitionToTracklistForm(keyData) {
  const $youtubeVideoTitle = document.getElementById('youtube-video-title')
  $youtubeVideoTitle.textContent = keyData.videoTitle + ' [' + keyData.videoLengthString + ']'
  const $oldTrackForm = document.querySelector('.track-form-1')
  if (!$oldTrackForm) {
    addTrackForm()
  }
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
  const tracklist = submitTracks(trackData, currentTrack)
  console.log(tracklist)
  const tracklistPost = {}
  tracklistPost.tracklist = tracklist
  tracklistPost.metaData = albumMetadata
  sendTracklistPostRequest(tracklistPost)
})

},{"./utils/createElement.js":2,"./utils/createFormTable.js":3,"./utils/createTrackForm.js":4,"./utils/hashRouter.js":5}],2:[function(require,module,exports){
function createElement(tagName, attributes, content, $children) {
  const $element = document.createElement(tagName)
  $element.textContent = content
  for (const key in attributes) {
    $element.setAttribute(key, attributes[key])
  }
  $children.forEach($child => {
    $element.appendChild($child)
  })
  return $element
}

module.exports = createElement

},{}],3:[function(require,module,exports){
const createElement = require('./createElement')

function createFormTable() {
  const $formTable =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2 view hidden', id: 'create-tracklist'}, '', [
      createElement('h3', {id: 'youtube-video-title'}, '', []),
      createElement('form', {id: 'tracklist-form'}, '', [
        createElement('table', {class: 'table table-bordered'}, '', [
          createElement('thead', {}, '', [
            createElement('tr', {}, '', [
              createElement('th', {}, 'Num', []),
              createElement('th', {}, 'Name', []),
              createElement('th', {}, 'Start', []),
              createElement('th', {}, 'End', [])
            ])
          ]),
          createElement('tbody', {id: 'track-form-container'}, '', [])
        ]),
        createElement('input', {id: 'track-form-submit-button', type: 'submit', value: 'Start Slicing'}, '', [])
      ])
    ])
  ])
  return $formTable
}

module.exports = createFormTable

},{"./createElement":2}],4:[function(require,module,exports){
const createElement = require('./createElement')

function createTrackForm(currentTrack) {
  const trackFormFields = ['num', 'name', 'start', 'end']
  const $trackForm = createElement('tr', {class: 'track-form-' + currentTrack}, '', [])
  for (let i = 0; i < trackFormFields.length; i++) {
    const $tableCell = createElement('td', {}, '', [])
    const $trackFormField = createElement('input', {
      id: 'track-' + trackFormFields[i] + '-' + currentTrack,
      name: 'track-' + trackFormFields[i] + '-' + currentTrack
    }, '', [])
    $tableCell.appendChild($trackFormField)
    $trackForm.appendChild($tableCell)
  }
  return $trackForm
}

module.exports = createTrackForm

},{"./createElement":2}],5:[function(require,module,exports){
class HashRouter {
  constructor($views) {
    this.$views = $views
    this.isListening = false
  }
  match(hash) {
    if (hash === '') {
      hash = '#url-form'
    }
    const hashComponents = hash.split('?')
    const viewId = hashComponents[0].replace('#', '')
    this.$views.forEach($view => {
      if ($view.id === viewId) {
        $view.classList.remove('hidden')
      }
      else {
        $view.classList.add('hidden')
      }
    })
  }
  listen() {
    if (this.isListening) return
    window.addEventListener('hashchange', () => {
      this.match(window.location.hash)
    })
    this.isListening = true
  }
}

module.exports = HashRouter

},{}]},{},[1]);
