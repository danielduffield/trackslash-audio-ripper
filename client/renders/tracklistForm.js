const state = require('./../state/state')
const TracklistForm = require('./../components/tracklistForm')

state.tracklistForm = new TracklistForm()

module.exports = state.tracklistForm.render()
