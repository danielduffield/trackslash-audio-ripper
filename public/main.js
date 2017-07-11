const $urlInput = document.getElementById('url-submit-form')
const $submitButton = document.getElementById('url-submit-btn')

$submitButton.addEventListener('click', () => {
  const urlSubmission = {}
  urlSubmission.url = $urlInput.value
  sendPostRequest(urlSubmission)
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
    .then(response => console.log(response))
}
