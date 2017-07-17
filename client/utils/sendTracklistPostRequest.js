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

module.exports = sendTracklistPostRequest
