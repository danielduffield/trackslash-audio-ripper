function sendTracklistPostRequest(tracklistWithData) {
  return fetch('/tracklist-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(tracklistWithData)
  })
  .then(response => {
    return response.json()
  })
  .then(json => {
    return json
  })
}

module.exports = sendTracklistPostRequest
