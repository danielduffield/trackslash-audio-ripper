/* eslint-disable no-unused-vars */

const $urlInput = document.getElementById('url-submit-form')
const $submitButton = document.getElementById('url-submit-btn')

$submitButton.addEventListener('click', () => {
  const urlSubmission = {}
  if (validateUrl($urlInput.value)) {
    urlSubmission.url = $urlInput.value
    urlSubmission.youtubeId = getYoutubeId(urlSubmission.url)
    sendPostRequest(urlSubmission)
  }
})

function sendPostRequest(urlSubmission) {
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
  .then(response => console.log(response))
  .catch(err => console.log(err))
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

/*
function createTimeDropdown(timeLength) {
  const $select = createElement('select', {class: 'custom-select time-dropdown'}, '', [])
  for (let i = 0; i < timeLength + 1; i++) {
    const $option = createElement('option', {}, i, [])
    $option.value = i
    $select.appendChild($option)
  }
  return $select
} */

function createTrackForm(currentTrack) {
  const trackFormFields = ['num', 'name', 'start', 'end']
  const $trackForm = createElement('tr', {}, '', [])
  for (let i = 0; i < trackFormFields.length; i++) {
    const $tableCell = createElement('td', {}, '', [])
    const $trackFormField = createElement('input', {}, '', [
      createElement('input', {
        id: 'track-' + trackFormFields[i] + '-' + currentTrack,
        name: 'track-' + trackFormFields[i] + '-' + currentTrack
      }, '', [])
    ])
    $tableCell.appendChild($trackFormField)
    $trackForm.appendChild($tableCell)
  }
  return $trackForm
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

function createFormTable() {
  const $formTable =
  createElement('row', {}, '', [
    createElement('div', {class: 'col-md-8 col-md-offset-2'}, '', [
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
        createElement('input', {id: 'track-form-submit-button', type: 'submit', value: 'Submit Tracks'}, '', [])
      ])
    ])
  ])
  return $formTable
}
