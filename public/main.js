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
  .then(response => console.log(response))
}

function validateUrl(url) {
  return url.includes('https://www.youtube.com/')
}

function getYoutubeId(url) {
  const youtubeId = url.slice(24, url.length)
  return youtubeId
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
