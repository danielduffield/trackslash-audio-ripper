const attachUrlFormListener = require('./urlSubmitForm')
const attachAddTrackButtonListener = require('./addTrackButton')

function attachListeners() {
  return {
    urlSubmitForm: attachUrlFormListener(),
    addTrackButton: attachAddTrackButtonListener()
  }
}

module.exports = attachListeners
