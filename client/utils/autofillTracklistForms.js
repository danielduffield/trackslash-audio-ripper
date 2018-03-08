const state = require('./../state/state')
const { loadRef } = require('./../state/elementRefs')

function autofillTracklistForms(scrapedTracklist) {

  const trackFormFields = [
    { name: 'num', property: 'trackNum' },
    { name: 'name', property: 'trackName' },
    { name: 'start', property: 'trackStart' },
    { name: 'end', property: 'trackEnd' }
  ]

  scrapedTracklist.forEach((track, trackIndex) => {
    const currentTrack = trackIndex + 1

    trackFormFields.forEach((field, fieldIndex) => {
      const $form = loadRef(`track-${field.name}-${currentTrack}`)
      $form.value = track[field.property]
    })

    if (scrapedTracklist[trackIndex + 1]) {
      state.tracklistForm.addTrackForm(currentTrack + 1)
    }
  })
}

module.exports = autofillTracklistForms
