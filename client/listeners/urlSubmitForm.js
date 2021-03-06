const { loadRef } = require('./../state/elementRefs')
const handleUrlSubmit = require('./../utils/handleUrlSubmit.js')
const state = require('./../state/state.js')

function attachUrlFormListener() {
  const $urlSubmitForm = loadRef('url-submit-form')
  const $urlInput = loadRef('url-submit-input')

  return $urlSubmitForm.addEventListener('submit', event => {
    event.preventDefault()
    handleUrlSubmit($urlInput, state.socketId).then(keyData => {
      if (keyData) state.albumMetadata = keyData
    })
  })
}

module.exports = attachUrlFormListener
