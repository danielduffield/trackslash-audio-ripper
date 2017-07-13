const invalidUrlMessage = require('./invalidUrlMessage.js')
const transitionToTracklistForm = require('./transitionToTracklistForm.js')

function sendUrlPostRequest(urlSubmission) {
  return fetch('/url-request', {
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
    return keyData
  })
  .catch(err => console.log(err))
}

module.exports = sendUrlPostRequest
