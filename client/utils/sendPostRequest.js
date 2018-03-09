function sendPostRequest(url, content) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(content)
  })
}

module.exports = sendPostRequest
