const { addLoadRef } = require('./../utils/elementRefs')
const addTrackForm = require('./../utils/addTrackForm.js')
const state = require('./../state/state.js')

function attachAddTrackButtonListener() {
	return addLoadRef('track-form-add-button').addEventListener('click', () => {
	  $tracklistError.textContent = ''
	  addTrackForm(state.currentTrack)
	  state.currentTrack += 1
	})
}

module.exports = attachAddTrackButtonListener
