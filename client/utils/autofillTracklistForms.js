const addTrackForm = require('./addTrackForm.js')

function autofillTracklistForms(scrapedTracklist) {
  const trackFormFields = ['num', 'name', 'start', 'end']
  const trackProperties = ['trackNum', 'trackName', 'trackStart', 'trackEnd']

  scrapedTracklist.forEach((track, trackIndex) => {
    const currentTrack = trackIndex + 1

    trackFormFields.forEach((field, fieldIndex) => {
      const $form = document.getElementById('track-' + field + '-' + currentTrack)
      $form.value = track[trackProperties[fieldIndex]]
    })

    if (scrapedTracklist[trackIndex + 1]) {
      addTrackForm(currentTrack + 1)
    }
  })
}

module.exports = autofillTracklistForms
